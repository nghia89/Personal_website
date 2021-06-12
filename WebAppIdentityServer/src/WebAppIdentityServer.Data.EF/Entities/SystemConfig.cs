using WebAppIdentityServer.Data.EF.Interfaces;

namespace WebAppIdentityServer.Data.EF.Entities
{
    public class SystemConfig : IEntityTracking
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public string Keywords { get; set; }
        public string Description { get; set; }
        public string Logo { get; set; }
        public string GoogleAnalytics { get; set; }
        public string Googletag { get; set; }
        public string FacebookMessager { get; set; }
        public string PhoneNumber { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
    }
}
