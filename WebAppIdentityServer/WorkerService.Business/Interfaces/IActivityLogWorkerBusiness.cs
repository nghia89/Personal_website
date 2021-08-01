using System.Collections.Generic;
using System.Threading.Tasks;
using WebAppIdentityServer.Data.EF.Entities;
using WebAppIdentityServer.ViewModel.Models.Product;

namespace WorkerService.Business.Interfaces
{
    public interface IActivityLogWorkerBusiness
    {

        Task Add(ActivityLog model);

        Task DeleteLogsChedule30();

    }
}
