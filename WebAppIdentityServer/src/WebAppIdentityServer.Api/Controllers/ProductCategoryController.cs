using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAppIdentityServer.Api.Authorization;
using WebAppIdentityServer.Business.Interfaces;
using WebAppIdentityServer.Utilities.Constants;
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
        [Route("{id}")]
        [ClaimRequirement(FunctionCode.CONTENT_CATEGORY, CommandCode.VIEW)]
        public async Task<ActionResult> Get(int id)
        {
            var data = await _productCategoryBus.GetById(id);
            return Ok(data);
        }

        [HttpGet]
        [Route("getall")]
        [ClaimRequirement(FunctionCode.CONTENT_CATEGORY, CommandCode.VIEW)]
        public async Task<ActionResult> GetProductCategory()
        {
            var data = await _productCategoryBus.GetAll(null);
            return new OkObjectResult(data);
        }

        [HttpPost]
        [Route("add")]
        [ClaimRequirement(FunctionCode.CONTENT_CATEGORY, CommandCode.CREATE)]
        public async Task<ActionResult> Add([FromBody] ProductCategoryVM category)
        {
            var data = await _productCategoryBus.Add(category);
            return new OkObjectResult(data);
        }

        [HttpPut]
        [Route("update")]
        [ClaimRequirement(FunctionCode.CONTENT_CATEGORY, CommandCode.UPDATE)]
        public async Task Update([FromBody] ProductCategoryVM category)
        {
            await _productCategoryBus.Update(category);
        }


        [HttpGet]
        [Route("treeview")]
        [ClaimRequirement(FunctionCode.CONTENT_CATEGORY, CommandCode.VIEW)]
        public async Task<ActionResult> TreeView()
        {
            var data = await _productCategoryBus.TreeView();
            return new OkObjectResult(data);
        }
    }
}