namespace GlobalLandslides.Server.Models
{
    public class CoordinatesRequest
    {
        public decimal North { get; set; }
        public decimal South { get; set; }
        public decimal East { get; set; }
        public decimal West { get; set; }
        public int ZoomLevel { get; set; }
        public Filters Filters { get; set; }
    }


    public class Filters
    {
        public string[] Categories { get; set; }
        public string[] Triggers { get; set; }
        public string FatalityComparisonType { get; set; }
        public ValueRange FatalityValue { get; set; }
        public string InjuryComparisonType { get; set; }
        public ValueRange InjuryValue { get; set; }
        public bool HasPhoto { get; set; }

    }

    public class ValueRange
    {
       public string MinOrSingleValue {  get; set; }
       public string Max { get; set;}
    }

}

