using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using WebAppIdentityServer.Data.EF;
using WebAppIdentityServer.Data.EF.Entities;
using WebAppIdentityServer.Data.EF.Interfaces;
using WebAppIdentityServer.Repository.Interfaces;

namespace WebAppIdentityServer.Repository.Implementation
{
    public class ProductQuantityRepository : EFRepository<ProductQuantity>, IProductQuantityRepository
    {
        private IUnitOfWork _unitOfWork;
        private readonly ApplicationDbContext _context;
        public ProductQuantityRepository(ApplicationDbContext context, IUnitOfWork unitOfWork, IHttpContextAccessor accessor) : base(context, accessor)
        {
            this._context = context;
            this._unitOfWork = unitOfWork;
        }

        public async Task<IEnumerable<ProductQuantity>> getByProductIds(long productId)
        {
            var data = await FindAllAsync(x => x.ProductId == productId, new Expression<Func<ProductQuantity, object>>[] { c => c.Size, c => c.Color });
            return data;
        }
    }
}
