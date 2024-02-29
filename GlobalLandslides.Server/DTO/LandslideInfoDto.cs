namespace GlobalLandslides.Server.DTO
{
    public class LandslideInfoDto
    {
        public string? EventDescription { get; set; }
        public string? LandslideCategory { get; set; }
        public string? LandslideTrigger { get; set; }
        public string? LandslideSize { get; set; }
        public string? LandslideSetting { get; set; }
        public int? FatalityCount { get; set; }
        public int? InjuryCount { get; set; }
        public string? StormName { get; set; }
        public string? PhotoLink { get; set; }

        // Time
        public DateOnly? Date { get; set; }

        // Location
        public string? LocationDescription { get; set; }
        public string? CountryName {  get; set; }

    }
}
