using System.ComponentModel.DataAnnotations;

namespace WebAppIdentityServer.Data.EF.Entities
{
    public class CatalogOther
    {
        public int Id { get; set; }
        [MaxLength(200)]
        [Required]
        public string Name { get; set; }
        public int SortOrder { get; set; }
        public int? Type { get; set; }
    }
}
