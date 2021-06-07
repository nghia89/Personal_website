using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using WebAppIdentityServer.Api.Authorization;
using WebAppIdentityServer.Api.Helpers;
using WebAppIdentityServer.Business.Interfaces;
using WebAppIdentityServer.Utilities.Constants;
using WebAppIdentityServer.ViewModel;
using WebAppIdentityServer.ViewModel.Common;
using WebAppIdentityServer.ViewModel.Models.System;

namespace WebAppIdentityServer.Api.Controllers
{
    public class FunctionsController : BaseController
    {
        private readonly IFunctionBusiness _functionBu;
        private readonly ILogger<FunctionsController> _logger;
        public FunctionsController(IFunctionBusiness functionBu, ILogger<FunctionsController> logger)
        {
            _functionBu = functionBu; _logger = logger;
        }

        [HttpPost]
        [ClaimRequirement(FunctionCode.SYSTEM_FUNCTION, CommandCode.CREATE)]
        [ApiValidationFilter]
        public async Task<IActionResult> Post([FromBody] FunctionVm request)
        {
            var result = await _functionBu.Add(request);

            return ToOkResult(result);
        }

        [HttpGet]
        [Route("getall")]
        //[ClaimRequirement(FunctionCode.SYSTEM_FUNCTION, CommandCode.VIEW)]
        public async Task<IActionResult> GetAll()
        {
            _logger.LogInformation("Begin PostFunction API");
            var data = await _functionBu.GetAll();
            return ToOkResult(data);
        }

        [HttpGet]
        [Route("paging")]
        [ClaimRequirement(FunctionCode.SYSTEM_FUNCTION, CommandCode.VIEW)]
        public async Task<IActionResult> Paging([FromQuery] PagingParamModel pagingParam)
        {
            var items = await _functionBu.Paging(pagingParam);

            return ToOkResult(items);
        }

        [HttpGet("{id}")]
        [ClaimRequirement(FunctionCode.SYSTEM_FUNCTION, CommandCode.VIEW)]
        public async Task<IActionResult> GetById(long id)
        {
            var function = await _functionBu.GetById(id);
            if (function == null)
            {
                return ToOkResult(new ApiNotFound("Không tìm thấy data."));
            }

            return ToOkResult(function);
        }

        [HttpPut("{id}")]
        [ClaimRequirement(FunctionCode.SYSTEM_FUNCTION, CommandCode.UPDATE)]
        [ApiValidationFilter]
        public async Task<IActionResult> Put(long id, [FromBody] FunctionVm request)
        {
            var function = await _functionBu.GetById(id);
            if (function == null)
            {
                return NotFound();
            }

            function.Name = request.Name;
            function.ParentId = request.ParentId;
            function.SortOrder = request.SortOrder;
            function.Url = request.Url;

            var data = await _functionBu.Update(function);

            return ToOkResult(data);
        }

        [HttpDelete("{id}")]
        [ClaimRequirement(FunctionCode.SYSTEM_FUNCTION, CommandCode.DELETE)]
        public async Task<IActionResult> Delete(long id)
        {
            var function = await _functionBu.Delete(id);
            return ToOkResult(function);
        }
    }
}