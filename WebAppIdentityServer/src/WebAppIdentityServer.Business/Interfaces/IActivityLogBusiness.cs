using System.Threading.Tasks;
using WebAppIdentityServer.Data.EF.Entities;

namespace WebAppIdentityServer.Business.Interfaces
{
    public interface IActivityLogBusiness
    {
        Task HandleAdd(ActivityLog model);
    }
}
