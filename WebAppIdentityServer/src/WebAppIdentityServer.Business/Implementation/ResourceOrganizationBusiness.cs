using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using WebAppIdentityServer.Business.Interfaces;
using WebAppIdentityServer.Business.Mappers;
using WebAppIdentityServer.Data.EF.Entities;
using WebAppIdentityServer.Data.EF.Interfaces;
using WebAppIdentityServer.Repository.Interfaces;
using WebAppIdentityServer.Utilities.Enum;
using WebAppIdentityServer.ViewModel.Models.Product;
using WebAppIdentityServer.ViewModel.Models.System;

namespace WebAppIdentityServer.Business.Implementation
{
    public class ResourceOrganizationBusiness : IResourceOrganizationBusiness
    {

        private readonly IResourceOrganizationRepository _resourceOrganizationRep;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IUserBusiness _userBus;
        public ResourceOrganizationBusiness(IResourceOrganizationRepository resourceOrganizationRep, IUserBusiness userBus, IUnitOfWork unitOfWork)
        {
            this._resourceOrganizationRep = resourceOrganizationRep;
            this._unitOfWork = unitOfWork;
            this._userBus = userBus;
        }

        public async Task Add(ResourceOrganizationVM model)
        {
            var entity = model.ToEntity();
            await _resourceOrganizationRep.AddAsync(entity);
            await _unitOfWork.CommitAsync();

            var getOrg = _resourceOrganizationRep.FindFirstAsync(a => a.Email == entity.Email,null);
            if (getOrg != null)
            {
                var userInit = new UserVm()
                {
                    Email = model.Email,
                    PhoneNumber = model.Phone,
                    Dob = DateTime.Now,
                    OrgId = getOrg.Id,
                    FirstName = "Tổ chức",
                    LastName = "mới"
                };
                await _userBus.Add(userInit);
            }
           

        }

        public async Task Delete(long id)
        {
            var entity = await _resourceOrganizationRep.GetByIdAsync(id);
            if (entity != null)
                await _resourceOrganizationRep.RemoveAsync(entity);
        }

        public async Task<(List<ResourceOrganizationVM> data, long totalCount)> GetAllPaging(string keyword, int page, int pageSize)
        {
            var (data, totalCount) = await _resourceOrganizationRep.Paging(keyword, page, pageSize, new Expression<Func<ResourceOrganization, object>>[] { a => a.Name }, null);
            return (data.Select(a => a.ToModel()).ToList(), totalCount);
        }

        public async Task<ResourceOrganizationVM> GetById(long id)
        {
            var entity = await _resourceOrganizationRep.GetByIdAsync(id);
            return entity.ToModel();
        }

        public async Task Update(long id, ResourceOrganizationVM model)
        {
            var data = await _resourceOrganizationRep.GetByIdAsync(id);
            if (data != null)
            {
                if (!string.IsNullOrEmpty(model.Name))
                    data.Name = model.Name;
                if (!string.IsNullOrEmpty(model.Phone))
                    data.Phone = model.Phone;
                if (!string.IsNullOrEmpty(model.Email))
                    data.Email = model.Email;
                if (!string.IsNullOrEmpty(model.Description))
                    data.Description = model.Description;
                await _resourceOrganizationRep.UpdateAsync(data, data.Id);
                await _unitOfWork.CommitAsync();
            }
        }
    }
}
