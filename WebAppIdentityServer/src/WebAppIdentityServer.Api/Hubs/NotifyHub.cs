using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace WebAppIdentityServer.Api.Hubs
{
    [Authorize]
    public class NotifyHub : Hub
    {
        private readonly static ConnectionMapping<string> _connections =
            new ConnectionMapping<string>();


        public override Task OnConnectedAsync()
        {
            string ui = Context?.User?.Claims?.FirstOrDefault(m => m.Type == "sub")?.Value;

            _connections.Add(ui, Context.ConnectionId);

            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception? exception)
        {
            string ui = Context?.User?.Claims?.FirstOrDefault(m => m.Type == "sub")?.Value;

            _connections.Remove(ui, Context.ConnectionId);

            return base.OnDisconnectedAsync(exception);
        }

        public class UserProvider : IUserIdProvider
        {
            public string GetUserId(HubConnectionContext connection)
            {
                var uid = connection.User?.Claims?.FirstOrDefault(m => m.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")?.Value;
                if (uid == null)
                {
                    uid = connection.User?.Claims?.FirstOrDefault(m => m.Type == "sub")?.Value;
                }
                return uid;
            }
        }
    }
}
