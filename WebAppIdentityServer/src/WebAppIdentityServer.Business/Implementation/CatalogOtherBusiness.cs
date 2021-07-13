using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAppIdentityServer.Business.Interfaces;
using WebAppIdentityServer.Data.EF.Entities;
using WebAppIdentityServer.Data.EF.Interfaces;
using WebAppIdentityServer.Repository.Interfaces;
using WebAppIdentityServer.ViewModel.Models.Common;

namespace WebAppIdentityServer.Business.Implementation
{
    public class CatalogOtherBusiness : BaseBusiness, ICatalogOtherBusiness
    {
        private readonly ICatalogOtherRepository _CatalogOtherRep;
        private readonly IUnitOfWork _unitOfWork;
        public CatalogOtherBusiness(ICatalogOtherRepository CatalogOtherRep, IUnitOfWork unitOfWork,
            IUserResolverService userResolver) : base(userResolver)
        {
            this._CatalogOtherRep = CatalogOtherRep;
            this._unitOfWork = unitOfWork;
        }

        public async Task<CatalogOtherVM> Add(CatalogOtherVM model)
        {
            var entity = ToEntity(model);
            await _CatalogOtherRep.AddAsync(entity);
            return model;
        }

        public async Task<bool> Delete(long id)
        {
            var entity = await _CatalogOtherRep.GetByIdAsync(id);
            if (entity == null)
            {
                return false;
            }

            await _CatalogOtherRep.RemoveAsync(entity);
            return true;
        }

        public async Task<List<CatalogOtherVM>> GetAll()
        {
            var data = await _CatalogOtherRep.GetAllAsync(null);
            return data.Select(a => ToModel(a)).ToList();
        }

        public async Task<CatalogOtherVM> GetById(long id)
        {
            var data = await _CatalogOtherRep.GetByIdAsync(id);
            if (data == null)
            {
                AddError("Dữ liệu không tồn tại.");
                return null;
            }
            return ToModel(data);
        }

        public async Task<CatalogOtherVM> Update(CatalogOtherVM model)
        {
            var entity = await _CatalogOtherRep.GetByIdAsync(model.Id);
            if (entity == null)
            {
                AddError("Dữ liệu không tồn tại.");

                return null;
            }

            var entitySetvalue = await _CatalogOtherRep.UpdateAsync(ToEntity(model), model.Id);
            return ToModel(entitySetvalue);
        }


        public CatalogOtherVM ToModel(CatalogOther model)
        {
            if (model == null) return null;
            return new CatalogOtherVM
            {
                Id = model.Id,
                Name = model.Name,
                Type = model.Type
            };
        }

        public CatalogOther ToEntity(CatalogOtherVM model)
        {
            if (model == null) return null;
            return new CatalogOther
            {
                Id = model.Id,
                Name = model.Name,
                Type = model.Type
            };
        }

    }
}
