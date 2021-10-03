using System;
using WebAppIdentityServer.ViewModel.Models.Product;

namespace WorkerService.Message.Interfases
{
    public interface IProductMessage
    {
        Guid MessageId { get; set; }
        ProductVM Product { get; set; }
        DateTime CreateDate { get; set; }
    }
}
