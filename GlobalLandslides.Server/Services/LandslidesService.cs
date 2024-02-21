using GlobalLandslides.Server.DTO;
using GlobalLandslides.Server.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;

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

        public async Task<IEnumerable<CoordinatesDto>> GetCoordinatesAsync(decimal north, decimal south, decimal east, decimal west, int zoomLevel)
        {
            string[] sizeCriteria = GetSizeCriterias(zoomLevel);


            var locationsQuery = _dbContext.Locations
                .Where(l => l.Latitude <= north && l.Latitude >= south && l.Longitude <= east && l.Longitude >= west);

            var detailsQuery = _dbContext.Details
                .Where(d => sizeCriteria.Contains(d.LandslideSize));

            var joinedData = await locationsQuery
                .Join(detailsQuery,
                      location => location.Id,
                      detail => detail.Id,
                      (location, detail) => new CoordinatesDto
                      {
                          Latitude = location.Latitude,
                          Longitude = location.Longitude,
                         
                      })
                .ToListAsync();

            return joinedData;
        }

        private string[] GetSizeCriterias(int zoomLevel)
        {
            List<string> sizeCriteria = new List<string>{ "catastrophic", "very_large" };

            
            if (zoomLevel >= 5)
            {
                sizeCriteria.Add("large");
            }
            if (zoomLevel >= 6)
            {
                sizeCriteria.Add("medium");
            }
            if (zoomLevel > 8)
            {
                sizeCriteria.AddRange(new[] { "small", "unknown" });
            }

            return sizeCriteria.ToArray();

        }
    }
}
