using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebAppIdentityServer.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize("Bearer")]
    public class BaseController : ControllerBase
    {
        public IActionResult ToOkResult<T>(T a)
        {
            return new OkObjectResult(a);
        }

        public IActionResult ToOkResult()
        {
            return Ok();
        }
    }
}