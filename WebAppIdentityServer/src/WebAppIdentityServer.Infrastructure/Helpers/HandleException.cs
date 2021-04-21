using System;

namespace WebAppIdentityServer.Utilities.Helpers
{
    public class HandleException : Exception
    {
        public HandleException(string message) : base(message)
        { }
    }

}
