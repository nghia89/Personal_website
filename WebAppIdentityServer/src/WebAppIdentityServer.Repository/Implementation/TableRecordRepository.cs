using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using WebAppIdentityServer.Data.EF;
using WebAppIdentityServer.Data.EF.Entities;
using WebAppIdentityServer.Data.EF.Interfaces;
using WebAppIdentityServer.Repository.Interfaces;
using WebAppIdentityServer.Utilities.Enum;
namespace WebAppIdentityServer.Repository.Implementation
{
    public class TableRecordRepository : EFRepository<TableRecords>, ITableRecordRepository
    {
        private IUnitOfWork _unitOfWork;
        private readonly ApplicationDbContext _context;
        public TableRecordRepository(ApplicationDbContext context, IUnitOfWork unitOfWork, IHttpContextAccessor accessor) : base(context, accessor)
        {
            this._context = context;
            this._unitOfWork = unitOfWork;
        }

        public async Task<long> GetAndUpdateRecord(int type)
        {
            var data = await _context.TableRecords.FirstOrDefaultAsync(a => a.Type == type);
            if (data == null && type == (int)EnumRecord.Product)
            {
                TableRecords entity = new TableRecords() { Count = 1, Type = type };
                _context.Add(entity);
                await _unitOfWork.CommitAsync();
                return entity.Count;
            }
            else
            {
                data.Count += 1;
                _context.Update(data);
                await _unitOfWork.CommitAsync();
                return data.Count;
            }

        }
    }
}
