using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAppIdentityServer.Business.Interfaces;
using WebAppIdentityServer.Business.Mappers;
using WebAppIdentityServer.Data.EF;
using WebAppIdentityServer.Data.EF.Entities;
using WebAppIdentityServer.Data.EF.Interfaces;
using WebAppIdentityServer.ViewModel.Models.Product;

namespace WebAppIdentityServer.Business.Implementation
{
    public class ProductImageBusiness : BaseBusiness, IProductImageBusiness
    {
        private readonly ApplicationDbContext _context;
        private readonly IUnitOfWork _unitOfWork;
        public ProductImageBusiness(ApplicationDbContext context, IUnitOfWork unitOfWork,
            IUserResolverService userResolver) : base(userResolver)
        {
            this._context = context;
            this._unitOfWork = unitOfWork;
        }

        public async Task Add(ProductImageVM model)
        {
            var entity = model.ToEntity();
            await _context.ProductImages.AddAsync(entity);
            await _unitOfWork.CommitAsync();
        }

        public async Task Delete(long id)
        {
            var data = await GetByIdAsync(id);
            if (data == null)
            {
                AddError("Không tìm thấy dữ liệu.");
            }
            _context.ProductImages.Remove(data);
        }

        public async Task<ProductImages> GetByIdAsync(long id)
        {
            return await _context.ProductImages.FirstOrDefaultAsync(x => x.Id == id);
        }


        public async Task<ProductImageVM> GetById(long id)
        {
            var data = await GetByIdAsync(id);
            if (data == null)
            {
                AddError("có lổi xảy ra");
            }
            return data.ToModel();
        }


        public async Task<List<ProductImageVM>> GetByProductId(long productId)
        {
            var data = await _context.ProductImages.Where(x => x.ProductId == productId).ToListAsync();
            if (data == null)
            {
                AddError("có lổi xảy ra");
            }
            return data.Select(x => x.ToModel()).OrderBy(x => x.SortOrder).ToList();
        }

        public async Task Update(ProductImageVM model)
        {
            var data = await GetByIdAsync(model.Id);

            if (data == null) { AddError("có lổi xảy ra"); return; }
            var entity = model.ToEntity();
            _context.ProductImages.Update(entity);
            await _unitOfWork.CommitAsync();
            return;
        }

        public async Task Add(List<ProductImageVM> model, long productId)
        {
            var dataImg = await _context.ProductImages.Where(x => x.ProductId == productId).ToListAsync();
            var entity = model.Select(x => x.ToEntity()).ToList();
            if (dataImg.Any())
            {
                var lastIndex = dataImg.OrderByDescending(x => x.SortOrder).FirstOrDefault().SortOrder;
                foreach (var item in entity)
                {
                    lastIndex++;
                    item.SortOrder = lastIndex;

                }
            }
            await _context.ProductImages.AddRangeAsync(entity);
            await _unitOfWork.CommitAsync();
        }

        public async Task ProductImageReorder(long productId, List<long> imgIds)
        {
            var data = await _context.ProductImages.Where(x => x.ProductId == productId).ToListAsync();
            var index = 1;

            foreach (var id in imgIds)
            {
                var dataImg = data.FirstOrDefault(x => x.Id == id);
                if (dataImg != null)
                {
                    dataImg.SortOrder = index;
                    index++;
                }
            }

            _context.ProductImages.UpdateRange(data);
            await _unitOfWork.CommitAsync();
        }
    }
}
