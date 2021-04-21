using System.Threading.Tasks;

namespace WebAppIdentityServer.Data.EF.Interfaces
{
    public interface IUnitOfWork
    {
        Task CommitAsync();
    }
}
