namespace WebAppIdentityServer.Infrastructure.Helpers
{
    public class AddError
    {
        public AddError(string messager)
        {
            throw new HandleException(messager);
        }
    }
}
