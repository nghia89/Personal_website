using System;
using System.ComponentModel.DataAnnotations;
using WebAppIdentityServer.Data.EF.Interfaces;

namespace WebAppIdentityServer.Data.EF.Entities
{
    public class ProductImages : IDateTracking, IEntityTracking
    {
        public long Id { get; set; }
        public long ProductId { get; set; }
        public Product Product { get; set; }
        public string FileName { get; set; }
        public string Path { get; set; }
        public int Size { get; set; }
        public string Type { get; set; }
        public int SortOrder { get; set; }
        [StringLength(250)]
        public string Caption { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime? DateModified { get; set; }
    }
}
