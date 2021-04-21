using System;

namespace WebAppIdentityServer.Data.EF.Interfaces
{
    public interface IDateTracking
    {
        DateTime DateCreated { get; set; }

        DateTime? DateModified { get; set; }
    }
}
