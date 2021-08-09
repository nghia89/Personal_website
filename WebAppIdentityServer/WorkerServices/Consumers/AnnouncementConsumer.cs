using MassTransit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebAppIdentityServer.Business.Interfaces.Mongo;
using WorkerService.Message;

namespace WorkerService.Consumers
{
    public class AnnouncementConsumer : IConsumer<AnnouncementMessage>
    {
        private readonly IAnnouncementBusiness _announcementBus;
        public AnnouncementConsumer(IAnnouncementBusiness announcementBus)
        {
            _announcementBus = announcementBus;
        }
        public async Task Consume(ConsumeContext<AnnouncementMessage> context)
        {
           await  _announcementBus.Add(context.Message);
        }
    }
}
