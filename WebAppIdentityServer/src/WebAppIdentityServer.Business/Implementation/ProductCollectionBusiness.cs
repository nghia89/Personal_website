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
using WebAppIdentityServer.Infrastructure.Helpers;
using WebAppIdentityServer.Repository.Interfaces;
using WebAppIdentityServer.ViewModel.Common;
using WebAppIdentityServer.ViewModel.Enum;
using WebAppIdentityServer.ViewModel.Models.Common;
using WebAppIdentityServer.ViewModel.Models.Product;

namespace WebAppIdentityServer.Business.Implementation
{
    public class ProductCollectionBusiness : BaseBusiness, IProductCollectionBusiness
    {

        private readonly IProductCollectionRepository _productCollectionRep;
        private readonly IProductAndCollectionRepository _productAndCollectionRep;
        private readonly IProductRepository _productRep;
        private readonly IUnitOfWork _unitOfWork;
        public ProductCollectionBusiness(IProductCollectionRepository productCollectionRep, IUnitOfWork unitOfWork,
         IProductRepository productRep, IProductAndCollectionRepository productAndCollectionRep,
              IUserResolverService userResolver) : base(userResolver)
        {
            this._productCollectionRep = productCollectionRep;
            this._productAndCollectionRep = productAndCollectionRep;
            this._unitOfWork = unitOfWork;
            this._productRep = productRep;
        }

        public async Task<ProductCollectionVM> Add(ProductCollectionVM model)
        {

            var entity = model.ToEntity();

            entity.Status = Status.Active;
            entity.Title = String.IsNullOrEmpty(model.Title) ? model.Name : model.Title;
            entity.SeoAlias = String.IsNullOrEmpty(model.SeoAlias) ? model.Name.ToUnSignString() : model.SeoAlias.ToUnSignString();

            await _productCollectionRep.AddAsync(entity);
            await _unitOfWork.CommitAsync();

            foreach (var item in model.ProductAndCollection)
            {
                _productAndCollectionRep.Add(new ProductAndCollection()
                {
                    ProductId = item.ProductId,
                    ProductCollectionId = entity.Id
                });
            }
            await _productAndCollectionRep.SaveAsync();

            return entity.ToModel();
        }

        public async Task Delete(long id)
        {
            var entity = await _productCollectionRep.GetByIdAsync(id);
            await _productCollectionRep.RemoveAsync(entity);
        }

        public async Task<List<ProductCollectionVM>> GetAll()
        {
            var data = await _productCollectionRep.FindAllAsync();
            return data.Select(x => x.ToModel()).ToList();

        }


        public async Task<ProductCollectionVM> GetById(long id)
        {
            var data = await _productCollectionRep.GetByIdAsync(id);
            var productAndCollection = await _productAndCollectionRep.FindAllAsync(x => x.ProductCollectionId == id,
           new Expression<Func<ProductAndCollection, object>>[] { x => x.Product }
            );
            var dataModel = data.ToModel();
            var Attachment = new List<AttachmentVM>();
            if (!String.IsNullOrEmpty(data.Images))
            {
                var listImg = data.Images.Split(",");
                var i = 1;
                foreach (var item in listImg)
                {
                    Attachment.Add(new AttachmentVM()
                    {
                        Id = data.Id + i,
                        Path = item
                    });
                    i++;
                }
                dataModel.Attachments = Attachment;
            }
            dataModel.ProductAndCollection = productAndCollection.Select(x => x.ToModel()).ToList();
            return dataModel;
        }

        public async Task Update(ProductCollectionVM model)
        {
            var productCategory = model.ToEntity();
            productCategory.Title = String.IsNullOrEmpty(model.Title) ? model.Name : model.Title;
            productCategory.SeoAlias = String.IsNullOrEmpty(model.SeoAlias) ? model.Name.ToUnSignString() : model.SeoAlias.ToUnSignString();
            await _productCollectionRep.UpdateAsync(productCategory, productCategory.Id);

            var proAndCollec = await _productAndCollectionRep.FindAllAsync(x => x.ProductCollectionId == model.Id, null);
            if (proAndCollec.Any())
            {
                await _productAndCollectionRep.RemoveMultipleAsync(proAndCollec.ToList());
                await _productAndCollectionRep.SaveAsync();
            }
            foreach (var item in model.ProductAndCollection)
            {
                _productAndCollectionRep.Add(new ProductAndCollection()
                {
                    ProductId = item.ProductId,
                    ProductCollectionId = productCategory.Id
                });
            }

            await _unitOfWork.CommitAsync();
        }

        public async Task<PagedResult<ProductCollectionVM>> Paging(PagingParamModel pagingParam)
        {
            var (data, totalCount) = await _productCollectionRep.Paging(pagingParam.query, pagingParam.page, pagingParam.pageSize, new Expression<Func<ProductCollections, object>>[] { a => a.Name }, null);
            return new PagedResult<ProductCollectionVM>()
            {
                Data = data.Select(a => a.ToModel()).ToList(),
            };
        }
    }
}
