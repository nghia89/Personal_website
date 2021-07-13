using System;
using System.ComponentModel.DataAnnotations;
using WebAppIdentityServer.Data.EF.Interfaces;

namespace WebAppIdentityServer.Data.EF.Entities
{
    public class PageOther : IDateTracking, IEntityTracking
    {
        public int Id { get; set; }
        [MaxLength(200)]
        [Required]
        public string Name { get; set; }
        public string Alias { get; set; }
        public string Content { get; set; }
        public int SortOrder { get; set; }
        public int CatalogOtherId { get; set; }
        public CatalogOther CatalogOther { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime? DateModified { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
    }
}
