

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
using WebAppIdentityServer.Utilities.Constants;
using WebAppIdentityServer.Utilities.Enum;
using WebAppIdentityServer.Utilities.Helpers;
using WebAppIdentityServer.ViewModel.Common;
using WebAppIdentityServer.ViewModel.Models.Product;

namespace WebAppIdentityServer.Business.Implementation
{
    public class ProductBusiness : BaseBusiness, IProductBusiness
    {
        private readonly IProductRepository _productRepository;
        private readonly IProductQuantityRepository _productQuantityRep;
        private readonly IProductCategoryRepository _productCategoryRep;
        private readonly ITableRecordRepository _tableRecordRep;
        private readonly ITagRepository _tagRepository;
        private readonly IUnitOfWork _unitOfWork;
        public ProductBusiness(IProductRepository productRepository, IProductQuantityRepository productQuantityRep,
            ITagRepository tagRepository, IUnitOfWork unitOfWork, IUserResolverService userResolver,
            IProductCategoryRepository productCategoryRep,
             ITableRecordRepository tableRecordRep) : base(userResolver)
        {
            this._productRepository = productRepository;
            this._productQuantityRep = productQuantityRep;
            this._unitOfWork = unitOfWork;
            this._tagRepository = tagRepository;
            this._tableRecordRep = tableRecordRep;
            this._tableRecordRep = tableRecordRep;
            this._productCategoryRep = productCategoryRep;
        }

        public async Task<ProductVM> Add(ProductVM model)
        {
            List<ProductTag> productTags = new List<ProductTag>();
            var product = model.ToEntity();
            if (!string.IsNullOrEmpty(model.Tags))
            {
                string[] tags = model.Tags.Split(',');
                foreach (string t in tags)
                {
                    var tagId = t.ToUnsignString();
                    var dataTag = await _tagRepository.FindAllAsync(x => x.Id == tagId, null);
                    if (!dataTag.Any())
                    {
                        Tag tag = new Tag
                        {
                            Id = tagId,
                            Name = t,
                            Type = CommonConstants.ProductTag
                        };
                        _tagRepository.Add(tag);
                    }

                    productTags.Add(new ProductTag
                    {
                        TagId = tagId
                    });
                }
            }
            if (model.ProductQuantity != null)
            {
                model.ProductQuantity.ForEach((item) => item.Price = product.Price);
            }


            product.ProductTags = productTags;
            await _productRepository.AddAsync(product);
            await _unitOfWork.CommitAsync();

            await AddQuantityAsync(product.Id, model.ProductQuantity);
            return model;
        }

        public async Task AddQuantityAsync(long productId, List<ProductQuantityVM> quantities)
        {
            if (quantities == null) return;
            foreach (var quantity in quantities)
            {
                await _productQuantityRep.AddAsync(new ProductQuantity()
                {
                    ProductId = productId,
                    ColorId = quantity.ColorId,
                    SizeId = quantity.SizeId,
                    Quantity = quantity.Quantity,
                    Name = quantity.Name,
                    Price = quantity.Price,
                    OptionVariantColor = quantity.OptionVariantColor,
                    OptionVariantSize = quantity.OptionVariantSize,
                    OptionVariantName = quantity.OptionVariantName
                });
            }
            await _productQuantityRep.SaveAsync();
        }

        public async Task<bool> Delete(long id)
        {
            var entity = await _productRepository.GetByIdAsync(id);
            if (entity == null)
            {
                return false;
            }

            await _productRepository.RemoveAsync(entity);
            return true;
        }

        public async Task<string> GenarateCode(string code)
        {
            var codeProduct = await _tableRecordRep.GenarateCodeProduct(code, (int)EnumRecord.Product);
            return codeProduct;
        }

        public async Task<List<ProductVM>> GetAll()
        {
            var data = await _productRepository.GetAllAsync(new Expression<Func<Product, object>>[] { x => x.ProductCategory },
                                                            a => a.SelectFieldProduct());
            return data.Select(a => a.ToModel()).ToList();
        }

        public async Task<ProductVM> GetById(long id)
        {
            var data = await _productRepository.GetByIdAsync(id);
            var productQuantity = await _productQuantityRep.getByProductIds(id);
            data.ProductQuantity = productQuantity;
            return data.ToModel();
        }

        public async Task<List<ProductVM>> GetProductByCateId(long cateId)
        {
            var data = await _productRepository.FindAllAsync(x => x.ProductCategoryId == cateId && x.Status == Status.Active, null);
            return (data.Select(a => a.ToModel()).ToList());
        }

        public async Task<PagedResult<ProductVM>> Paging(PagingParamModel pagingParam)
        {
            var (data, totalCount) = await _productRepository.Paging(pagingParam.query, pagingParam.page, pagingParam.pageSize, new Expression<Func<Product, object>>[] { a => a.Name, a => a.Code }, null);

            var category = await _productCategoryRep.FindAllAsync(x => x.Status == Status.Active, null);
            foreach (var item in data)
            {
                var categoryBy = category.FirstOrDefault(x => x.Id == item.ProductCategoryId);
                item.ProductCategory = categoryBy;
            }
            return new PagedResult<ProductVM>()
            {
                Data = data.Select(a => a.ToModel()).ToList(),
                TotalCount = totalCount
            };
        }

        public async Task<ProductVM> Update(ProductVM product)
        {
            var entity = await _productRepository.GetByIdAsync(product.Id);
            if (entity == null)
            {
                return null;
            }

            var entitySetvalue = await _productRepository.UpdateAsync(product.ToEntity(), product.Id);
            await _unitOfWork.CommitAsync();
            return entitySetvalue.ToModel();
        }
    }
}
