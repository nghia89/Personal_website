using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAppIdentityServer.Data.EF.Entities;

namespace WebAppIdentityServer.Data.EF
{
    public class DbInitializer
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<AppUser> _userManager;
        private readonly RoleManager<AppRole> _roleManager;
        private readonly string AdminRoleName = "Admin";
        private readonly string UserRoleName = "Member";

        public DbInitializer(ApplicationDbContext context,
          UserManager<AppUser> userManager,
          RoleManager<AppRole> roleManager)
        {
            _context = context;
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public async Task Seed()
        {

            #region Quyền
            if (!_roleManager.Roles.Any())
            {
                await _roleManager.CreateAsync(new AppRole
                {
                    Name = AdminRoleName,
                    Description = AdminRoleName,
                    DateCreated = new DateTime(),
                    DateModified = new DateTime(),
                });
                await _roleManager.CreateAsync(new AppRole
                {
                    Name = UserRoleName,
                    Description = UserRoleName,
                    DateCreated = new DateTime(),
                    DateModified = new DateTime(),
                });
            }

            #endregion Quyền

            #region Người dùng

            if (!_userManager.Users.Any())
            {
                var result = await _userManager.CreateAsync(new AppUser
                {
                    UserName = "admin",
                    FirstName = "Quản trị",
                    LastName = "1",
                    NormalizedUserName = AdminRoleName.ToUpper(),
                    Email = "nghia8996@gmail.com",
                    LockoutEnabled = false,
                    DateCreated = new DateTime(),
                    DateModified = new DateTime(),
                }, "Admin@123");
                if (result.Succeeded)
                {
                    var user = await _userManager.FindByNameAsync("admin");
                    var role = await _roleManager.FindByNameAsync(AdminRoleName);

                    await _userManager.AddToRoleAsync(user, AdminRoleName);
                }
            }

            #endregion Người dùng

            #region Chức năng

            if (!_context.Functions.Any())
            {
                _context.Functions.AddRange(new List<Function>
                {
                    new Function {Id = "DASHBOARD", Name = "Thống kê", ParentId = "ROOTID", SortOrder = 1,Url = "/dashboard",Icon="fa-dashboard", DateCreated=new DateTime(),DateModified=new DateTime() },


                    new Function {Id = "CONTENT",Name = "Sản phẩm",ParentId = "ROOTID", SortOrder = 2,Url = "/contents",Icon="IconShoppingCart", DateCreated=new DateTime(),DateModified=new DateTime() },
                    new Function {Id = "CONTENT_CATEGORY",Name = "Danh mục",ParentId ="CONTENT",Url = "/contents/categories" , DateCreated=new DateTime(),DateModified=new DateTime() },
                    new Function {Id = "CONTENT_PRODUCT",Name = "Sản phẫm",ParentId = "CONTENT",SortOrder = 2,Url = "/contents/product",Icon="fa-edit" , DateCreated=new DateTime(),DateModified=new DateTime()},
                    new Function {Id = "CONTENT_COMMENT",Name = "Bình luận",ParentId = "CONTENT",SortOrder = 3,Url = "/contents/product/comments",Icon="fa-edit", DateCreated=new DateTime(),DateModified=new DateTime() },
                    new Function {Id = "CONTENT_REPORT",Name = "Báo xấu",ParentId = "CONTENT",SortOrder = 3,Url = "/contents/product/reports",Icon="fa-edit", DateCreated=new DateTime(),DateModified=new DateTime() },


                    new Function {Id = "SYSTEM", Name = "Hệ thống", ParentId = "ROOTID", SortOrder = 3, Url = "/systems",Icon="IconUsers" , DateCreated=new DateTime(),DateModified=new DateTime()},
                    new Function {Id = "SYSTEM_USER", Name = "Người dùng",ParentId = "SYSTEM",Url = "/systems/users",Icon="fa-desktop", DateCreated=new DateTime(),DateModified=new DateTime()},
                    new Function {Id = "SYSTEM_ROLE", Name = "Nhóm quyền",ParentId = "SYSTEM",Url = "/systems/roles",Icon="fa-desktop", DateCreated=new DateTime(),DateModified=new DateTime()},
                    new Function {Id = "SYSTEM_PERMISSION", Name = "Quyền hạn",ParentId = "SYSTEM",Url = "/systems/permissions",Icon="fa-desktop", DateCreated=new DateTime(),DateModified=new DateTime()},

                    new Function {Id = "SYSTEM_CONFIG", Name = "Cấu hình", ParentId = "ROOTID", SortOrder = 4, Url = "/systemconfigs",Icon="IconSetting" , DateCreated=new DateTime(),DateModified=new DateTime()},
                    new Function {Id = "SYSTEMCONFIG_GENERAL", Name = "Cấu hình website", ParentId = "SYSTEM_CONFIG", SortOrder = 4, Url = "/systemconfig/general",Icon="IconSetting" , DateCreated=new DateTime(),DateModified=new DateTime()},

                });
                await _context.SaveChangesAsync();
            }

            if (!_context.Commands.Any())
            {
                _context.Commands.AddRange(new List<Command>()
                {
                    new Command(){Id = "VIEW", Name = "Xem", DateCreated=new DateTime(),DateModified=new DateTime()},
                    new Command(){Id = "CREATE", Name = "Thêm", DateCreated=new DateTime(),DateModified=new DateTime()},
                    new Command(){Id = "UPDATE", Name = "Sửa", DateCreated=new DateTime(),DateModified=new DateTime()},
                    new Command(){Id = "DELETE", Name = "Xoá", DateCreated=new DateTime(),DateModified=new DateTime()},
                    new Command(){Id = "APPROVE", Name = "Duyệt", DateCreated=new DateTime(),DateModified=new DateTime()},
                });
            }

            #endregion Chức năng

            var functions = _context.Functions;

            if (!_context.CommandInFunctions.Any())
            {
                foreach (var function in functions)
                {
                    var createAction = new CommandInFunction()
                    {
                        CommandId = "CREATE",
                        FunctionId = function.Id
                    };
                    _context.CommandInFunctions.Add(createAction);

                    var updateAction = new CommandInFunction()
                    {
                        CommandId = "UPDATE",
                        FunctionId = function.Id
                    };
                    _context.CommandInFunctions.Add(updateAction);
                    var deleteAction = new CommandInFunction()
                    {
                        CommandId = "DELETE",
                        FunctionId = function.Id
                    };
                    _context.CommandInFunctions.Add(deleteAction);

                    var viewAction = new CommandInFunction()
                    {
                        CommandId = "VIEW",
                        FunctionId = function.Id
                    };
                    _context.CommandInFunctions.Add(viewAction);
                }
            }

            if (!_context.Permissions.Any())
            {
                var adminRole = await _roleManager.FindByNameAsync(AdminRoleName);
                foreach (var function in functions)
                {
                    _context.Permissions.Add(new Permission { FunctionId = function.Id, AppRoleId = adminRole.Id, CommandId = "CREATE", DateCreated = new DateTime(), DateModified = new DateTime() });
                    _context.Permissions.Add(new Permission { FunctionId = function.Id, AppRoleId = adminRole.Id, CommandId = "UPDATE", DateCreated = new DateTime(), DateModified = new DateTime() });
                    _context.Permissions.Add(new Permission { FunctionId = function.Id, AppRoleId = adminRole.Id, CommandId = "DELETE", DateCreated = new DateTime(), DateModified = new DateTime() });
                    _context.Permissions.Add(new Permission { FunctionId = function.Id, AppRoleId = adminRole.Id, CommandId = "VIEW", DateCreated = new DateTime(), DateModified = new DateTime() });
                }
            }

            await _context.SaveChangesAsync();
        }
    }
}
