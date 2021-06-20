using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAppIdentityServer.Business.Interfaces;
using WebAppIdentityServer.Data.EF;
using WebAppIdentityServer.Data.EF.Entities;
using WebAppIdentityServer.Repository.Interfaces;
using WebAppIdentityServer.Utilities;
using WebAppIdentityServer.Utilities.Helpers;
using WebAppIdentityServer.ViewModel.Common;
using WebAppIdentityServer.ViewModel.Models.System;

namespace WebAppIdentityServer.Business.Implementation
{
    public class RolesBusiness : BaseBusiness, IRolesBusiness
    {
        private readonly RoleManager<AppRole> _roleManager;
        private readonly ApplicationDbContext _context;
        private readonly IRoleRepository _roleRepository;
        public RolesBusiness(RoleManager<AppRole> roleManager, ApplicationDbContext context, IRoleRepository roleRepository,
              IUserResolverService userResolver) : base(userResolver)
        {
            this._roleManager = roleManager;
            this._roleRepository = roleRepository;
            this._context = context;
        }

        public async Task<IdentityResult> Add(RoleVm model)
        {
            var role = new AppRole()
            {
                Name = model.Name,
                NormalizedName = model.Name.ToUpper(),
                Description = model.Description
            };
            var result = await _roleManager.CreateAsync(role);

            return result;
        }

        public async Task<bool> Delete(string id)
        {
            var role = await _roleManager.FindByIdAsync(id);
            if (role == null)
            {
                return false;
            }

            var result = await _roleManager.DeleteAsync(role);

            if (result.Succeeded)
            {
                return true;
            }
            return false;
        }

        public async Task<List<RoleVm>> GetAll()
        {
            var data = await _roleRepository.GetAllAsync(null);
            return data.Select(u => new RoleVm()
            {
                Id = u.Id.ToString(),
                Name = u.Name,
                Description = u.Description
            }).ToList();
        }

        public async Task<RoleVm> GetById(string id)
        {


            var role = await _roleManager.FindByIdAsync(id);
            if (role == null)
            {
                AddError("có lổi xảy ra");
            }

            return new RoleVm() { Id = role.Id.ToString(), Name = role.Name, Description = role.Description };
        }


        public async Task<PagedResult<RoleVm>> Paging(PagingParamModel pagingParam)
        {
            var query = _roleManager.Roles;
            if (!string.IsNullOrEmpty(pagingParam.query))
            {
                query = query.Where(x => x.Name.Contains(pagingParam.query));
            }
            var totalRecords = await query.CountAsync();
            var items = await query.Skip((pagingParam.page.Value - 1) * pagingParam.pageSize.Value)
                .Take(pagingParam.pageSize.Value)
                .Select(u => new RoleVm()
                {
                    Id = u.Id.ToString(),
                    Name = u.Name,
                    Description = u.Description
                }).ToListAsync();
            return new PagedResult<RoleVm>()
            {
                Data = items,
                TotalCount = totalRecords
            };
        }

        public async Task<bool> PutPermissionByRoleId(string roleId, UpdatePermissionRequest model)
        {
            var newPermissions = new List<Permission>();
            foreach (var p in model.Permissions)
            {
                newPermissions.Add(new Permission() { FunctionId = p.FunctionId, AppRoleId = Guid.Parse(roleId), CommandId = p.CommandId });
            }

            var existingPermissions = _context.Permissions.Where(x => x.AppRoleId == Guid.Parse(roleId));
            _context.Permissions.RemoveRange(existingPermissions);
            _context.Permissions.AddRange(newPermissions);
            var result = await _context.SaveChangesAsync();
            if (result > 0)
            {
                return true;
            }
            return false;
        }

        public async Task<IdentityResult> Update(string id, RoleVm model)
        {
            var role = await _roleManager.FindByIdAsync(id);
            if (role == null)
            {
                return null;
            }

            role.Name = model.Name;
            role.NormalizedName = model.Name.ToUpper();
            role.Description = model.Description;

            var result = await _roleManager.UpdateAsync(role);
            return result;
        }
    }
}
