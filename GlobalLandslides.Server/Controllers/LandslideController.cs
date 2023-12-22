using GlobalLandslides.Server.DTO;
using GlobalLandslides.Server.Services;
using Microsoft.AspNetCore.Mvc;

namespace GlobalLandslides.Server.Controllers
{
    [Route("api/[controller]")]
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
        public async Task<ActionResult<CoordinatesDto>> GetAllCoordinates ()
        {
            var coordinates = await _landslideService.GetCoordinatesAsync();
            if (coordinates == null)
            {
                return NotFound();
            }

            return Ok(coordinates);
        }
    }
    
}
