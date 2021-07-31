
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Linq.Expressions;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using WebAppIdentityServer.Data.EF.Entities;
using WebAppIdentityServer.ViewModel.Models.Product;
using WorkerService.Business.Interfaces;
using WorkerService.Repositoty.Interfaces;

namespace WorkerService.Business.Implementation
{
    public class ProductWorkerBusiness :IProductWorkerBusiness
    {
        private readonly IProductWorkerRepository _productRepository;

        public ProductWorkerBusiness(IProductWorkerRepository productRepository)
        {
            this._productRepository = productRepository;

        }

      async  Task IProductWorkerBusiness.AddTest(ProductVM model)
        {
            try
            {
                _productRepository.Add(new Product() { });
                await _productRepository.SaveAsync();
                //await _endpoint.Publish<IProductMessage>(new ProductMessage()
                //{
                //    MessageId = new Guid(),
                //    Product = model,
                //    CreationDate = DateTime.Now

                //});
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }
        }
    }
}
