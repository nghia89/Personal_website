using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebAppIdentityServer.ViewModel.Models.Product;

namespace WorkerService.Message.Interfases
{
   public interface IProductMessage
    {
        Guid MessageId { get; set; }
        ProductVM Product { get; set; }
        DateTime CreationDate { get; set; }
    }
}
