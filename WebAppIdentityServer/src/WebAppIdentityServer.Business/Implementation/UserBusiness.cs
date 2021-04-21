using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAppIdentityServer.Business.Interfaces;
using WebAppIdentityServer.Data.EF;
using WebAppIdentityServer.Data.EF.Entities;
using WebAppIdentityServer.Utilities;
using WebAppIdentityServer.Utilities.Helpers;
using WebAppIdentityServer.ViewModel.Common;
using WebAppIdentityServer.ViewModel.Models.System;
using static WebAppIdentityServer.Utilities.Constants.SystemConstants;

namespace WebAppIdentityServer.Business.Implementation
{
    public class UserBusiness : BaseBusiness, IUserBusiness
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly RoleManager<AppRole> _roleManager;
        private readonly ApplicationDbContext _context;
        public UserBusiness(UserManager<AppUser> userManager, RoleManager<AppRole> roleManager,
            ApplicationDbContext context, IUserResolverService userResolver) : base(userResolver)
        {
            this._userManager = userManager;
            this._roleManager = roleManager;
            this._context = context;
        }

        public async Task<IdentityResult> Add(UserVm model)
        {
            var user = new AppUser()
            {
                Id = Guid.NewGuid(),
                Email = model.Email,
                Dob = model.Dob,
                UserName = model.Email,
                LastName = model.LastName,
                FirstName = model.FirstName,
                PhoneNumber = model.PhoneNumber,
                FullName = model.FirstName + " " + model.LastName + " " + model.Name,
                OrgId = model.OrgId
            };
            var result = await _userManager.CreateAsync(user, string.IsNullOrEmpty(model.Password) ? "Admin@123" : model.Password);
            return result;
        }

        public async Task<IdentityResult> AddToRolesAsync(AddRoleToUser model)
        {
            bool x = await _roleManager.RoleExistsAsync(RolesCT.AdminRoleName);
            var user = await _userManager.FindByIdAsync(model.UserId);
            if (x && user != null)
            {
                return await _userManager.AddToRolesAsync(user, new List<string> { model.RoleName });
            }
            return IdentityResult.Failed();
        }

        public async Task<bool> Delete(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return false;
            }

            var result = await _userManager.DeleteAsync(user);

            if (result.Succeeded)
            {
                return true;
            }
            return false;
        }

        public async Task<UserVm> GetById(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return null;
            }

            var userVm = new UserVm()
            {
                Id = user.Id.ToString(),
                UserName = user.UserName,
                Dob = user.Dob,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                FirstName = user.FirstName,
                LastName = user.LastName,
                FullName = user.FullName,
                DateCreated = user.DateCreated
            };
            return userVm;
        }

        public async Task<IEnumerable<TreeItem<FunctionVm>>> GetMenuByUserPermission()
        {
            var user = await _userManager.FindByIdAsync(this.UserId);
            var roles = await _userManager.GetRolesAsync(user);
            var query = from f in _context.Functions
                        join p in _context.Permissions
                            on f.Id equals p.FunctionId
                        join a in _context.Commands
                            on p.CommandId equals a.Id
                        join r in _roleManager.Roles on p.AppRoleId equals r.Id

                        where roles.Contains(r.Name) && a.Id == "VIEW" || f.ParentId == "ROOTID"
                        select new FunctionVm
                        {
                            Id = f.Id,
                            Name = f.Name,
                            Url = f.Url,
                            ParentId = f.ParentId,
                            SortOrder = f.SortOrder,
                        };
            var data = await query.Distinct()
                .OrderBy(x => x.ParentId)
                .ThenBy(x => x.SortOrder)
                .ToListAsync();
            IEnumerable<FunctionVm> enumList = data;
            var root = enumList.GenerateTree(c => c.Id, c => c.ParentId, "ROOTID");
            return root.Where(a => a.Children.Any()).ToList();
        }

        public async Task<(List<UserVm> data, long totalCount)> Paging(PagingParamModel pagingParam)
        {
            var query = _userManager.Users;
            if (!string.IsNullOrEmpty(pagingParam.query))
            {
                query = query.Where(x => x.Email.Contains(pagingParam.query)
                || x.UserName.Contains(pagingParam.query)
                || x.PhoneNumber.Contains(pagingParam.query)
                || x.Email.Contains(pagingParam.query)
                || x.FullName.Contains(pagingParam.query)
                );
            }
            if (pagingParam.page == null)
            {
                pagingParam.page = 1;
            }

            if (pagingParam.pageSize == null)
            {
                pagingParam.pageSize = 20;
            }

            var totalRecords = await query.CountAsync();
            var items = await query.Skip((pagingParam.page.Value - 1) * pagingParam.pageSize.Value)
                .Take(pagingParam.pageSize.Value)
                .Select(u => new UserVm()
                {
                    Id = u.Id.ToString(),
                    UserName = u.UserName,
                    Dob = u.Dob,
                    Email = u.Email,
                    PhoneNumber = u.PhoneNumber,
                    FirstName = u.FirstName,
                    LastName = u.LastName,
                    FullName = u.FullName,
                    DateCreated = u.DateCreated,
                }).ToListAsync();
            return (items, totalRecords);
        }

        public async Task<IdentityResult> Update(string id, UserVm model)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return null;
            }

            user.FirstName = model.FirstName;
            user.LastName = model.LastName;
            user.Dob = model.Dob;
            user.Email = model.Email;
            user.PhoneNumber = model.PhoneNumber;
            user.FullName = model.FirstName + " " + model.LastName + " " + model.Name;


            var result = await _userManager.UpdateAsync(user);

            if (result.Succeeded)
            {
                return result;
            }
            return result;
        }
    }
}
