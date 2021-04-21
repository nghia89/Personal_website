using Microsoft.AspNetCore.Http;
using WebAppIdentityServer.Data.EF;
using WebAppIdentityServer.Data.EF.Entities;
using WebAppIdentityServer.Data.EF.Interfaces;
using WebAppIdentityServer.Repository.Interfaces;

namespace WebAppIdentityServer.Repository.Implementation
{
    public class ProductRepository : EFRepository<Product>, IProductRepository
    {
        private IUnitOfWork _unitOfWork;
        private readonly ApplicationDbContext _context;
        public ProductRepository(ApplicationDbContext context, IUnitOfWork unitOfWork, IHttpContextAccessor accessor) : base(context, accessor)
        {
            this._context = context;
            this._unitOfWork = unitOfWork;
        }
    }
}
