using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebAppIdentityServer.ViewModel.Models.Product;
using WorkerService.Message.Interfases;

namespace WorkerServices.Message
{
   public class ProductMessage: IProductMessage
    {
        public Guid MessageId { get; set; }
        public ProductVM Product { get; set; }
        public DateTime CreationDate { get; set; }
    }
}
