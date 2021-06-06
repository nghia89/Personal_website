using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAppIdentityServer.Business.Interfaces;

namespace WebAppIdentityServer.Api.Controllers
{
    public class CommonsController : BaseController
    {
        private readonly ISlideBusiness _slideBus;
        private readonly ISystemConfigBusiness _systemConfigBus;
        public CommonsController(ISlideBusiness slideBus, ISystemConfigBusiness systemConfigBus)
        {
            _slideBus = slideBus;
            _systemConfigBus = systemConfigBus;
        }



        #region internal
        [HttpGet]
        [Route("internal/slides_home")]
        [AllowAnonymous]
        public async Task<IActionResult> GetSlide()
        {
            var data = await _slideBus.GetAll();
            return ToOkResult(data);
        }

        [HttpGet]
        [Route("internal/system_config")]
        [AllowAnonymous]
        public async Task<IActionResult> GetSystemConfig()
        {
            var data = await _systemConfigBus.GetByFirstSystem();
            return ToOkResult(data);
        }

        #endregion
    }
}
