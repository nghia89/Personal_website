using Microsoft.AspNetCore.Mvc.Rendering;
using System.Collections.Generic;
using WebAppIdentityServer.ViewModel.Models.Common;
using WebAppIdentityServer.ViewModel.Models.Product;

namespace WebAppIdentityServer.Client.Models.ProductViewModels
{
    public class DetailViewModel
    {
        public ProductVM Product { get; set; }

        public bool Available { set; get; }

        public List<ProductVM> RelatedProducts { get; set; }

        public ProductVM Category { get; set; }

        public List<ProductImageVM> ProductImages { set; get; }

        public List<ProductVM> UpsellProducts { get; set; }

        public List<ProductVM> LastestProducts { get; set; }

        public List<TagVM> Tags { set; get; }

        public List<SelectListItem> Colors { set; get; }

        public List<SelectListItem> Sizes { set; get; }
    }
}
