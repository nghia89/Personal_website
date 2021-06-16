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
    public class ColorBusiness : BaseBusiness, IColorBusiness
    {
        private readonly ApplicationDbContext _context;
        private readonly IUnitOfWork _unitOfWork;
        public ColorBusiness(ApplicationDbContext context, IUnitOfWork unitOfWork,
            IUserResolverService userResolver) : base(userResolver)
        {
            this._context = context;
            this._unitOfWork = unitOfWork;
        }

        public async Task Add(ColorVM model)
        {
            var entity = new Color() { ColorCode = model.ColorCode, Name = model.Name };
            await _context.Colors.AddAsync(entity);
            await _unitOfWork.CommitAsync();
            return;
        }

        public async Task<List<ColorVM>> GetAll()
        {
            var data = await _context.Colors.ToListAsync();
            return data.Select(x => new ColorVM() { Id = x.Id, ColorCode = x.ColorCode, Name = x.Name }).ToList();
        }

        public async Task<ColorVM> GetById(int id)
        {
            var data = await _context.Colors.FirstOrDefaultAsync(a => a.Id == id);
            if (data == null)
            {
                new AddError("có lổi xảy ra");
            }

            return new ColorVM() { Id = data.Id, ColorCode = data.ColorCode, Name = data.Name };
        }

        public async Task Update(ColorVM model)
        {
            var entity = await _context.Colors.FirstOrDefaultAsync(a => a.Id == model.Id);

            if (entity == null) { new AddError("có lổi xảy ra"); return; }

            entity.Name = model.Name;
            _context.Colors.Update(entity);
            await _unitOfWork.CommitAsync();
            return;
        }
    }
}
