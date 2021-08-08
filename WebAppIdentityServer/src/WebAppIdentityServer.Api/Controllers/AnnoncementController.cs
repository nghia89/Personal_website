using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAppIdentityServer.Business.Interfaces.Mongo;
using WebAppIdentityServer.Data.EF.Entities.MongoDB;

namespace WebAppIdentityServer.Api.Controllers
{
    public class AnnoncementController : BaseController
    {
        private readonly IAnnouncementBusiness _announcement;
        public AnnoncementController(IAnnouncementBusiness announcement)
        {
            _announcement = announcement;
        }
        [HttpPost]
        public async Task<IActionResult> Add([FromBody] Announcement  announcement)
        {
          await  _announcement.Add(announcement);
            return this.ToOkResult();
        }
    }
}
