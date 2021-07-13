using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using WebAppIdentityServer.Api.Helpers;
using WebAppIdentityServer.Business.Interfaces;
using WebAppIdentityServer.ViewModel.Models.Common;

namespace WebAppIdentityServer.Api.Controllers
{
    public class CatalogOtherController : BaseController
    {
        private readonly ICatalogOtherBusiness _CatalogOtherBu;
        private readonly ILogger<CatalogOtherController> _logger;
        public CatalogOtherController(ICatalogOtherBusiness CatalogOtherBu, ILogger<CatalogOtherController> logger)
        {
            _CatalogOtherBu = CatalogOtherBu; _logger = logger;
        }

        [HttpPost]
        [ApiValidationFilter]
        public async Task<IActionResult> Post([FromBody] CatalogOtherVM request)
        {
            var result = await _CatalogOtherBu.Add(request);

            return ToOkResult(result);
        }

        [HttpGet]
        [Route("getall")]
        public async Task<IActionResult> GetAll()
        {
            var data = await _CatalogOtherBu.GetAll();
            return ToOkResult(data);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(long id)
        {
            var CatalogOther = await _CatalogOtherBu.GetById(id);
            return ToOkResult(CatalogOther);
        }

        [HttpPut("{id}")]
        [ApiValidationFilter]
        public async Task<IActionResult> Put(long id, [FromBody] CatalogOtherVM request)
        {
            if (request == null)
            {
                return NotFound();
            }

            var data = await _CatalogOtherBu.Update(request);

            return ToOkResult(data);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            var CatalogOther = await _CatalogOtherBu.Delete(id);
            return ToOkResult(CatalogOther);
        }
    }
}