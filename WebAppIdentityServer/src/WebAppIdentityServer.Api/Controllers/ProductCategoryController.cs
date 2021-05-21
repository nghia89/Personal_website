using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAppIdentityServer.Business.Interfaces;
using WebAppIdentityServer.ViewModel.Models.Product;

namespace WebAppIdentityServer.Api.Controllers
{
    public class ProductCategoryController : BaseController
    {
        private readonly IProductCategoryBusiness _productCategoryBus;
        public ProductCategoryController(IProductCategoryBusiness productCategoryBus)
        {
            this._productCategoryBus = productCategoryBus;
        }

        [HttpGet]
        [Route("getall")]
        public async Task<ActionResult> GetProductCategory()
        {
            var data = await _productCategoryBus.GetAll(null);
            return new OkObjectResult(data);
        }

        [HttpPost]
        [Route("add")]
        public async Task<ActionResult> Add([FromBody] ProductCategoryVM category)
        {
            var data = await _productCategoryBus.Add(category);
            return new OkObjectResult(data);
        }

        [HttpPut]
        [Route("update")]
        public async Task Update([FromBody] ProductCategoryVM category)
        {
            await _productCategoryBus.Update(category);
        }
    }
}