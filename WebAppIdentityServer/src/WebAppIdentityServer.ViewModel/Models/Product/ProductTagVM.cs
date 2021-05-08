namespace WebAppIdentityServer.ViewModel.Models.Product
{
    public class ProductTagVM
    {
        public int Id { get; set; }

        public int ProductId { get; set; }

        public string TagId { set; get; }

        public ProductVM Products { set; get; }

    }
}
