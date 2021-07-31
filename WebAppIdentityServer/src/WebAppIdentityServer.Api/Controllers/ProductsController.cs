using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebAppIdentityServer.Api.Authorization;
using WebAppIdentityServer.Api.Helpers;
using WebAppIdentityServer.Business.Interfaces;
using WebAppIdentityServer.Infrastructure.Constants;
using WebAppIdentityServer.ViewModel.Common;
using WebAppIdentityServer.ViewModel.Models.Product;

namespace WebAppIdentityServer.Api.Controllers
{
    public class ProductsController : BaseController
    {
        private readonly IProductBusiness _productBusiness;
        private readonly IProductImageBusiness _productImage;
        public ProductsController(IProductBusiness productBusiness, IProductImageBusiness productImage)
        {
            this._productBusiness = productBusiness;
            this._productImage = productImage;
        }
        // GET: api/Products

        [HttpGet]
        [Route("get/{id}")]
        [ClaimRequirement(FunctionCode.PRODUCTS_PRODUCT, CommandCode.VIEW)]
        public async Task<IActionResult> Get(long id)
        {
            var data = await _productBusiness.GetById(id);
            return ToOkResult(data);

        }

        [HttpDelete]
        [Route("delete/{id}")]
        [ClaimRequirement(FunctionCode.PRODUCTS_PRODUCT, CommandCode.DELETE)]
        public async Task<IActionResult> Delete(long id)
        {
            await _productBusiness.Delete(id);
            return ToOkResult();

        }

        [HttpDelete]
        [Route("delete/{id}/image/{imgid}")]
        [ClaimRequirement(FunctionCode.PRODUCTS_PRODUCT, CommandCode.DELETE)]
        public async Task<IActionResult> DeleteImg(long imgid)
        {
            await _productBusiness.DeleteImg(imgid);
            return ToOkResult();

        }

        [HttpGet]
        [Route("{id}/images")]
        [ClaimRequirement(FunctionCode.PRODUCTS_PRODUCT, CommandCode.VIEW)]
        public async Task<IActionResult> GetProductImages(long id)
        {
            var data = await _productImage.GetByProductId(id);
            return ToOkResult(data);

        }

        [HttpPut]
        [Route("{id}/images/reorder")]
        [ClaimRequirement(FunctionCode.PRODUCTS_PRODUCT, CommandCode.UPDATE)]
        public async Task<IActionResult> ProductImageReorder(long id, [FromBody] List<long> imgIds)
        {
            await _productImage.ProductImageReorder(id, imgIds);
            return ToOkResult();

        }


        [HttpGet]
        [Route("getAll")]
        [ClaimRequirement(FunctionCode.PRODUCTS_PRODUCT, CommandCode.VIEW)]
        public async Task<IActionResult> GetAll()
        {
            var data = await _productBusiness.GetAll();
            return ToOkResult(data);

        }

        [HttpGet]
        [Route("generate_code/{code}")]
        [ClaimRequirement(FunctionCode.PRODUCTS_PRODUCT, CommandCode.VIEW)]
        public async Task<IActionResult> GenarateCode(string code)
        {
            var data = await _productBusiness.GenarateCode(code);
            return ToOkResult(data);
        }

        [HttpGet]
        [Route("paging")]
        [ClaimRequirement(FunctionCode.PRODUCTS_PRODUCT, CommandCode.VIEW)]
        public async Task<IActionResult> Paging([FromQuery] PagingParamModel pagingParam)
        {
            var data = await _productBusiness.Paging(pagingParam);
            return ToOkResult(data);
        }
        // POST: api/Products

        [HttpPost]
        [Route("add")]
        [ClaimRequirement(FunctionCode.PRODUCTS_PRODUCT, CommandCode.CREATE)]
        [ApiValidationFilter]
        public async Task<IActionResult> Post([FromBody] ProductVM model)
        {
            long data = await _productBusiness.Add(model);
            return ToOkResult(data);
        }

        [HttpPost]
        [Route("add_test")]
        public async Task<IActionResult> PostTest([FromBody] ProductVM model)
        {
           await _productBusiness.AddTest(model);
            return ToOkResult();
        }

        [HttpPut]
        [Route("update")]


        [ClaimRequirement(FunctionCode.PRODUCTS_PRODUCT, CommandCode.UPDATE)]
        [ApiValidationFilter]
        public async Task<IActionResult> Put([FromBody] ProductVM model)
        {
            ProductVM data = await _productBusiness.Update(model);
            return ToOkResult(data);
        }

        #region  api internal

        [HttpGet]
        [Route("internal/get_product_by_cate/{cateId}")]
        [AllowAnonymous]
        public async Task<IActionResult> Paging(long cateId)
        {
            var data = await _productBusiness.GetProductByCateId(cateId);
            return ToOkResult(data);
        }


        #endregion

    }
}