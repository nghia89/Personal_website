using System.Collections.Generic;
using WebAppIdentityServer.ViewModel.Models.Common;
using WebAppIdentityServer.ViewModel.Models.Product;

namespace WebAppIdentityServer.Client.Models
{
    public class HomeViewModel
    {
        public List<SlideShowVM> HomeSlides { get; set; }
        public List<ProductVM> HotProducts { get; set; }
        public List<ProductVM> BuyALotProducts { get; set; }
        public List<ProductVM> TopSellProducts { get; set; }
        public List<ProductVM> NewSellProducts { get; set; }

        public List<ProductCategoryVM> HomeCategories { set; get; }

        public string Title { set; get; }
        public string MetaKeyword { set; get; }
        public string MetaDescription { set; get; }
        public string Copyright { set; get; }
        public string Author { set; get; }
    }
}
