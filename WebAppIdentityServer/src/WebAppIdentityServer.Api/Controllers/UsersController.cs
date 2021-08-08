using MassTransit;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System.Linq;
using System.Threading.Tasks;
using WebAppIdentityServer.Api.Authorization;
using WebAppIdentityServer.Api.Helpers;
using WebAppIdentityServer.Api.Hubs;
using WebAppIdentityServer.Api.Hubs.Bus;
using WebAppIdentityServer.Business.Interfaces;
using WebAppIdentityServer.Infrastructure.Constants;
using WebAppIdentityServer.ViewModel.Common;
using WebAppIdentityServer.ViewModel.Models.System;
using WorkerService.Message;

namespace WebAppIdentityServer.Api.Controllers
{
    public class UsersController : BaseController
    {
        private readonly IUserBusiness _userBu;
        private readonly IBus _bus;
        public UsersController(IUserBusiness IUserBusiness, IBus hub)
        {
            _userBu = IUserBusiness;
            _bus = hub;
        }

        [HttpPost]
        [AllowAnonymous]
        [ApiValidationFilter]
        public async Task<IActionResult> Post(UserVm request)
        {
            var result = await _userBu.Add(request);
            if (result.Succeeded)
            {
                return ToOkResult(true);
            }
            else
            {
                return BadRequest(result.Errors);
            }
        }

        [HttpGet("paging")]
        [ClaimRequirement(FunctionCode.SYSTEM_USER, CommandCode.VIEW)]
        public async Task<IActionResult> Paging([FromQuery] PagingParamModel pagingParam)
        {
            var data = await _userBu.Paging(pagingParam);
            return ToOkResult(data);
        }

        [HttpGet("{id}")]
        [ClaimRequirement(FunctionCode.SYSTEM_USER, CommandCode.VIEW)]
        public async Task<IActionResult> GetById(string id)
        {
            var user = await _userBu.GetById(id);
            if (user == null)
            {
                return NotFound();
            }

            return ToOkResult(user);
        }

        [HttpPut("{id}")]
        [ClaimRequirement(FunctionCode.SYSTEM_USER, CommandCode.UPDATE)]
        [ApiValidationFilter]
        public async Task<IActionResult> Put(string id, [FromBody] UserVm request)
        {
            var result = await _userBu.Update(id, request);

            if (result.Succeeded)
            {
                return ToOkResult();
            }
            return BadRequest(result.Errors);
        }

        [HttpDelete("{id}")]
        [ClaimRequirement(FunctionCode.SYSTEM_USER, CommandCode.DELETE)]
        public async Task<IActionResult> Delete(string id)
        {
            var user = await _userBu.Delete(id);
            return ToOkResult(user);

        }
        [HttpGet("menu")]
        [ClaimRequirement(FunctionCode.SYSTEM_USER, CommandCode.VIEW)]
        public async Task<IActionResult> GetMenuByUserPermission()
        {
            var data = await _userBu.GetMenuByUserPermission();
            string ui = HttpContext?.User?.Claims?.FirstOrDefault(m => m.Type == "sub")?.Value;
          await  _bus.Publish(new NotifyMessage { UserId = ui, Message = "ssss" });
            //await  _hub.Clients.User(ui).SendAsync("ReceiveNotify", new NotifyMessage { User = ui, Message = "ssss" });
            //await  _hub.Clients.All.SendAsync("ReceiveNotify", new ChatMessage { User = ui, Message = "ssss" });
            return ToOkResult(data);
        }

        [HttpPost("add_role_user")]
        [ClaimRequirement(FunctionCode.SYSTEM_USER, CommandCode.UPDATE)]
        public async Task<IActionResult> PostRolesToUserUser([FromBody] AddRoleToUser request)
        {

            var result = await _userBu.AddToRolesAsync(request);
            if (result.Succeeded)
            {
                return ToOkResult();
            }
            else
            {
                return BadRequest(result.Errors);
            }
        }
    }
}