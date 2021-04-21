using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using WebAppIdentityServer.Api.Authorization;
using WebAppIdentityServer.Api.Helpers;
using WebAppIdentityServer.Business.Interfaces;
using WebAppIdentityServer.Utilities.Constants;
using WebAppIdentityServer.ViewModel.Common;
using WebAppIdentityServer.ViewModel.Models.Product;
using WebAppIdentityServer.ViewModel.Models.System;

namespace WebAppIdentityServer.Api.Controllers
{
    public class ResourceOrganizationController : BaseController
    {
        private readonly IResourceOrganizationBusiness _resourceOrganizationBus;
        public ResourceOrganizationController(IResourceOrganizationBusiness resourceOrganizationBus)
        {
            this._resourceOrganizationBus = resourceOrganizationBus;
        }

        [HttpGet]
        [Route("get/{id}")]
        [ClaimRequirement(FunctionCode.SYSTEM_ORG, CommandCode.CREATE)]
        [ApiValidationFilter]
        public async Task<IActionResult> Get(long id)
        {
            ResourceOrganizationVM data = await _resourceOrganizationBus.GetById(id);
            return new OkObjectResult(data);
        }

        [HttpPost]
        [Route("add")]
        [ClaimRequirement(FunctionCode.SYSTEM_ORG, CommandCode.CREATE)]
        [ApiValidationFilter]
        public async Task<IActionResult> Post([FromBody] ResourceOrganizationVM model)
        {
           await _resourceOrganizationBus.Add(model);
            return new OkResult();
        }

        [HttpPut]
        [Route("update/{id}")]
        [ClaimRequirement(FunctionCode.SYSTEM_ORG, CommandCode.UPDATE)]
        [ApiValidationFilter]
        public async Task<IActionResult> Put(long id,[FromBody] ResourceOrganizationVM model)
        {
         await _resourceOrganizationBus.Update(id,model);
            return new OkResult();
        }

        [HttpGet]
        [Route("paging")]
        [ClaimRequirement(FunctionCode.SYSTEM_ORG, CommandCode.VIEW)]
        public async Task<IActionResult> Paging([FromQuery] PagingParamModel pagingParam)
        {
            var (data, total) = await _resourceOrganizationBus.GetAllPaging(pagingParam.query,pagingParam.page.Value,pagingParam.pageSize.Value);
            return new OkObjectResult(new { data = data, total = total });
        }

    }
}