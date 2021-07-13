using WebAppIdentityServer.Business.Interfaces;
using WebAppIdentityServer.Infrastructure.Helpers;
using WebAppIdentityServer.ViewModel.Models.System;

namespace WebAppIdentityServer.Business.Implementation
{
    public abstract class BaseBusiness : IBaseBusiness
    {
        private readonly IUserResolverService _userResolver;
        public RequestContext User;
        public BaseBusiness(IUserResolverService userResolver)
        {
            _userResolver = userResolver;
            User = _userResolver.GetUser();
        }

        public string UserId => this.User?.UserId;
        public string UserName => this.User?.UserName;
        public string Email => this.User?.Email;
        public string Role => this.User?.Role;
        public void AddError(string message)
        {
            new AddError(message);
            return;
        }
    }
}
