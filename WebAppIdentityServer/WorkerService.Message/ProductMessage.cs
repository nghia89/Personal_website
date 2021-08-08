using System;
using WebAppIdentityServer.ViewModel.Models.Product;

namespace WorkerService.Message
{
    public class ProductMessage
    {
        public Guid MessageId { get; set; } = new Guid();
        public ProductVM Product { get; set; }
        public DateTime CreateDate { get; set; } = DateTime.UtcNow;
    }
}
