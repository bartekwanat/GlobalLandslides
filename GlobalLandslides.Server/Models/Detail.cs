using System;
using System.Collections.Generic;

namespace GlobalLandslides.Server.Models;

public partial class Detail
{
    public int? Id { get; set; }

    public string? EventDescription { get; set; }

    public string? LandslideCategory { get; set; }

    public string? LandslideTrigger { get; set; }

    public string? LandslideSize { get; set; }

    public string? LandslideSetting { get; set; }

    public int? FatalityCount { get; set; }

    public int? InjuryCount { get; set; }

    public string? StormName { get; set; }

    public string? PhotoLink { get; set; }
}
