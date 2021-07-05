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
    public class ProductQuantityController : BaseController
    {
        private readonly IProductQuantityBusiness _productQuantityBus;
        public ProductQuantityController(IProductQuantityBusiness productQuantityBus)
        {
            _productQuantityBus = productQuantityBus;
        }

        [HttpPost("add")]
        public async Task<IActionResult> Post(ProductQuantityVM request)
        {
            var id = await _productQuantityBus.Add(request);
            return ToOkResult(id);
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            await _productQuantityBus.Delete(id);
            return ToOkResult();
        }

        [HttpGet("get_by_proctid/{productid}")]
        public async Task<IActionResult> GetByProductId(long productid)
        {
            var data = await _productQuantityBus.GetByProductId(productid);
            return ToOkResult(data);
        }


        [HttpGet("{id}")]
        [ClaimRequirement(FunctionCode.PRODUCTS_PRODUCT, CommandCode.VIEW)]
        public async Task<IActionResult> GetById(long id)
        {
            var user = await _productQuantityBus.GetById(id);
            if (user == null)
            {
                return NotFound();
            }

            return ToOkResult(user);
        }

        [HttpPut("update")]
        [ClaimRequirement(FunctionCode.PRODUCTS_PRODUCT, CommandCode.UPDATE)]
        public async Task<IActionResult> Put([FromBody] ProductQuantityVM request)
        {
            await _productQuantityBus.Update(request);
            return ToOkResult();
        }
        [HttpPut("updates")]
        [ClaimRequirement(FunctionCode.PRODUCTS_PRODUCT, CommandCode.UPDATE)]
        public async Task<IActionResult> Puts([FromBody] List<ProductQuantityVM> request)
        {
            await _productQuantityBus.Update(request);
            return ToOkResult();
        }
    }
}
