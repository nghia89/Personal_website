using MassTransit;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using WebAppIdentityServer.Business.Interfaces.Mongo;
using WebAppIdentityServer.Data.EF.Entities.MongoDB;
using WorkerService.Message;

namespace WebAppIdentityServer.Api.Controllers
{
    public class AnnoncementController : BaseController
    {
        private readonly IAnnouncementBusiness _announcement;
        private readonly IBus _bus;
        public AnnoncementController(IAnnouncementBusiness announcement, IBus bus)
        {
            _announcement = announcement;
            _bus = bus;
        }
        [HttpPost]
        public async Task<IActionResult> Add([FromBody] AnnouncementMessage announcement)
        {
            await _bus.Publish(announcement);
            return this.ToOkResult();
        }
    }
}
