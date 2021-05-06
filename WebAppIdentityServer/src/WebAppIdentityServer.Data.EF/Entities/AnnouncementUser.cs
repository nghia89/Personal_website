

using System;
using WebAppIdentityServer.Data.EF.Interfaces;

namespace WebAppIdentityServer.Data.EF.Entities
{
    public class AnnouncementUser : IDateTracking, IEntityTracking
    {
        public long Id { get; set; }
        public long AnnouncementId { get; set; }
        public Guid UserId { set; get; }
        public virtual AppUser AppUser { get; set; }
        public bool? HasRead { get; set; }
        public virtual Announcement Announcement { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime? DateModified { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
    }

}
