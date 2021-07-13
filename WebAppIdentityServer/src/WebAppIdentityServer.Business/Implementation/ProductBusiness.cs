

using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Linq.Expressions;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using WebAppIdentityServer.Business.Interfaces;
using WebAppIdentityServer.Business.Mappers;
using WebAppIdentityServer.Data.EF.Entities;
using WebAppIdentityServer.Data.EF.Interfaces;
using WebAppIdentityServer.Infrastructure;
using WebAppIdentityServer.Infrastructure.CommonContains;
using WebAppIdentityServer.Infrastructure.Constants;
using WebAppIdentityServer.Infrastructure.Helpers;
using WebAppIdentityServer.Repository.Interfaces;
using WebAppIdentityServer.ViewModel.Common;
using WebAppIdentityServer.ViewModel.Enum;
using WebAppIdentityServer.ViewModel.Models.Product;

namespace WebAppIdentityServer.Business.Implementation
{
    public class ProductBusiness : BaseBusiness, IProductBusiness
    {
        private readonly IProductRepository _productRepository;
        private readonly IProductQuantityRepository _productQuantityRep;
        private readonly IProductCategoryRepository _productCategoryRep;
        private readonly IProductImageBusiness _productImageBus;
        private readonly ITableRecordRepository _tableRecordRep;
        private readonly ITagRepository _tagRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IWebHostEnvironment _webHostEnvironment;
        public ProductBusiness(IProductRepository productRepository, IProductQuantityRepository productQuantityRep,
            ITagRepository tagRepository, IUnitOfWork unitOfWork, IUserResolverService userResolver,
            IProductCategoryRepository productCategoryRep, IProductImageBusiness productImageBus,
            IWebHostEnvironment webHostEnvironment,
             ITableRecordRepository tableRecordRep) : base(userResolver)
        {
            this._productRepository = productRepository;
            this._productQuantityRep = productQuantityRep;
            this._unitOfWork = unitOfWork;
            this._tagRepository = tagRepository;
            this._tableRecordRep = tableRecordRep;
            this._tableRecordRep = tableRecordRep;
            this._productCategoryRep = productCategoryRep;
            this._productImageBus = productImageBus;
            this._webHostEnvironment = webHostEnvironment;
        }

        public async Task<long> Add(ProductVM model)
        {
            List<ProductTag> productTags = new List<ProductTag>();
            var product = model.ToEntity();
            if (!string.IsNullOrEmpty(model.Tags))
            {
                string[] tags = model.Tags.Split(',');
                foreach (string t in tags)
                {
                    var tagId = t.ToUnSignString();
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
            product.Title = String.IsNullOrEmpty(model.Title) ? model.Name : model.Title;
            product.SeoAlias = String.IsNullOrEmpty(model.SeoAlias) ? model.Name.ToUnSignString() : model.SeoAlias.ToUnSignString();
            await _productRepository.AddAsync(product);
            await _unitOfWork.CommitAsync();

            await AddQuantityAsync(product.Id, model.ProductQuantity);
            return product.Id;
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
                AddError("Dữ liệu không tồn tại");
                return false;
            }
            var rootFile = _webHostEnvironment.WebRootPath;
            var imageFolder = $@"\uploaded\products\{entity.Id}";

            await _productRepository.RemoveAsync(entity);

            DirectoryInfo di = new DirectoryInfo($"{rootFile}{imageFolder}");
            if (di.Exists)
                di.Delete(true);
            return true;
        }

        public async Task DeleteImg(long imgId)
        {
            var dataImg = await _productImageBus.GetById(imgId);
            if (dataImg != null)
            {
                var rootFile = _webHostEnvironment.WebRootPath;

                var imageFolder = $@"\uploaded\products\{dataImg.ProductId}\{dataImg.FileName}";
                var pathFileRoot = $"{rootFile}{imageFolder}";
                CheckFileDelete(pathFileRoot);

                var imageSizes = CommonContains.ImageSize();
                foreach (var item in imageSizes)
                {
                    var imageResize = $@"\uploaded\products\{dataImg.ProductId}\{dataImg.FileName}";
                    var newFileName = Regex.Replace(imageResize, @"\.([^.]*)$", $"_{item.Key}.$1");
                    CheckFileDelete($"{rootFile}{newFileName}");
                }
            }

            await _productImageBus.Delete(imgId);
            await _unitOfWork.CommitAsync();
        }


        public void CheckFileDelete(string path)
        {
            if (File.Exists(path))
            {
                File.Delete(path);
            }
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
            if (data == null)
            {
                AddError("Dữ liệu không tồn tại");
                return null;
            }
            var productQuantity = await _productQuantityRep.getByProductIds(id);
            var productImages = await _productImageBus.GetByProductId(id);
            data.ProductQuantity = productQuantity;

            var dataModel = data.ToModel();
            dataModel.ProductImages = productImages.OrderBy(x => x.SortOrder).ToList();
            return dataModel;
        }

        public async Task<List<ProductVM>> GetProductByCateId(long cateId)
        {
            var data = await _productRepository.FindAllAsync(x => x.ProductCategoryId == cateId && x.Status == Status.Active, null);
            return (data.Select(a => a.ToModel()).ToList());
        }

        public async Task<PagedResult<ProductVM>> Paging(PagingParamModel pagingParam)
        {
            var (data, totalCount) = await _productRepository.Paging(pagingParam.query, pagingParam.page, pagingParam.pageSize, new Expression<Func<Product, object>>[] { a => a.Name, a => a.Code },
                                                                        filter => filter.Include(x => x.ProductImages)
                                                                        );

            var category = await _productCategoryRep.FindAllAsync(x => x.Status == Status.Active, null);


            return new PagedResult<ProductVM>()
            {
                Data = data.Select(a => a.ToModel(category.ToList())).ToList(),
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
            product.Title = String.IsNullOrEmpty(product.Title) ? product.Name : product.Title;
            product.SeoAlias = String.IsNullOrEmpty(product.SeoAlias) ? product.Name.ToUnSignString() : product.SeoAlias;
            var entitySetvalue = await _productRepository.UpdateAsync(product.ToEntity(), product.Id);
            await _unitOfWork.CommitAsync();
            return entitySetvalue.ToModel();
        }
    }
}
