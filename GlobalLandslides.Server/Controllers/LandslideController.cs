using GlobalLandslides.Server.DTO;
using GlobalLandslides.Server.Models;
using GlobalLandslides.Server.Services;
using Microsoft.AspNetCore.Mvc;
using static GlobalLandslides.Server.Models.CoordinatesRequest;

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

        [HttpPost("coordinates")]
        public async Task<IActionResult> GetCoordinatesAsync([FromBody] CoordinatesRequest request)
        {
            {
                var coordinates = await _landslideService.GetCoordinatesAsync(request);
                if (coordinates == null)
                {
                    return NotFound();
                }

                return Ok(coordinates);
            }
        }

    }
}
