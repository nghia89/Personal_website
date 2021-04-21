using Dapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using WebAppIdentityServer.Api.Authorization;
using WebAppIdentityServer.Business.Interfaces;
using WebAppIdentityServer.Data.EF.Dapper;
using WebAppIdentityServer.Utilities.Constants;
using WebAppIdentityServer.ViewModel.Models.System;

namespace WebAppIdentityServer.Api.Controllers
{
    public class PermissionsController : BaseController
    {
        private readonly IConfiguration _configuration;
        private readonly IFunctionBusiness _functionBu;
        private readonly IDapper _dapper;

        public PermissionsController(IConfiguration configuration, IDapper dapper, IFunctionBusiness functionBu)
        {
            _configuration = configuration;
            _functionBu = functionBu;
            _dapper = dapper;
        }

        /// <summary>
        /// Show list function with corressponding action included in each functions
        /// </summary>
        /// <returns></returns>
        [HttpGet("{roleId}")]
        [ClaimRequirement(FunctionCode.SYSTEM_PERMISSION, CommandCode.VIEW)]
        public async Task<IActionResult> GetFuncAndCommanByPermissions(string roleId)
        {
            var funcToAction = new List<PermissionScreenVm>();
            var func = await _functionBu.GetFuncChild();

            var param = new DynamicParameters();
            param.Add("roleId", roleId);
            var data = await _dapper.Execute<PermissionScreenVm>("pro_permission_by_role", param);

            var funcNotPermission = func.Where(a => !data.Any(x => a.Id == x.Id)).ToList();
            if (data.Any())
            {
                funcToAction.AddRange(data);
            }

            foreach (var item in funcNotPermission)
            {
                funcToAction.Add(new PermissionScreenVm
                {
                    Id = item.Id,
                    Name = item.Name,
                    ParentId = item.ParentId,
                    HasCreate = false,
                    HasDelete = false,
                    HasUpdate = false,
                    HasView = false
                });
            }

            return Ok(funcToAction);
        }
    }
}