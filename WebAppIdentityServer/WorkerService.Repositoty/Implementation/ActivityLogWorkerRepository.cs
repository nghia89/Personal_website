using Microsoft.AspNetCore.Http;
using WebAppIdentityServer.Data.EF;
using WebAppIdentityServer.Data.EF.Entities;
using WebAppIdentityServer.Data.EF.Interfaces;
using WorkerService.Repositoty.Interfaces;

namespace WorkerService.Repositoty.Interfaces
{
    public class ActivitylogWorkerRepositoty : EFRepository<ActivityLog>, IActivitylogWorkerRepositoty
    {
        private IUnitOfWork _unitOfWork;
        private readonly ApplicationDbContext _context;
        public ActivitylogWorkerRepositoty(ApplicationDbContext context, IUnitOfWork unitOfWork, IHttpContextAccessor accessor) : base(context, accessor)
        {
            this._context = context;
            this._unitOfWork = unitOfWork;
        }
    }
}
