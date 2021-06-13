using Microsoft.AspNetCore.Http;
using System;
using static WebAppIdentityServer.Utilities.Constants.SystemConstants;

namespace WebAppIdentityServer.Data.EF
{
    public class BaseRepository
    {
        private readonly IHttpContextAccessor _accessor;
        public RequestContext User;
        public BaseRepository(IHttpContextAccessor accessor)
        {
            this._accessor = accessor;
            User = this.GetUser();
        }

        public string UserId => this.User?.UserId;
        public string UserName => this.User?.UserName;
        public string Email => this.User?.Email;
        public string Role => this.User?.Role;
        public long OrgId => this.User.OrgId;



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
                Promissions = promissions,
                OrgId = string.IsNullOrEmpty(orgId) ? 0 : Int64.Parse(orgId)
            };
            return user;
        }
    }



    public class RequestContext
    {
        public string UserId { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public long OrgId { get; set; }
        public string Role { get; set; }
        public string Promissions { get; set; }
    }
}
