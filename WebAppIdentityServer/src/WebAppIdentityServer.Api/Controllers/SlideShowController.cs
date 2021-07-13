using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using WebAppIdentityServer.Api.Authorization;
using WebAppIdentityServer.Business.Interfaces;
using WebAppIdentityServer.Infrastructure.Constants;
using WebAppIdentityServer.ViewModel.Models.Common;

namespace WebAppIdentityServer.Api.Controllers
{
    public class SlideShowController : BaseController
    {
        private readonly ISlideBusiness _SlideBus;
        public SlideShowController(ISlideBusiness SlideBus)
        {
            _SlideBus = SlideBus;
        }

        [HttpPost("add")]
        [ClaimRequirement(FunctionCode.ST_SLIDES, CommandCode.CREATE)]
        public async Task<IActionResult> Post(SlideShowVM request)
        {
            await _SlideBus.Add(request);
            return ToOkResult();
        }

        [HttpGet("{id}")]
        [ClaimRequirement(FunctionCode.ST_SLIDES, CommandCode.VIEW)]
        public async Task<IActionResult> GetById(int id)
        {
            var user = await _SlideBus.GetById(id);
            if (user == null)
            {
                return NotFound();
            }

            return ToOkResult(user);
        }

        [HttpGet("getall")]
        [ClaimRequirement(FunctionCode.ST_SLIDES, CommandCode.VIEW)]
        public async Task<IActionResult> GetAll()
        {
            var user = await _SlideBus.GetAll();
            return ToOkResult(user);
        }

        [HttpPut("update")]
        [ClaimRequirement(FunctionCode.ST_SLIDES, CommandCode.UPDATE)]
        public async Task<IActionResult> Put([FromBody] SlideShowVM request)
        {
            await _SlideBus.Update(request);
            return ToOkResult();
        }

        [HttpPut("delete/{id}")]
        [ClaimRequirement(FunctionCode.ST_SLIDES, CommandCode.DELETE)]
        public async Task<IActionResult> Put(long id)
        {
            await _SlideBus.Delete(id);
            return ToOkResult();
        }
    }
}
