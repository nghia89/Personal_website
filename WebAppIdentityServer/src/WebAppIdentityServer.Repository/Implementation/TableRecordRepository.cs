using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using WebAppIdentityServer.Data.EF;
using WebAppIdentityServer.Data.EF.Entities;
using WebAppIdentityServer.Data.EF.Interfaces;
using WebAppIdentityServer.Repository.Interfaces;
using WebAppIdentityServer.ViewModel.Enum;
namespace WebAppIdentityServer.Repository.Implementation
{
    public class TableRecordRepository : EFRepository<TableRecords>, ITableRecordRepository
    {
        private IUnitOfWork _unitOfWork;
        private readonly ApplicationDbContext _context;
        private readonly IProductRepository _productRep;
        public TableRecordRepository(ApplicationDbContext context, IUnitOfWork unitOfWork,
        IProductRepository productRep,
         IHttpContextAccessor accessor) : base(context, accessor)
        {
            this._context = context;
            this._unitOfWork = unitOfWork;
            this._productRep = productRep;
        }

        public async Task<string> GenarateCodeProduct(string code, int type)
        {
            if (string.IsNullOrEmpty(code)) return null;
            var data = await _context.TableRecords.FirstOrDefaultAsync(a => a.Type == type);
            if (data == null && type == (int)EnumRecord.Product)
            {
                TableRecords entity = new TableRecords() { Count = 1, Type = type };
                _context.Add(entity);
                await _unitOfWork.CommitAsync();
                return $"{code}{ entity.Count}";
            }
            else
            {
                var codeProduct = $"{code}{data.Count}";
                var checkCode = await _productRep.FindFirstAsync(x => x.Code == codeProduct, null);
                if (checkCode == null) return codeProduct;
                else
                {
                    data.Count += 1;
                    _context.Update(data);
                    await _unitOfWork.CommitAsync();
                    return $"{code}{data.Count}";
                }

            }

        }
    }
}
