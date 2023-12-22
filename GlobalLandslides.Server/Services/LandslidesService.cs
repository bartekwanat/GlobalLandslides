using GlobalLandslides.Server.DTO;
using GlobalLandslides.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace GlobalLandslides.Server.Services
{
    public class LandslideService
    {
        private readonly LandslidesDbContext _dbContext;

        public LandslideService(LandslidesDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<LandslideInfoDto> GetLandslideInfoAsync(int id)
        {
            var detail = await _dbContext.Details.FirstOrDefaultAsync(d => d.Id == id);
            if (detail == null)
            {
                return null; 
            }

            var time = await _dbContext.Times.FirstOrDefaultAsync(t => t.Id == id);
            var location = await _dbContext.Locations.FirstOrDefaultAsync(l => l.Id == id);

            var landslideInfoDto = new LandslideInfoDto
            {
                EventDescription = detail.EventDescription,
                LandslideCategory = detail.LandslideCategory,
                LandslideTrigger = detail.LandslideTrigger,
                LandslideSize = detail.LandslideSize,
                LandslideSetting = detail.LandslideSetting,
                FatalityCount = detail.FatalityCount,
                InjuryCount = detail.InjuryCount,
                StormName = detail.StormName,
                PhotoLink = detail.PhotoLink,
                Date = time?.Date,
                LocationDescription = location?.LocationDescription
            };

            return landslideInfoDto;
        }

        public async Task<IEnumerable<CoordinatesDto>> GetCoordinatesAsync()
        {
            var locations = await _dbContext.Locations.ToListAsync();
            var coordinatesList = locations.Select(location => new CoordinatesDto
            {
                Latitude = location.Latitude,
                Longitude = location.Longitude,
            }).ToList();

            return coordinatesList;
        }
    }
}
