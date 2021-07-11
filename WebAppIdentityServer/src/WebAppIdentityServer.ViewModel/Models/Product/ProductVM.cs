using System;
using System.Collections.Generic;
using WebAppIdentityServer.ViewModel.Enum;

namespace WebAppIdentityServer.ViewModel.Models.Product
{
    public class ProductVM
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Title { set; get; }
        public string Image { get; set; }
        public decimal Price { get; set; }
        public decimal OriginalPrice { get; set; }
        public decimal? PromotionPrice { get; set; }
        public string Code { get; set; }
        public string Description { get; set; }
        public string Content { get; set; }
        public int? ViewCount { get; set; }
        public string Tags { get; set; }
        public string SeoAlias { get; set; }
        public string SeoKeywords { get; set; }
        public string SeoDescription { get; set; }
        public long ProductCategoryId { set; get; }
        public string ProductCategoryName { set; get; }
        public ProductCategoryVM ProductCategory { set; get; }
        public List<ProductQuantityVM> ProductQuantity { set; get; }
        public List<ProductImageVM> ProductImages { set; get; }
        public Status Status { get; set; }
        public DateTime DateCreated { get; set; }
    }
}
