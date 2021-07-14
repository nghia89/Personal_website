using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using WebAppIdentityServer.Api.Authorization;
using WebAppIdentityServer.Api.Helpers;
using WebAppIdentityServer.Business.Interfaces;
using WebAppIdentityServer.Infrastructure.Constants;
using WebAppIdentityServer.ViewModel.Common;
using WebAppIdentityServer.ViewModel.Models.Common;

namespace WebAppIdentityServer.Api.Controllers
{
    public class PageOtherController : BaseController
    {
        private readonly IPageOtherBusiness _pageOtherBu;
        private readonly ILogger<PageOtherController> _logger;
        public PageOtherController(IPageOtherBusiness pageOtherBu, ILogger<PageOtherController> logger)
        {
            _pageOtherBu = pageOtherBu; _logger = logger;
        }

        [HttpPost]
        [Route("add")]
        [ClaimRequirement(FunctionCode.ST_PAGE_OTHER, CommandCode.CREATE)]
        public async Task<IActionResult> Post([FromBody] PageOtherVM request)
        {
            var result = await _pageOtherBu.Add(request);

            return ToOkResult(result);
        }

        [HttpGet]
        [Route("getall")]
        [ClaimRequirement(FunctionCode.ST_PAGE_OTHER, CommandCode.VIEW)]
        public async Task<IActionResult> GetAll()
        {
            var data = await _pageOtherBu.GetAll();
            return ToOkResult(data);
        }


        [HttpGet]
        [Route("paging")]
        [ClaimRequirement(FunctionCode.ST_PAGE_OTHER, CommandCode.VIEW)]
        public async Task<IActionResult> Paging([FromQuery] PagingParamModel pagingParam)
        {
            var items = await _pageOtherBu.Paging(pagingParam);

            return ToOkResult(items);
        }

        [HttpGet("{id}")]
        [ClaimRequirement(FunctionCode.ST_PAGE_OTHER, CommandCode.VIEW)]
        public async Task<IActionResult> GetById(int id)
        {
            var pageOther = await _pageOtherBu.GetById(id);
            return ToOkResult(pageOther);
        }

        [HttpPut("update")]
        [ClaimRequirement(FunctionCode.ST_PAGE_OTHER, CommandCode.UPDATE)]
        public async Task<IActionResult> Put([FromBody] PageOtherVM request)
        {
            if (request == null)
            {
                return NotFound();
            }

            var data = await _pageOtherBu.Update(request);

            return ToOkResult(data);
        }

        [HttpDelete("delete/{id}")]
        [ClaimRequirement(FunctionCode.ST_PAGE_OTHER, CommandCode.DELETE)]
        public async Task<IActionResult> Delete(int id)
        {
            var pageOther = await _pageOtherBu.Delete(id);
            return ToOkResult(pageOther);
        }
    }
}