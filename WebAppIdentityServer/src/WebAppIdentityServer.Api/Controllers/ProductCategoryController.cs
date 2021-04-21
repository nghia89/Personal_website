using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAppIdentityServer.Business.Interfaces;

namespace WebAppIdentityServer.Api.Controllers
{
    public class ProductCategoryController : BaseController
    {
        private readonly IProductCategoryBusiness _productCategoryBus;
        public ProductCategoryController(IProductCategoryBusiness productCategoryBus)
        {
            this._productCategoryBus = productCategoryBus;
        }


        #region  api internal

        [HttpGet]
        [Route("internal/get_product_cate")]
        [AllowAnonymous]
        public async Task<ActionResult> GetProductCategory()
        {
            var data = await _productCategoryBus.GetAll(null);
            return new OkObjectResult(data);
        }

        #endregion

    }
}
