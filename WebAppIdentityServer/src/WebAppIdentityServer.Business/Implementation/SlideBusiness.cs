using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAppIdentityServer.Business.Interfaces;
using WebAppIdentityServer.Data.EF.Entities;
using WebAppIdentityServer.Data.EF.Interfaces;
using WebAppIdentityServer.Repository.Interfaces;
using WebAppIdentityServer.Utilities.Enum;
using WebAppIdentityServer.Utilities.Helpers;
using WebAppIdentityServer.ViewModel.Models.Common;

namespace WebAppIdentityServer.Business.Implementation
{
    public class SlideBusiness : BaseBusiness, ISlideBusiness
    {
        private readonly ISlideRepository _slideRep;
        private readonly IUnitOfWork _unitOfWork;
        public SlideBusiness(ISlideRepository slideRep, IUnitOfWork unitOfWork, IUserResolverService userResolver) : base(userResolver)
        {
            this._slideRep = slideRep;
            this._unitOfWork = unitOfWork;
        }

        public async Task<Slides> Add(SlideShowVM model)
        {
            var entity = new Slides()
            {
                Name = model.Name,
                Content = model.Content,
                Description = model.Description,
                Image = model.Image,
                Status = Status.Active,
                Url = model.Url,
                SortOrder = model.SortOrder,
                DisplayPosition = model.DisplayPosition
            };
            await _slideRep.AddAsync(entity);
            await _unitOfWork.CommitAsync();
            return entity;
        }

        public async Task<bool> Delete(long id)
        {
            var entity = await _slideRep.GetByIdAsync(id);
            if (entity == null)
            {
                return false;
            }

            await _slideRep.RemoveAsync(entity);

            return true;
        }

        public async Task<List<SlideShowVM>> GetAll()
        {
            var data = await _slideRep.FindAllAsync(x => x.Status == Status.Active, null);
            return data.Select(a => new SlideShowVM()
            {
                Id = a.Id,
                Name = a.Name,
                Content = a.Content,
                Description = a.Description,
                Image = a.Image,
                Status = a.Status,
                Url = a.Url,
                SortOrder = a.SortOrder,
                DisplayPosition = a.DisplayPosition
            }).ToList();

        }

        public async Task<SlideShowVM> GetById(long id)
        {
            var data = await _slideRep.GetByIdAsync(id);
            if (data == null)
            {
                new AddError("có lổi xảy ra");
            }

            return new SlideShowVM()
            {
                Id = data.Id,
                Name = data.Name,
                Content = data.Content,
                Description = data.Description,
                Image = data.Image,
                Status = data.Status,
                Url = data.Url,
                SortOrder = data.SortOrder,
                DisplayPosition = data.DisplayPosition
            };
        }

        public async Task<Slides> Update(SlideShowVM model)
        {
            var entity = await _slideRep.GetByIdAsync(model.Id);

            if (entity != null) { new AddError("có lổi xảy ra"); return null; }

            entity.Name = model.Name;
            entity.Content = model.Content;
            entity.Description = model.Description;
            entity.Image = model.Image;
            entity.Status = model.Status;
            entity.Url = model.Url;
            entity.DisplayPosition = model.DisplayPosition;
            entity.SortOrder = model.SortOrder;
            await _slideRep.UpdateAsync(entity, entity.Id);
            await _unitOfWork.CommitAsync();
            return entity;
        }
    }
}
