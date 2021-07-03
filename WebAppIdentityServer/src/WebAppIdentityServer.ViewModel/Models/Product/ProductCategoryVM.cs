using System.Collections.Generic;
using WebAppIdentityServer.Utilities.Enum;

namespace WebAppIdentityServer.ViewModel.Models.Product
{
    public class ProductCategoryVM
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Title { set; get; }
        public string Description { get; set; }
        public string Code { get; set; }
        public long? ParentId { get; set; }
        public int SortOrder { get; set; }
        public string Image { get; set; }
        public Status Status { set; get; }
        public string Urls { set; get; }
        public string SeoAlias { set; get; }
        public string SeoKeywords { set; get; }
        public string SeoDescription { set; get; }
        public IEnumerable<ProductVM> Products { set; get; }
    }
}
