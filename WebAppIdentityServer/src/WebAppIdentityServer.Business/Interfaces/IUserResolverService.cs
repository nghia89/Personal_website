using WebAppIdentityServer.ViewModel.Models.System;

namespace WebAppIdentityServer.Business.Interfaces
{
    public interface IUserResolverService
    {
        RequestContext GetUser();
    }
}
