namespace WebAppIdentityServer.ViewModel.Models.Product
{
    public class ProductQuantityVM
    {
        public int ProductId { get; set; }

        public int SizeId { get; set; }


        public int ColorId { get; set; }

        public int Quantity { get; set; }

        public ProductVM Product { get; set; }

        public SizeVM Size { get; set; }

        public ColorVM Color { get; set; }
        public long? OrgId { get; set; }
    }
}
