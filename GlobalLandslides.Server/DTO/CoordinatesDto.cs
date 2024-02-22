using GlobalLandslides.Server.Models;

namespace GlobalLandslides.Server.DTO
{
    public class CoordinatesDto
    {
        public int? Id {  get; set; }
        public decimal? Latitude { get; set; }
        public decimal? Longitude { get; set;}

        public string? LandslideSize { get; set; }
    }
}
