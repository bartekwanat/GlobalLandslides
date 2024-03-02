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

            return landslideInfo == null ? NotFound() : Ok(landslideInfo);
        }

        [HttpPost("coordinates")]
        public async Task<IActionResult> GetCoordinatesAsync([FromBody] CoordinatesRequest request)
        {
            {
                var coordinates = await _landslideService.GetCoordinatesAsync(request);

                return coordinates == null ? NotFound() : Ok(coordinates);
            }
        }

        [HttpGet("chart")]
        public async Task<IActionResult> GetChartDataAsync(string x, string y)
        {
            var data = await _landslideService.GetChartDataAsync(x,y);
             
            return data == null ? NotFound() : Ok(data);
        }
            

    }
}
