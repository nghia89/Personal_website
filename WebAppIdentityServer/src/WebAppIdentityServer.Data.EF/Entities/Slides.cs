using System;
using System.ComponentModel.DataAnnotations;
using WebAppIdentityServer.Data.EF.Interfaces;
using WebAppIdentityServer.Utilities.Enum;

namespace WebAppIdentityServer.Data.EF.Entities
{
    public class Slides : IDateTracking, IEntityTracking
    {
        public long Id { get; set; }
        [StringLength(250)]
        public string Name { set; get; }
        [StringLength(250)]
        public string Description { set; get; }
        [StringLength(250)]
        public string Image { set; get; }
        [StringLength(250)]
        public string Url { set; get; }
        public int? DisplayOrder { set; get; }
        public Status Status { set; get; }
        public string Content { set; get; }
        [StringLength(25)]
        public string DisplayPosition { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime? DateModified { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
    }
}
