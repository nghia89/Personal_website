using MassTransit;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WorkerService.Business.Interfaces;
using WorkerService.Message.Interfases;

namespace WorkerService.Consumers
{
    public class ProductConsumer : IConsumer<IProductMessage>
    {
        private readonly IServiceProvider _serviceProvider;
        private readonly ILogger<IProductMessage> _logger;
        private readonly IProductWorkerBusiness _productWorkerBusiness;
        public ProductConsumer(IServiceProvider serviceProvider, ILogger<IProductMessage> logger,
            IProductWorkerBusiness productWorkerBusiness)
        {
            _serviceProvider = serviceProvider;
            _logger = logger;
            _productWorkerBusiness = productWorkerBusiness;
        }

        public async Task Consume(ConsumeContext<IProductMessage> context)
        {
            try
            {

                await _productWorkerBusiness.AddTest(context.Message.Product);

                //await productService.Publish(product);

                //await context.RespondAsync<ProductAccepted>(new
                //{
                //    Value = $"Received: {context.Message.MessageId}"
                //});
            }
            catch (Exception ex)
            {
                _logger.LogError("ProductChangedConsumerError", ex);
            }

        }
    }

}
