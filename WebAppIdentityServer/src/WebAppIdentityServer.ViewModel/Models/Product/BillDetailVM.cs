namespace WebAppIdentityServer.ViewModel.Models.Product
{
    public class BillDetailVM
    {
        public int Id { get; set; }

        public int BillId { set; get; }

        public int ProductId { set; get; }

        public int Quantity { set; get; }

        public decimal Price { set; get; }

        public int ColorId { get; set; }

        public int SizeId { get; set; }

        public BillVM Bill { set; get; }

        public ProductVM Product { set; get; }
        public ColorVM Color { set; get; }

        public SizeVM Size { set; get; }
        public long? OrgId { get; set; }
    }
}
