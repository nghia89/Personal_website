using Microsoft.AspNetCore.Http;
using WebAppIdentityServer.Business.Interfaces;
using WebAppIdentityServer.ViewModel.Models.System;
using static WebAppIdentityServer.Infrastructure.Constants.SystemConstants;

namespace WebAppIdentityServer.Business.Implementation
{
    public class UserResolverService : IUserResolverService
    {
        private readonly IHttpContextAccessor _accessor;
        public UserResolverService(IHttpContextAccessor accessor)
        {
            this._accessor = accessor;
        }

        public RequestContext GetUser()
        {
            var userId = _accessor?.HttpContext?.User?.FindFirst(Claims.UserId)?.Value;
            var userName = _accessor?.HttpContext?.User?.FindFirst(Claims.Username)?.Value;
            var email = _accessor?.HttpContext?.User?.FindFirst(Claims.Email)?.Value;
            var role = _accessor?.HttpContext?.User?.FindFirst(Claims.Role)?.Value;
            var promissions = _accessor?.HttpContext?.User?.FindFirst(Claims.Permissions)?.Value;
            var orgId = _accessor?.HttpContext?.User?.FindFirst(Claims.OrgId)?.Value;
            var user = new RequestContext()
            {
                Email = email,
                UserId = userId,
                UserName = userName,
                Role = role,
                Promissions = promissions
            };
            return user;
        }
    }
}
