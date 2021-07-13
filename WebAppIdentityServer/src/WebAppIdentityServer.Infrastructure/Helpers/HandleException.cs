using System;

namespace WebAppIdentityServer.Infrastructure.Helpers
{
    public class HandleException : Exception
    {
        public HandleException(string message) : base(message)
        { }
    }

}
