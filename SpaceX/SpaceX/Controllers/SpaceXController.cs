using Contracts.Services;
using Entity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography.X509Certificates;

namespace SpaceX.Controllers
{
    [ApiController]
    [Authorize]
    [Route("space-x")]
    public class SpaceXController : Controller
    {
        private readonly ISpaceXService _spaceXService;
        public SpaceXController( ISpaceXService spaceXService) { 
                _spaceXService = spaceXService;
            }

        [HttpGet("past")]
        public async Task<ActionResult<IEnumerable<SpaceXLaunch>>> GetPastLaunches()
        {
            var objects = await _spaceXService.GetLauhcnes("past");
            return Ok(objects);
        }

        [HttpGet("upcoming")]
        public async Task<ActionResult<IEnumerable<SpaceXLaunch>>> GetUpcomingLaunches()
        {
            var objects = await _spaceXService.GetLauhcnes("upcoming");
            return Ok(objects);
        }

        [HttpGet("latest")]
        public async Task<ActionResult<IEnumerable<SpaceXLaunch>>> GetLatestLaunches()
        {
            var objects = await _spaceXService.GetLauhcnes("latest");
            return Ok(objects);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<SpaceXLaunchDetails>> GetSpecificLauch(string id)
        {
            var obj = await _spaceXService.GetSpecificLaunch(id);

            return Ok(obj);
        }
      
    }
}
