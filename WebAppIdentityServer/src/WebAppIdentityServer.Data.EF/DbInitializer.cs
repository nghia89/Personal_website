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
                    new Function {Id = "DASHBOARD", Name = "Dashboard", ParentId = "ROOTID", SortOrder = 1,Url = "/dashboard",Icon="fa-dashboard", DateCreated=new DateTime(),DateModified=new DateTime() },


                    new Function {Id = "PRODUCTS",Name = "Sản phẩm",ParentId = "ROOTID", SortOrder = 2,Url = "/products",Icon="IconShoppingCart", DateCreated=new DateTime(),DateModified=new DateTime() },
                    new Function {Id = "PRODUCTS_CATEGORY",Name = "Danh mục",ParentId ="PRODUCTS",Url = "/product/categories" , DateCreated=new DateTime(),DateModified=new DateTime() },
                    new Function {Id = "PRODUCTS_PRODUCT",Name = "Sản phẫm",ParentId = "PRODUCTS",SortOrder = 2,Url = "/products",Icon="fa-edit" , DateCreated=new DateTime(),DateModified=new DateTime()},
                    new Function {Id = "PRODUCTS_GROUP",Name = "Nhóm sản phẩm",ParentId = "PRODUCTS",SortOrder = 3,Url = "/product/groups",Icon="fa-edit", DateCreated=new DateTime(),DateModified=new DateTime() },
                    new Function {Id = "PRODUCTS_REPORT",Name = "Báo xấu",ParentId = "PRODUCTS",SortOrder = 3,Url = "/product/product/reports",Icon="fa-edit", DateCreated=new DateTime(),DateModified=new DateTime() },


                    new Function {Id = "SYSTEM", Name = "Hệ thống", ParentId = "ROOTID", SortOrder = 3, Url = "/systems",Icon="IconUsers" , DateCreated=new DateTime(),DateModified=new DateTime()},
                    new Function {Id = "SYSTEM_USER", Name = "Người dùng",ParentId = "SYSTEM",Url = "/systems/users",Icon="fa-desktop", DateCreated=new DateTime(),DateModified=new DateTime()},
                    new Function {Id = "SYSTEM_ROLE", Name = "Nhóm quyền",ParentId = "SYSTEM",Url = "/systems/roles",Icon="fa-desktop", DateCreated=new DateTime(),DateModified=new DateTime()},
                    new Function {Id = "SYSTEM_PERMISSION", Name = "Quyền hạn",ParentId = "SYSTEM",Url = "/systems/permissions",Icon="fa-desktop", DateCreated=new DateTime(),DateModified=new DateTime()},

                    new Function {Id = "SETTING", Name = "Cấu hình", ParentId = "ROOTID", SortOrder = 4, Url = "/systemconfigs",Icon="IconSetting" , DateCreated=new DateTime(),DateModified=new DateTime()},
                    new Function {Id = "SETTING_COLOR", Name = "Cấu hình màu sắc", ParentId = "SETTING", SortOrder = 1, Url = "/setting/colors",Icon="IconSetting" , DateCreated=new DateTime(),DateModified=new DateTime()},
                    new Function {Id = "SETTING_SIZE", Name = "Cấu hình kích thước", ParentId = "SETTING", SortOrder = 2, Url = "/setting/sizes",Icon="IconSetting" , DateCreated=new DateTime(),DateModified=new DateTime()},

                    new Function {Id = "SETTING_PAGES", Name = "Cấu hình trang", ParentId = "ROOTID", SortOrder = 5, Url = "",Icon="IconMonitor" , DateCreated=new DateTime(),DateModified=new DateTime()},
                    new Function {Id = "ST_CONFIG_GENERAL", Name = "Cấu hình website", ParentId = "SETTING_PAGES", SortOrder =1, Url = "/setting_page/config/general" , DateCreated=new DateTime(),DateModified=new DateTime()},
                    new Function {Id = "ST_SLIDES", Name = "SlideShow", ParentId = "SETTING_PAGES", SortOrder = 2, Url = "/setting_page/slides" , DateCreated=new DateTime(),DateModified=new DateTime()},
                    new Function {Id = "ST_PAGES", Name = "Các trang khác", ParentId = "SETTING_PAGES", SortOrder = 3, Url = "/setting_page/pages" , DateCreated=new DateTime(),DateModified=new DateTime()},

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

            var functions = _context.Functions.Where(x => x.ParentId != "ROOTID");

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
