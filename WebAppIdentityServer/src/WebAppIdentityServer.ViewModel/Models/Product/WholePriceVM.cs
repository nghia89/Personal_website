namespace WebAppIdentityServer.ViewModel.Models.Product
{
    public class WholePriceVM
    {
        public int ProductId { get; set; }

        public int FromQuantity { get; set; }

        public int ToQuantity { get; set; }

        public decimal Price { get; set; }
    }
}
