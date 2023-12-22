using System;
using System.Collections.Generic;

namespace GlobalLandslides.Server.Models;

public partial class Location
{
    public int? Id { get; set; }

    public string? LocationDescription { get; set; }

    public string? LocationAccuracy { get; set; }

    public string? CountryName { get; set; }

    public string? AdminDivisionName { get; set; }

    public int? AdminDivisionPopulation { get; set; }

    public decimal? Longitude { get; set; }

    public decimal? Latitude { get; set; }
}
