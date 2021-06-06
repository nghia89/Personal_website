using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using WebAppIdentityServer.Api.Helpers;
using WebAppIdentityServer.Utilities.Helpers;

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