using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebAppIdentityServer.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize("Bearer")]
    public class BaseController : ControllerBase
    {
        [NonAction]
        public IActionResult ToOkResult<T>(T a, bool? isError = false, string messageOut = null)
        {
            return new OkObjectResult(new
            {
                Data = a,
                IsError = isError,
                Message = messageOut
            });
        }
        [NonAction]
        public IActionResult ToOkResult(bool? isError = false, string messageOut = null)
        {
            return new OkObjectResult(new
            {
                IsError = isError,
                Message = messageOut
            });
        }
    }
}