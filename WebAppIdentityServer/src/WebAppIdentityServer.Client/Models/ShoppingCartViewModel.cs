using WebAppIdentityServer.ViewModel.Models.Product;

namespace WebAppIdentityServer.Client.Models
{
    public class ShoppingCartViewModel
    {
        public ProductVM Product { set; get; }

        public int Quantity { set; get; }

        public decimal Price { set; get; }

        public ColorVM Color { get; set; }

        public SizeVM Size { get; set; }
    }
}