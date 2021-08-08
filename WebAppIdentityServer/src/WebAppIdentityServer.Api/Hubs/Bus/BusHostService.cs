using MassTransit;
using Microsoft.Extensions.Hosting;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace WebAppIdentityServer.Api.Hubs.Bus
{
    public class BusHostService : IHostedService, IDisposable
    {
        private readonly IBusControl _busControl;
        private readonly IServiceProvider _serviceProvider;
        public BusHostService(
            IBus busControl, IServiceProvider serviceProvider
            )
        {
            this._busControl = (IBusControl)busControl;
            this._serviceProvider = serviceProvider;
        }
        public void Dispose()
        {
        }

        public async Task StartAsync(CancellationToken cancellationToken)
        {
            var notifyChangeHandler = _busControl.ConnectReceiveEndpoint("SignalR_Notify", x =>
            {
                x.Consumer<NotifyConsumer>(_serviceProvider);
            });

            await notifyChangeHandler.Ready;

            await _busControl.StartAsync(cancellationToken);
            //await _busControl.Publish(new NotifyMessage());
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            return _busControl.StopAsync(cancellationToken);
        }
    }
}
