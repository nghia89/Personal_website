using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAppIdentityServer.Api.Authorization;
using WebAppIdentityServer.Business.Interfaces;
using WebAppIdentityServer.Utilities.Constants;
using WebAppIdentityServer.ViewModel.Models.Common;
using WebAppIdentityServer.ViewModel.Models.Product;

namespace WebAppIdentityServer.Api.Controllers
{
    public class SizeController : BaseController
    {
        private readonly ISizeBusiness _SizeBus;
        public SizeController(ISizeBusiness SizeBus)
        {
            _SizeBus = SizeBus;
        }

        [HttpPost("add")]
        public async Task<IActionResult> Post(SizeVM request)
        {
            await _SizeBus.Add(request);
            return ToOkResult();
        }

        [HttpGet("{id}")]
        [ClaimRequirement(FunctionCode.CONTENT_PRODUCT, CommandCode.VIEW)]
        public async Task<IActionResult> GetById(int id)
        {
            var user = await _SizeBus.GetById(id);
            if (user == null)
            {
                return NotFound();
            }

            return ToOkResult(user);
        }

        [HttpGet("getall")]
        [ClaimRequirement(FunctionCode.CONTENT_PRODUCT, CommandCode.VIEW)]
        public async Task<IActionResult> GetAll()
        {
            var user = await _SizeBus.GetAll();
            return ToOkResult(user);
        }

        [HttpPut("update")]
        [ClaimRequirement(FunctionCode.CONTENT_PRODUCT, CommandCode.UPDATE)]
        public async Task<IActionResult> Put([FromBody] SizeVM request)
        {
            await _SizeBus.Update(request);
            return ToOkResult();
        }
    }
}
