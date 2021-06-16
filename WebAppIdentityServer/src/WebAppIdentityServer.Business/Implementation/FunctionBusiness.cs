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
using WebAppIdentityServer.Utilities;
using WebAppIdentityServer.ViewModel.Common;
using WebAppIdentityServer.ViewModel.Models.System;

namespace WebAppIdentityServer.Business.Implementation
{
    public class FunctionBusiness : BaseBusiness, IFunctionBusiness
    {
        private readonly IFunctionRepository _functionRep;
        private readonly IUnitOfWork _unitOfWork;
        public FunctionBusiness(IFunctionRepository functionRep, IUnitOfWork unitOfWork,
            IUserResolverService userResolver) : base(userResolver)
        {
            this._functionRep = functionRep;
            this._unitOfWork = unitOfWork;
        }

        public async Task<FunctionVm> Add(FunctionVm model)
        {
            var entity = model.ToEntity();
            await _functionRep.AddAsync(entity);
            return model;
        }

        public async Task<bool> Delete(long id)
        {
            var entity = await _functionRep.GetByIdAsync(id);
            if (entity == null)
            {
                return false;
            }

            await _functionRep.RemoveAsync(entity);
            return true;
        }

        public async Task<List<FunctionVm>> GetAll()
        {
            var data = await _functionRep.GetAllAsync(null);
            return data.Select(a => a.ToModel()).ToList();
        }

        public async Task<FunctionVm> GetById(long id)
        {
            var data = await _functionRep.GetByIdAsync(id);
            return data.ToModel();
        }

        public async Task<List<FunctionVm>> GetFuncChild()
        {
            Expression<Func<Function, bool>> Filter()
            {
                return x => x.ParentId != "ROOTID";
            }
            var data = await _functionRep.FindAllAsync(Filter(), null);
            return data.Select(a => a.ToModel()).ToList();
        }

        public async Task<List<FunctionVm>> GetFuncRoot()
        {
            Expression<Func<Function, bool>> Filter()
            {
                return x => x.ParentId == "ROOTID";
            }
            var data = await _functionRep.FindAllAsync(Filter(), null);
            return data.Select(a => a.ToModel()).ToList();
        }

        public async Task<PagedResult<FunctionVm>> Paging(PagingParamModel pagingParam)
        {
            var (data, totalCount) = await _functionRep.Paging(pagingParam.query, pagingParam.page, pagingParam.pageSize, new Expression<Func<Function, object>>[] { a => a.Name }, null, null);
            return new PagedResult<FunctionVm>()
            {
                Data = (data.Select(a => a.ToModel()).ToList()),
                TotalCount = totalCount
            };
        }

        public async Task<FunctionVm> Update(FunctionVm model)
        {
            var entity = await _functionRep.GetByIdAsync(model.Id);
            if (entity == null)
            {
                return null;
            }

            var entitySetvalue = await _functionRep.UpdateAsync(model.ToEntity(), model.Id);
            return entitySetvalue.ToModel();
        }

    }
}
