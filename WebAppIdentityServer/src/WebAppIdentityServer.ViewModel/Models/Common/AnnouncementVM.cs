using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebAppIdentityServer.ViewModel.Enum;

namespace WebAppIdentityServer.ViewModel.Models.Common
{
   public class AnnouncementVM
    {
        public string Id { get; set; }
        public string Title { set; get; }
        public string Content { set; get; }
        public string Link { set; get; }
        public string UserId { set; get; }
        public Status Status { set; get; }
        public int Type { get; set; }
        public DateTime DateCreated { get; set; }
    }
}
