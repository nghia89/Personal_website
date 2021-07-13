using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using WebAppIdentityServer.Api.Authorization;
using WebAppIdentityServer.Business.Interfaces;
using WebAppIdentityServer.Infrastructure.Constants;
using WebAppIdentityServer.ViewModel.Models.Product;

namespace WebAppIdentityServer.Api.Controllers
{
    public class ColorController : BaseController
    {
        private readonly IColorBusiness _ColorBus;
        public ColorController(IColorBusiness ColorBus)
        {
            _ColorBus = ColorBus;
        }

        [HttpPost("add")]
        [ClaimRequirement(FunctionCode.SETTING_COLOR, CommandCode.CREATE)]
        public async Task<IActionResult> Post(ColorVM request)
        {
            await _ColorBus.Add(request);
            return ToOkResult();
        }

        [HttpGet("{id}")]
        [ClaimRequirement(FunctionCode.SETTING_COLOR, CommandCode.VIEW)]
        public async Task<IActionResult> GetById(int id)
        {
            var user = await _ColorBus.GetById(id);
            if (user == null)
            {
                return NotFound();
            }

            return ToOkResult(user);
        }

        [HttpGet("getall")]
        [ClaimRequirement(FunctionCode.SETTING_COLOR, CommandCode.VIEW)]
        public async Task<IActionResult> GetAll()
        {
            var user = await _ColorBus.GetAll();
            return ToOkResult(user);
        }

        [HttpPut("update")]
        [ClaimRequirement(FunctionCode.SETTING_COLOR, CommandCode.UPDATE)]
        public async Task<IActionResult> Put([FromBody] ColorVM request)
        {
            await _ColorBus.Update(request);
            return ToOkResult();
        }
    }
}
