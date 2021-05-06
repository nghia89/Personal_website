using WebAppIdentityServer.Data.EF.Interfaces;

namespace WebAppIdentityServer.Data.EF.Entities
{
    public class BillDetail 
    {
        public long Id { get; set; }
        public int Quantity { set; get; }
        public decimal Price { set; get; }
        public long BillId { set; get; }
        public Bill Bill { set; get; }
        public long ProductId { set; get; }
        public Product Product { set; get; }
        public long? ColorId { set; get; }
        public Color Color { set; get; }
        public long? SizeId { set; get; }
        public virtual Size Size { set; get; }
    }
}
