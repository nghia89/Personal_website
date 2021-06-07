using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using WebAppIdentityServer.Api.Authorization;
using WebAppIdentityServer.Api.Helpers;
using WebAppIdentityServer.Business.Interfaces;
using WebAppIdentityServer.Utilities.Constants;
using WebAppIdentityServer.ViewModel.Common;
using WebAppIdentityServer.ViewModel.Models.Product;

namespace WebAppIdentityServer.Api.Controllers
{
    public class ProductsController : BaseController
    {
        private readonly IProductBusiness _productBusiness;
        public ProductsController(IProductBusiness productBusiness)
        {
            this._productBusiness = productBusiness;
        }
        // GET: api/Products

        [HttpGet]
        [Route("get/{id}")]
        [ClaimRequirement(FunctionCode.CONTENT_PRODUCT, CommandCode.VIEW)]
        public async Task<IActionResult> Get(long id)
        {
            var data = await _productBusiness.GetById(id);
            return ToOkResult(data);

        }
        [HttpGet]
        [Route("getAll")]
        [ClaimRequirement(FunctionCode.CONTENT_PRODUCT, CommandCode.VIEW)]
        public async Task<IActionResult> GetAll()
        {
            var data = await _productBusiness.GetAll();
            return ToOkResult(data);

        }

        [HttpGet]
        [Route("genarate_code/{code}")]
        [ClaimRequirement(FunctionCode.CONTENT_PRODUCT, CommandCode.VIEW)]
        public async Task<IActionResult> GenarateCode(string code)
        {
            var data = await _productBusiness.GenarateCode(code);
            return ToOkResult(data);
        }

        [HttpGet]
        [Route("paging")]
        [ClaimRequirement(FunctionCode.CONTENT_PRODUCT, CommandCode.VIEW)]
        public async Task<IActionResult> Paging([FromQuery] PagingParamModel pagingParam)
        {
            var data = await _productBusiness.Paging(pagingParam);
            return ToOkResult(data);
        }
        // POST: api/Products

        [HttpPost]
        [Route("add")]
        [ClaimRequirement(FunctionCode.CONTENT_PRODUCT, CommandCode.CREATE)]
        [ApiValidationFilter]
        public async Task<IActionResult> Post([FromBody] ProductVM model)
        {
            ProductVM data = await _productBusiness.Add(model);
            return ToOkResult(data);
        }

        [HttpPut]
        [Route("update")]


        [ClaimRequirement(FunctionCode.CONTENT_PRODUCT, CommandCode.UPDATE)]
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