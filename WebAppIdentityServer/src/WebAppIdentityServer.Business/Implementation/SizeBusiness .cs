using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAppIdentityServer.Business.Interfaces;
using WebAppIdentityServer.Business.Mappers;
using WebAppIdentityServer.Data.EF;
using WebAppIdentityServer.Data.EF.Entities;
using WebAppIdentityServer.Data.EF.Interfaces;
using WebAppIdentityServer.Repository.Interfaces;
using WebAppIdentityServer.Utilities.Helpers;
using WebAppIdentityServer.ViewModel.Models.Common;
using WebAppIdentityServer.ViewModel.Models.Product;

namespace WebAppIdentityServer.Business.Implementation
{
    public class SizeBusiness : BaseBusiness, ISizeBusiness
    {
        private readonly ApplicationDbContext _context;
        private readonly IUnitOfWork _unitOfWork;
        public SizeBusiness(ApplicationDbContext context, IUnitOfWork unitOfWork,
            IUserResolverService userResolver) : base(userResolver)
        {
            this._context = context;
            this._unitOfWork = unitOfWork;
        }

        public async Task Add(SizeVM model)
        {
            var entity = new Size() { Name = model.Name };
            await _context.Sizes.AddAsync(entity);
            await _unitOfWork.CommitAsync();
            return;
        }

        public async Task<List<SizeVM>> GetAll()
        {
            var data = await _context.Sizes.ToListAsync();
            return data.Select(x => new SizeVM() { Id = x.Id, Name = x.Name }).ToList();
        }

        public async Task<SizeVM> GetById(int id)
        {
            var data = await _context.Colors.FirstOrDefaultAsync(a => a.Id == id);
            if (data == null)
            {
                new AddError("có lổi xảy ra");
            }

            return new SizeVM() { Id = data.Id, Name = data.Name };
        }

        public async Task Update(SizeVM model)
        {
            var entity = await _context.Sizes.FirstOrDefaultAsync(a => a.Id == model.Id);

            if (entity == null) { new AddError("có lổi xảy ra"); return; }

            entity.Name = model.Name;
            _context.Sizes.Update(entity);
            await _unitOfWork.CommitAsync();
            return;
        }
    }
}
