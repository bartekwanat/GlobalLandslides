using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace GlobalLandslides.Server.Models;

public partial class LandslidesDbContext : DbContext
{
    public LandslidesDbContext()
    {
    }

    public LandslidesDbContext(DbContextOptions<LandslidesDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Detail> Details { get; set; }

    public virtual DbSet<Location> Locations { get; set; }

    public virtual DbSet<Time> Times { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
        {
            IConfigurationRoot configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .AddJsonFile("appsettings.Development.json", optional: true)
                .Build();
            var connectionString = configuration.GetConnectionString("LandslidesDb");
            optionsBuilder.UseSqlServer(connectionString);
        }
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Detail>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("detail");

            entity.Property(e => e.EventDescription).HasColumnName("event_description");
            entity.Property(e => e.FatalityCount).HasColumnName("fatality_count");
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.InjuryCount).HasColumnName("injury_count");
            entity.Property(e => e.LandslideCategory)
                .HasMaxLength(255)
                .HasColumnName("landslide_category");
            entity.Property(e => e.LandslideSetting)
                .HasMaxLength(255)
                .HasColumnName("landslide_setting");
            entity.Property(e => e.LandslideSize)
                .HasMaxLength(255)
                .HasColumnName("landslide_size");
            entity.Property(e => e.LandslideTrigger)
                .HasMaxLength(255)
                .HasColumnName("landslide_trigger");
            entity.Property(e => e.PhotoLink)
                .HasMaxLength(2000)
                .HasColumnName("photo_link");
            entity.Property(e => e.StormName)
                .HasMaxLength(255)
                .HasColumnName("storm_name");
        });

        modelBuilder.Entity<Location>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("location");

            entity.Property(e => e.AdminDivisionName)
                .HasMaxLength(255)
                .HasColumnName("admin_division_name");
            entity.Property(e => e.AdminDivisionPopulation).HasColumnName("admin_division_population");
            entity.Property(e => e.CountryName)
                .HasMaxLength(255)
                .HasColumnName("country_name");
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Latitude)
                .HasColumnType("decimal(9, 6)")
                .HasColumnName("latitude");
            entity.Property(e => e.LocationAccuracy)
                .HasMaxLength(255)
                .HasColumnName("location_accuracy");
            entity.Property(e => e.LocationDescription)
                .HasMaxLength(255)
                .HasColumnName("location_description");
            entity.Property(e => e.Longitude)
                .HasColumnType("decimal(10, 6)")
                .HasColumnName("longitude");
        });

        modelBuilder.Entity<Time>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("time");

            entity.Property(e => e.Date).HasColumnName("date");
            entity.Property(e => e.Id).HasColumnName("id");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
