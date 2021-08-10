using MassTransit;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using WebAppIdentityServer.Business.Interfaces.Mongo;
using WebAppIdentityServer.Data.EF.Entities.MongoDB;
using WebAppIdentityServer.ViewModel.Common;
using WorkerService.Message;

namespace WebAppIdentityServer.Api.Controllers
{
    public class AnnouncementController : BaseController
    {
        private readonly IAnnouncementBusiness _announcement;
        private readonly IBus _bus;
        public AnnouncementController(IAnnouncementBusiness announcement, IBus bus)
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

        [HttpGet]
        [Route("paging")]
        public async Task<IActionResult> AnnouncementByUser([FromQuery] PagingParamModel pagingParam)
        {
            var (total, data) = await _announcement.Paging(pagingParam);
            return this.ToOkResult(new { total = total, data = data });
        }
        [HttpGet]
        [Route("count_un_read")]
        public async Task<IActionResult> CountUnRead()
        {
            var total= await _announcement.CountUnRead();
            return this.ToOkResult(total);
        }
    }
}
