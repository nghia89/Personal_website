using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using WebAppIdentityServer.Api.Authorization;
using WebAppIdentityServer.Business.Interfaces;
using WebAppIdentityServer.Utilities.Constants;
using WebAppIdentityServer.ViewModel.Common;
using WebAppIdentityServer.ViewModel.Models.Product;

namespace WebAppIdentityServer.Api.Controllers
{
    public class ProductCollectionsController : BaseController
    {
        private readonly IProductCollectionBusiness _productCollectionBus;
        public ProductCollectionsController(IProductCollectionBusiness productCollectionBus)
        {
            this._productCollectionBus = productCollectionBus;
        }

        [HttpGet]
        [Route("{id}")]
        [ClaimRequirement(FunctionCode.PRODUCTS_COLLECTIONS, CommandCode.VIEW)]
        public async Task<IActionResult> Get(int id)
        {
            var data = await _productCollectionBus.GetById(id);
            return ToOkResult(data);
        }

        [HttpDelete]
        [Route("delete/{id}")]
        [ClaimRequirement(FunctionCode.PRODUCTS_COLLECTIONS, CommandCode.DELETE)]
        public async Task<IActionResult> Delete(int id)
        {
            await _productCollectionBus.Delete(id);
            return ToOkResult();
        }

        [HttpGet]
        [Route("getall")]
        [ClaimRequirement(FunctionCode.PRODUCTS_COLLECTIONS, CommandCode.VIEW)]
        public async Task<IActionResult> GetAll()
        {
            var data = await _productCollectionBus.GetAll();
            return ToOkResult(data);
        }

        [HttpPost]
        [Route("add")]
        [ClaimRequirement(FunctionCode.PRODUCTS_COLLECTIONS, CommandCode.CREATE)]
        public async Task<IActionResult> Add([FromBody] ProductCollectionVM model)
        {
            var data = await _productCollectionBus.Add(model);
            return ToOkResult(data);
        }

        [HttpPut]
        [Route("update")]
        [ClaimRequirement(FunctionCode.PRODUCTS_COLLECTIONS, CommandCode.UPDATE)]
        public async Task Update([FromBody] ProductCollectionVM model)
        {
            await _productCollectionBus.Update(model);
        }

        [HttpGet]
        [Route("paging")]
        [ClaimRequirement(FunctionCode.PRODUCTS_COLLECTIONS, CommandCode.VIEW)]
        public async Task<IActionResult> Paging([FromQuery] PagingParamModel pagingParam)
        {
            var data = await _productCollectionBus.Paging(pagingParam);
            return ToOkResult(data);
        }
    }
}