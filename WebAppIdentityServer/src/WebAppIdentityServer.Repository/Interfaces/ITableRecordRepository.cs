using System.Threading.Tasks;
using WebAppIdentityServer.Data.EF.Entities;
using WebAppIdentityServer.Data.EF.Interfaces;

namespace WebAppIdentityServer.Repository.Interfaces
{
    public interface ITableRecordRepository : IRepository<TableRecords>
    {
        Task<string> GenarateCodeProduct(string code, int type);
    }
}
