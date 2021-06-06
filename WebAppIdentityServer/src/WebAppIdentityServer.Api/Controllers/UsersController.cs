using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using WebAppIdentityServer.Api.Authorization;
using WebAppIdentityServer.Api.Helpers;
using WebAppIdentityServer.Business.Interfaces;
using WebAppIdentityServer.Utilities.Constants;
using WebAppIdentityServer.ViewModel;
using WebAppIdentityServer.ViewModel.Common;
using WebAppIdentityServer.ViewModel.Models.System;

namespace WebAppIdentityServer.Api.Controllers
{
    public class UsersController : BaseController
    {
        private readonly IUserBusiness _userBu;

        public UsersController(IUserBusiness IUserBusiness)
        {
            _userBu = IUserBusiness;
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
            var (items, total) = await _userBu.Paging(pagingParam);

            var pagination = new Pagination<UserVm>
            {
                Items = items,
                Total = total,
            };
            return ToOkResult(pagination);
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