namespace WebAppIdentityServer.Business.Interfaces
{
    public interface IBaseBusiness
    {
        string UserId { get; }
        string UserName { get; }
        string Email { get; }
        string Role { get; }
        long OrgId { get; }
    }
}
