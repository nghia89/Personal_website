using System.Threading.Tasks;
using WebAppIdentityServer.Business.Interfaces;
using WebAppIdentityServer.Business.Mappers;
using WebAppIdentityServer.Data.EF.Interfaces;
using WebAppIdentityServer.Repository.Interfaces;
using WebAppIdentityServer.Utilities.Helpers;
using WebAppIdentityServer.ViewModel.Models.Common;

namespace WebAppIdentityServer.Business.Implementation
{
    public class SystemConfigBusiness : BaseBusiness, ISystemConfigBusiness
    {
        private readonly ISystemConfigRepository _systemConfigRep;
        private readonly IUnitOfWork _unitOfWork;
        public SystemConfigBusiness(ISystemConfigRepository systemConfigRep, IUnitOfWork unitOfWork,
            IUserResolverService userResolver) : base(userResolver)
        {
            this._systemConfigRep = systemConfigRep;
            this._unitOfWork = unitOfWork;
        }

        public async Task Add(SystemConfigVM model)
        {
            var entity = model.ToEntity();
            await _systemConfigRep.AddAsync(entity);
            await _unitOfWork.CommitAsync();
            return;
        }

        public async Task<SystemConfigVM> GetByFirstSystem()
        {
            var data = await _systemConfigRep.FindFirstAsync(a => a.Id != 0, null);
            if (data == null) return null;
            return data.ToModel();
        }

        public async Task<SystemConfigVM> GetById(long id)
        {
            var data = await _systemConfigRep.GetByIdAsync(id);
            if (data == null)
            {
                new AddError("có lổi xảy ra");
            }

            return data.ToModel();
        }

        public async Task Update(SystemConfigVM model)
        {
            var entity = await _systemConfigRep.GetByIdAsync(model.Id);

            if (entity != null) { new AddError("có lổi xảy ra"); return; }

            entity.Description = model.Description;
            entity.Keywords = model.Keywords;
            entity.Logo = model.Logo;
            entity.Title = model.Title;
            entity.PhoneNumber = model.PhoneNumber;
            entity.GoogleAnalytics = model.GoogleAnalytics;
            entity.Googletag = model.Googletag;
            entity.FacebookMessager = model.FacebookMessager;

            await _systemConfigRep.UpdateAsync(entity, entity.Id);
            await _unitOfWork.CommitAsync();
            return;
        }
    }
}
