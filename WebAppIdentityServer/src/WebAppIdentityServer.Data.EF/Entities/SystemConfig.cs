using WebAppIdentityServer.Data.EF.Interfaces;

namespace WebAppIdentityServer.Data.EF.Entities
{
    public class SystemConfig : IEntityTracking, IOrgTracking
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public string Keywords { get; set; }
        public string Description { get; set; }
        public string Copyright { get; set; }
        public string Author { get; set; }
        public string Logo { get; set; }
        public long OrgId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
    }
}
