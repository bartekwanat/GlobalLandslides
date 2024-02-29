using GlobalLandslides.Server.DTO;
using GlobalLandslides.Server.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;


namespace GlobalLandslides.Server.Services
{
    public class LandslideService
    {
        //constructors

        private readonly LandslidesDbContext _dbContext;

        public LandslideService(LandslidesDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        //public methods

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
                LocationDescription = location?.LocationDescription,
                CountryName = location?.CountryName,

            };

            return landslideInfoDto;
        }

        public async Task<IEnumerable<CoordinatesDto>> GetCoordinatesAsync(CoordinatesRequest request)
        {
            Filters filters = request.Filters;

            var query = _dbContext.Locations.Join(_dbContext.Details, location => location.Id, detail => detail.Id, (location, detail) => new LocationDetail { Location = location, Detail = detail });
            query = ApplyZoomLevelFilter(query, request);
            query = ApplySizeCriteriaFilter(query, GetSizeCriterias(request.ZoomLevel, filters));
            query = ApplyCategoryFilter(query, filters.Categories);
            query = ApplyTriggerFilter(query, filters.Triggers);
            query = ApplyPhotoFilter(query, filters.HasPhoto);
            query = ApplyFatalityFilter(query, filters.FatalityComparisonType, filters.FatalityValue);
            query = ApplyInjuryFilter(query, filters.InjuryComparisonType, filters.InjuryValue);

            var result = await query.Select(x => new CoordinatesDto
            {
                Id = x.Location.Id,
                Latitude = x.Location.Latitude,
                Longitude = x.Location.Longitude,
                LandslideSize = x.Detail.LandslideSize
            }).ToListAsync();

            return result;
        }

        //private methods

        private IQueryable<LocationDetail> ApplyZoomLevelFilter(IQueryable<LocationDetail> query, CoordinatesRequest request)
        {
            Filters filters = request.Filters;


            if (request.ZoomLevel > 4)
            {

                query = query.Where(x => x.Location.Latitude <= request.North && x.Location.Latitude >= request.South && x.Location.Longitude <= request.East && x.Location.Longitude >= request.West);

            }

            return query;
        }

        private string[] GetSizeCriterias(int zoomLevel, Filters filters)
        {
            string[] sizeCriteria = ["catastrophic", "very_large", "large", "medium", "small", "unknown"];
            bool isAnyFiltersActive = IsAnyFiltersActive(filters);

            if (isAnyFiltersActive || zoomLevel > 8)
            {
                return sizeCriteria;
            }
            if (zoomLevel >= 6)
            {
                return sizeCriteria.Take(4).ToArray();
            }
            if (zoomLevel >= 4)
            {
                return sizeCriteria.Take(3).ToArray();
            }

            return sizeCriteria.Take(2).ToArray();
        }

        private bool IsAnyFiltersActive(Filters filters) => filters.Categories.Any() || filters.Triggers.Any() ||
        !filters.InjuryValue.MinOrSingleValue.Equals("") || !filters.FatalityValue.MinOrSingleValue.Equals("");


        private IQueryable<LocationDetail> ApplySizeCriteriaFilter(IQueryable<LocationDetail> query, IEnumerable<string> sizeCriteria)
        {
            if (sizeCriteria.Any())
            {
                query = query.Where(x => sizeCriteria.Contains(x.Detail.LandslideSize));
            }
            return query;
        }

        private IQueryable<LocationDetail> ApplyCategoryFilter(IQueryable<LocationDetail> query, IEnumerable<string> categories)
        {
            if (categories.Any())
            {
                query = query.Where(x => categories.Contains(x.Detail.LandslideCategory));
            }
            return query;
        }

        private IQueryable<LocationDetail> ApplyTriggerFilter(IQueryable<LocationDetail> query, IEnumerable<string> triggers)
        {
            if (triggers.Any())
            {
                query = query.Where(x => triggers.Contains(x.Detail.LandslideTrigger));
            }
            return query;
        }

        private IQueryable<LocationDetail> ApplyPhotoFilter(IQueryable<LocationDetail> query, bool hasPhoto)
        {
            if (hasPhoto)
            {
                query = query.Where(x => x.Detail.PhotoLink.Length > 1);
            }
            return query;
        }

        private IQueryable<LocationDetail> ApplyFatalityFilter(IQueryable<LocationDetail> query, string comparisonType, ValueRange valueRange)
        {
            var minOrSingleValue = ValuesToIntConverter(valueRange.MinOrSingleValue);
            var max = ValuesToIntConverter(valueRange.Max);

            switch (comparisonType)
            {
                case "equal":
                    if (minOrSingleValue != -1)
                    {
                        query = query.Where(x => x.Detail.FatalityCount == minOrSingleValue);
                    }
                    break;
                case "lessThan":
                    if (minOrSingleValue != -1)
                    {
                        query = query.Where(x => x.Detail.FatalityCount < minOrSingleValue);
                    }
                    break;
                case "greaterThan":
                    if (minOrSingleValue != -1)
                    {
                        query = query.Where(x => x.Detail.FatalityCount > minOrSingleValue);
                    }
                    break;
                case "between":
                    if (minOrSingleValue != -1 && max != -1)
                    {
                        query = query.Where(x => x.Detail.FatalityCount >= minOrSingleValue && x.Detail.FatalityCount <= max);
                    }
                    break;
            }
            return query;
        }

        private IQueryable<LocationDetail> ApplyInjuryFilter(IQueryable<LocationDetail> query, string comparisonType, ValueRange valueRange)
        {
            var minOrSingleValue = ValuesToIntConverter(valueRange.MinOrSingleValue);
            var max = ValuesToIntConverter(valueRange.Max);

            switch (comparisonType)
            {
                case "equal":
                    if (minOrSingleValue != -1)
                    {
                        query = query.Where(x => x.Detail.InjuryCount == minOrSingleValue);
                    }
                    break;
                case "lessThan":
                    if (minOrSingleValue != -1)
                    {
                        query = query.Where(x => x.Detail.InjuryCount < minOrSingleValue);
                    }
                    break;
                case "greaterThan":
                    if (minOrSingleValue != -1)
                    {
                        query = query.Where(x => x.Detail.InjuryCount > minOrSingleValue);
                    }
                    break;
                case "between":
                    if (minOrSingleValue != -1 && max != -1)
                    {
                        query = query.Where(x => x.Detail.InjuryCount >= minOrSingleValue && x.Detail.InjuryCount <= max);
                    }
                    break;
            }
            return query;
        }

        //helpers

        private int ValuesToIntConverter (string value)
        {
            return value.Equals("") ? -1 : Int32.Parse(value);
        }


    }
}
