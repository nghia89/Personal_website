namespace WebAppIdentityServer.ViewModel.Models.Product
{
    public class ProductImageVM
    {
        public int Id { get; set; }

        public int ProductId { get; set; }

        public ProductVM Product { get; set; }

        public string Path { get; set; }

        public string Caption { get; set; }
        public long? OrgId { get; set; }
    }
}
