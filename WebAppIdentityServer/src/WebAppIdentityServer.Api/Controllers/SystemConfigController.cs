using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using WebAppIdentityServer.Api.Authorization;
using WebAppIdentityServer.Business.Interfaces;
using WebAppIdentityServer.Utilities.Constants;
using WebAppIdentityServer.ViewModel.Models.Common;

namespace WebAppIdentityServer.Api.Controllers
{
    public class SystemConfigController : BaseController
    {
        private readonly ISystemConfigBusiness _systemConfigBus;
        public SystemConfigController(ISystemConfigBusiness systemConfigBus)
        {
            _systemConfigBus = systemConfigBus;
        }

        [HttpPost("add")]
        [ClaimRequirement(FunctionCode.ST_CONFIG_GENERAL, CommandCode.CREATE)]
        public async Task<IActionResult> Post(SystemConfigVM request)
        {
            await _systemConfigBus.Add(request);
            return ToOkResult();
        }

        [HttpGet("get_by_first_system")]
        public async Task<IActionResult> GetByFirstSystem()
        {
            var data = await _systemConfigBus.GetByFirstSystem();
            return ToOkResult(data);
        }


        [HttpGet("{id}")]
        [ClaimRequirement(FunctionCode.ST_CONFIG_GENERAL, CommandCode.VIEW)]
        public async Task<IActionResult> GetById(long id)
        {
            var user = await _systemConfigBus.GetById(id);
            if (user == null)
            {
                return NotFound();
            }

            return ToOkResult(user);
        }

        [HttpPut("update")]
        [ClaimRequirement(FunctionCode.ST_CONFIG_GENERAL, CommandCode.UPDATE)]
        public async Task<IActionResult> Put([FromBody] SystemConfigVM request)
        {
            await _systemConfigBus.Update(request);
            return ToOkResult();
        }
    }
}