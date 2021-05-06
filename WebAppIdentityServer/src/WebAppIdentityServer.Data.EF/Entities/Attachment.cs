using System;
using System.ComponentModel.DataAnnotations;
using WebAppIdentityServer.Data.EF.Interfaces;

namespace WebAppIdentityServer.Data.EF.Entities
{
    public class Attachment : IDateTracking, IEntityTracking
    {
        public long Id { get; set; }
        [MaxLength(200)]
        public string FileName { get; set; }
        [MaxLength(200)]
        public string FilePath { get; set; }
        [MaxLength(4)]
        public string FileType { get; set; }
        public long FileSize { get; set; }
        public long? ProductId { get; set; }
        public Product Product { get; set; }

        public DateTime CreateDate { get; set; }
        public DateTime? LastModifiedDate { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime? DateModified { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
    }
}
