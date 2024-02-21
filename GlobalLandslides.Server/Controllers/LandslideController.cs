using GlobalLandslides.Server.DTO;
using GlobalLandslides.Server.Services;
using Microsoft.AspNetCore.Mvc;

namespace GlobalLandslides.Server.Controllers
{
    [Route("api/landslides")]
    [ApiController]
    public class LandslideController : ControllerBase
    {
        private readonly LandslideService _landslideService;

        public LandslideController(LandslideService landslideService)
        {
            _landslideService = landslideService;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<LandslideInfoDto>> GetLandslideInfo(int id)
        {
            var landslideInfo = await _landslideService.GetLandslideInfoAsync(id);
            if (landslideInfo == null)
            {
                return NotFound();
            }

            return Ok(landslideInfo);
        }

        [HttpGet("coordinates")]
        public async Task<ActionResult<IEnumerable<CoordinatesDto>>> GetAllCoordinates([FromQuery] decimal north, [FromQuery] decimal south, [FromQuery] decimal east, [FromQuery] decimal west, [FromQuery] int zoomLevel)
        {
            var coordinates = await _landslideService.GetCoordinatesAsync(north, south, east, west, zoomLevel);
            if (coordinates == null)
            {
                return NotFound();
            }

            return Ok(coordinates);
        }
    }

}
