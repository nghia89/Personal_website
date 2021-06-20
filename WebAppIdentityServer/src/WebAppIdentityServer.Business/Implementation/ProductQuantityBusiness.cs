using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAppIdentityServer.Business.Interfaces;
using WebAppIdentityServer.Business.Mappers;
using WebAppIdentityServer.Data.EF.Interfaces;
using WebAppIdentityServer.Repository.Interfaces;
using WebAppIdentityServer.Utilities.Helpers;
using WebAppIdentityServer.ViewModel.Models.Common;
using WebAppIdentityServer.ViewModel.Models.Product;

namespace WebAppIdentityServer.Business.Implementation
{
    public class ProductQuantityBusiness : BaseBusiness, IProductQuantityBusiness
    {
        private readonly IProductQuantityRepository _quantityRep;
        private readonly IUnitOfWork _unitOfWork;
        public ProductQuantityBusiness(IProductQuantityRepository quantityRep, IUnitOfWork unitOfWork,
            IUserResolverService userResolver) : base(userResolver)
        {
            this._quantityRep = quantityRep;
            this._unitOfWork = unitOfWork;
        }

        public async Task Add(ProductQuantityVM model)
        {
            var entity = model.ToEntity();
            await _quantityRep.AddAsync(entity);
            await _unitOfWork.CommitAsync();
            return;
        }

        public async Task Delete(long id)
        {
            var data = await _quantityRep.GetByIdAsync(id);
            if (data == null)
            {
                AddError("Không tìm thấy dữ liệu.");
            }
            await _quantityRep.RemoveAsync(data);
        }

        public async Task<ProductQuantityVM> GetById(long id)
        {
            var data = await _quantityRep.GetByIdAsync(id);
            if (data == null)
            {
                AddError("có lổi xảy ra");
            }
            return data.ToModel();
        }


        public async Task<List<ProductQuantityVM>> GetByProductId(long productId)
        {
            var data = await _quantityRep.FindAllAsync(a => a.ProductId == productId, null);
            if (data == null)
            {
                AddError("có lổi xảy ra");
            }
            return data.Select(x => x.ToModel()).ToList();
        }

        public async Task Update(ProductQuantityVM model)
        {
            var data = await _quantityRep.GetByIdAsync(model.Id);

            if (data == null) { AddError("có lổi xảy ra"); return; }
            var entity = model.ToEntity();
            await _quantityRep.UpdateAsync(entity, entity.Id);
            await _unitOfWork.CommitAsync();
            return;
        }
    }
}
