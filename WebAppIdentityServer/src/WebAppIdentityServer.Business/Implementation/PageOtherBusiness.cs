using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using WebAppIdentityServer.Business.Interfaces;
using WebAppIdentityServer.Business.Mappers;
using WebAppIdentityServer.Data.EF.Entities;
using WebAppIdentityServer.Data.EF.Interfaces;
using WebAppIdentityServer.Infrastructure;
using WebAppIdentityServer.Repository.Interfaces;
using WebAppIdentityServer.ViewModel.Common;
using WebAppIdentityServer.ViewModel.Models.Common;

namespace WebAppIdentityServer.Business.Implementation
{
    public class PageOtherBusiness : BaseBusiness, IPageOtherBusiness
    {
        private readonly IPageOtherRepository _pageOtherRep;
        private readonly IUnitOfWork _unitOfWork;
        public PageOtherBusiness(IPageOtherRepository pageOtherRep, IUnitOfWork unitOfWork,
            IUserResolverService userResolver) : base(userResolver)
        {
            this._pageOtherRep = pageOtherRep;
            this._unitOfWork = unitOfWork;
        }

        public async Task<PageOtherVM> Add(PageOtherVM model)
        {
            var entity = model.ToEntity();
            await _pageOtherRep.AddAsync(entity);
            return model;
        }

        public async Task<bool> Delete(long id)
        {
            var entity = await _pageOtherRep.GetByIdAsync(id);
            if (entity == null)
            {
                return false;
            }

            await _pageOtherRep.RemoveAsync(entity);
            return true;
        }

        public async Task<List<PageOtherVM>> GetAll()
        {
            var data = await _pageOtherRep.GetAllAsync(null);
            return data.Select(a => a.ToModel()).ToList();
        }

        public async Task<PageOtherVM> GetById(long id)
        {
            var data = await _pageOtherRep.GetByIdAsync(id);
            if (data == null)
            {
                AddError("Dữ liệu không tồn tại.");
                return null;
            }
            return data.ToModel();
        }


        public async Task<PagedResult<PageOtherVM>> Paging(PagingParamModel pagingParam)
        {
            var (data, totalCount) = await _pageOtherRep.Paging(pagingParam.query, pagingParam.page, pagingParam.pageSize, new Expression<Func<PageOther, object>>[] { a => a.Name }, null, null);
            return new PagedResult<PageOtherVM>()
            {
                Data = (data.Select(a => a.ToModel()).ToList()),
                TotalCount = totalCount
            };
        }

        public async Task<PageOtherVM> Update(PageOtherVM model)
        {
            var entity = await _pageOtherRep.GetByIdAsync(model.Id);
            if (entity == null)
            {
                AddError("Dữ liệu không tồn tại.");

                return null;
            }

            var entitySetvalue = await _pageOtherRep.UpdateAsync(model.ToEntity(), model.Id);
            return entitySetvalue.ToModel();
        }

    }
}
