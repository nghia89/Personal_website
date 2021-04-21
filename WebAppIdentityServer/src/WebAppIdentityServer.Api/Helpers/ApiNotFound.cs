namespace WebAppIdentityServer.Api.Helpers
{
    public class ApiNotFound : ApiResponse
    {
        public ApiNotFound(string message)
           : base(404, message)
        {
        }
    }
}
