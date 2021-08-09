using MassTransit;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using WebAppIdentityServer.Utilities.Constants;
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
                await _hub.Clients.User(context?.Message.ToUserId).SendAsync("ReceiveNotify", context?.Message);
        }
    }
}
