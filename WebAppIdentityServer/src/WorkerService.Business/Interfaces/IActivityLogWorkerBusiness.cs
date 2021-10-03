using System.Threading.Tasks;
using WebAppIdentityServer.Data.EF.Entities;

namespace WorkerService.Business.Interfaces
{
    public interface IActivityLogWorkerBusiness
    {

        Task Add(ActivityLog model);

        Task DeleteLogsChedule30();

    }
}
