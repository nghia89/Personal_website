using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebAppIdentityServer.ViewModel.Models.Product;
using WorkerService.Message.Interfases;

namespace WorkerService.Message
{
   public class ProductMessage
    {
        public Guid MessageId { get; set; } = new Guid();
        public ProductVM Product { get; set; }
        public DateTime CreateDate { get; set; } = DateTime.UtcNow;
    }
}
