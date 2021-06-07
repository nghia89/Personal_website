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
using WebAppIdentityServer.Utilities.Enum;
using WebAppIdentityServer.Utilities.Helpers;
using WebAppIdentityServer.ViewModel.Common;
using WebAppIdentityServer.ViewModel.Models.Product;

namespace WebAppIdentityServer.Business.Implementation
{
    public class ProductCategoryBusiness : BaseBusiness, IProductCategoryBusiness
    {

        private readonly IProductCategoryRepository _productCategoryRep;
        private readonly IProductRepository _productRep;
        private readonly IUnitOfWork _unitOfWork;
        public ProductCategoryBusiness(IProductCategoryRepository productCategoryRep, IUnitOfWork unitOfWork, IProductRepository productRep,
              IUserResolverService userResolver) : base(userResolver)
        {
            this._productCategoryRep = productCategoryRep;
            this._unitOfWork = unitOfWork;
            this._productRep = productRep;
        }

        public async Task<ProductCategoryVM> Add(ProductCategoryVM productCategoryVm)
        {
            var productCategory = productCategoryVm.ToEntity();
            productCategory.Status = Status.Active;
            await _productCategoryRep.AddAsync(productCategory);
            await _unitOfWork.CommitAsync();
            return productCategoryVm;
        }

        public async Task Delete(long id)
        {
            var product = await _productRep.FindFirstAsync(x => x.Status == Status.Active && x.ProductCategoryId == id, null);
            var getChild = await _productCategoryRep.FindFirstAsync(x => x.Status == Status.Active && x.ParentId == id, null);
            if (product != null) { new AddError("Có sản phẩm trong danh mục"); return; }
            else if (getChild != null) { new AddError("Tồn tại danh mục con"); return; }
            var enity = await _productCategoryRep.GetByIdAsync(id);
            await _productCategoryRep.RemoveAsync(enity);
        }

        public async Task<List<ProductCategoryVM>> GetAll(string keyword)
        {
            var data = await _productCategoryRep.FindAllAsync(x => (string.IsNullOrEmpty(keyword) || x.Name.Contains(keyword)), null);
            return data.OrderBy(x => x.ParentId).Select(x => x.ToModel()).ToList();

        }

        Expression<Func<ProductCategory, bool>> filter(long parentId)
        {
            return x => x.Status == Status.Active && x.ParentId == parentId;
        }
        public async Task<List<ProductCategoryVM>> GetAllByParentId(long parentId)
        {
            var data = await _productCategoryRep.FindAllAsync(filter(parentId), null);
            return data.Select(a => a.ToModel()).ToList();
        }

        public async Task<ProductCategoryVM> GetById(long id)
        {
            var data = await _productCategoryRep.GetByIdAsync(id);
            return data.ToModel();
        }

        public async Task Update(ProductCategoryVM productCategoryVm)
        {
            var productCategory = productCategoryVm.ToEntity();
            await _productCategoryRep.UpdateAsync(productCategory, productCategory.Id);
            await _unitOfWork.CommitAsync();
        }

        public async Task<IEnumerable<TreeItem<ProductCategory>>> TreeView()
        {
            var data = await _productCategoryRep.FindAllAsync(x => x.Status == Status.Active, null);
            IEnumerable<ProductCategory> enumList = data.OrderBy(x => x.SortOrder).ToList();
            var root = enumList.GenerateTree(c => c.Id, c => c.ParentId, 0);
            return root.ToList();
        }

        public async Task<PagedResult<ProductCategoryVM>> Paging(PagingParamModel pagingParam)
        {
            var (data, totalCount) = await _productCategoryRep.Paging(pagingParam.query, pagingParam.page, pagingParam.pageSize, new Expression<Func<ProductCategory, object>>[] { a => a.Name }, null);
            return new PagedResult<ProductCategoryVM>()
            {
                Data = data.Select(a => a.ToModel()).ToList(),
                TotalCount = totalCount
            };
        }
    }
}
