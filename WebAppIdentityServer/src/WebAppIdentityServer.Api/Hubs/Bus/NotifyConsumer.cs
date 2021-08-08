using MassTransit;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAppIdentityServer.Infrastructure.Constants;
using WebAppIdentityServer.Utilities.Constants;
using WebAppIdentityServer.ViewModel.Common;
using WorkerService.Message;

namespace WebAppIdentityServer.Api.Hubs.Bus
{
    public class NotifyConsumer : IConsumer<NotifyMessage>
    {
        private readonly IHubContext<NotifyHub> _hub;
        public NotifyConsumer(
            IHubContext<NotifyHub> hub)
        {
            this._hub = hub;
        }

        public async Task Consume(ConsumeContext<NotifyMessage> context)
        {
            if (context != null && context?.Message.Type == (int)NotifyType.NOTIFY_CENTER)
                await _hub.Clients.User(context?.Message.UserId).SendAsync("ReceiveNotify", context?.Message);
        }
    }
}
