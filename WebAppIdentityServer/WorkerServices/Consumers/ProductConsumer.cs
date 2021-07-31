using MassTransit;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WorkerService.Business.Interfaces;
using WorkerService.Message;
using WorkerService.Message.Interfases;

namespace WorkerService.Consumers
{
    public class ProductConsumer : IConsumer<ProductMessage>,IConsumer<ActivityLogMessage>
    {
        private readonly IProductWorkerBusiness _productWorkerBusiness;
        private readonly IActivityLogWorkerBusiness _activityLogWorkerBus;
        public ProductConsumer(IProductWorkerBusiness productWorkerBusiness, IActivityLogWorkerBusiness activityLogWorkerBus)
        {
            _productWorkerBusiness = productWorkerBusiness;
            _activityLogWorkerBus = activityLogWorkerBus;
        }

        public async Task Consume(ConsumeContext<ProductMessage> context)
        {
            await _productWorkerBusiness.AddTest(context.Message.Product);
        }

        public async Task Consume(ConsumeContext<ActivityLogMessage> context)
        {
          await  _activityLogWorkerBus.Add(context.Message.ActivityLog);
        }
    }

}
