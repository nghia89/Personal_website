using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using WebAppIdentityServer.Api.Authorization;
using WebAppIdentityServer.Api.Helpers;
using WebAppIdentityServer.Business.Interfaces;
using WebAppIdentityServer.Infrastructure.Constants;
using WebAppIdentityServer.ViewModel.Common;
using WebAppIdentityServer.ViewModel.Models.System;

namespace WebAppIdentityServer.Api.Controllers
{
    public class RolesController : BaseController
    {
        private readonly IRolesBusiness _rolesBu;
        public RolesController(IRolesBusiness rolesBu)
        {
            this._rolesBu = rolesBu;
        }

        [HttpPost]
        [ClaimRequirement(FunctionCode.SYSTEM_ROLE, CommandCode.CREATE)]
        [ApiValidationFilter]
        public async Task<IActionResult> Post(RoleVm request)
        {

            var result = await _rolesBu.Add(request);
            if (result.Succeeded)
            {
                return ToOkResult(true);
            }
            else
            {
                return ToOkResult(new ApiBadRequest(result));
            }
        }

        [HttpGet("paging")]
        [ClaimRequirement(FunctionCode.SYSTEM_ROLE, CommandCode.VIEW)]
        public async Task<IActionResult> Paging([FromQuery] PagingParamModel pagingParam)
        {
            var data = await _rolesBu.Paging(pagingParam);
            return ToOkResult(data);
        }

        [HttpGet("{id}")]
        [ClaimRequirement(FunctionCode.SYSTEM_ROLE, CommandCode.VIEW)]
        public async Task<IActionResult> GetById(string id)
        {
            var role = await _rolesBu.GetById(id);
            if (role == null)
            {
                return ToOkResult(new ApiNotFound("Không tìm thấy data."));
            }

            return ToOkResult(role);
        }

        [HttpGet("getall")]
        [ClaimRequirement(FunctionCode.SYSTEM_ROLE, CommandCode.VIEW)]
        public async Task<IActionResult> GetAll()
        {
            var role = await _rolesBu.GetAll();
            if (role == null)
            {
                return ToOkResult(new ApiNotFound("Không tìm thấy data."));
            }

            return ToOkResult(role);
        }

        [HttpPut("{id}")]
        [ClaimRequirement(FunctionCode.SYSTEM_ROLE, CommandCode.UPDATE)]
        [ApiValidationFilter]
        public async Task<IActionResult> Put(string id, [FromBody] RoleVm roleVm)
        {

            var role = await _rolesBu.Update(id, roleVm);
            if (role == null)
            {
                return ToOkResult(new ApiNotFound("Không tìm thấy data."));
            }

            return ToOkResult(role);
        }

        [HttpDelete("{id}")]
        [ClaimRequirement(FunctionCode.SYSTEM_ROLE, CommandCode.DELETE)]
        public async Task<IActionResult> Delete(string id)
        {
            var role = await _rolesBu.Delete(id);
            return ToOkResult(role);
        }


        [HttpPut("{roleId}/permissions")]
        [ClaimRequirement(FunctionCode.SYSTEM_ROLE, CommandCode.UPDATE)]
        public async Task<IActionResult> PutPermissionByRoleId(string roleId, [FromBody] UpdatePermissionRequest request)
        {
            var data = await _rolesBu.PutPermissionByRoleId(roleId, request);
            return ToOkResult(data);
        }

        //[HttpGet("permission_by_role/{roleId}")]
        //[ClaimRequirement(FunctionCode.SYSTEM_ROLE, CommandCode.VIEW)]
        //public async Task<IActionResult> GetPermissionByRoleId(string roleId)
        //{
        //    var permissions = await _rolesBu.GetPermissionByRoleId(roleId);

        //    return ToOkResult(permissions);
        //}

    }
}