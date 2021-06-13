namespace WebAppIdentityServer.Data.EF
{
    public interface IBaseRepository
    {
        string UserId { get; }
        string UserName { get; }
        string Email { get; }
        string Role { get; }
    }
}
