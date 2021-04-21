namespace WebAppIdentityServer.Data.EF.Interfaces
{
    public interface IEntityTracking
    {
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
    }
}
