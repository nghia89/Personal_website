using WebAppIdentityServer.Data.EF.Entities;

namespace WebAppIdentityServer.Business
{
    public static class SelectField
    {
        public static Product SelectFieldProduct(this Product product)
        {
            return new Product()
            {
                Name = product.Name,
                Description = product.Description,
                Content = product.Content,
                CreatedBy = product.CreatedBy,
                OriginalPrice = product.OriginalPrice,
                ProductCategory = product.ProductCategory,
                ProductCategoryId = product.ProductCategoryId
            };
        }
    }
}
