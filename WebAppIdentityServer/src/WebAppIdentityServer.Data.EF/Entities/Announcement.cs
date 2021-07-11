
using System;
using System.Collections.Generic;
using WebAppIdentityServer.Data.EF.Interfaces;
using WebAppIdentityServer.ViewModel.Enum;

namespace WebAppIdentityServer.Data.EF.Entities
{
    public class Announcement : IDateTracking, IEntityTracking
    {
        public long Id { get; set; }
        public string Title { set; get; }

        public string Content { set; get; }

        //public Guid UserId { set; get; }

        //public virtual AppUser AppUser { get; set; }

        public IEnumerable<AnnouncementUser> AnnouncementUsers { get; set; }

        public Status Status { set; get; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime? DateModified { get; set; }
    }
}
