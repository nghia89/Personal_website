using System.Threading.Tasks;
using WebAppIdentityServer.ViewModel.Models.Product;

namespace WorkerService.Business.Interfaces
{
    public interface IProductWorkerBusiness
    {
        Task AddTest(ProductVM model);
    }
}
