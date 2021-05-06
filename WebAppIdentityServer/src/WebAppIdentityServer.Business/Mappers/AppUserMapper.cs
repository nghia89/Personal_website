using WebAppIdentityServer.Data.EF.Entities;
using WebAppIdentityServer.ViewModel.Models.System;

namespace WebAppIdentityServer.Business.Mappers
{
    public static class AppUserMapper
    {
        public static UserVm ToModel(this AppUser model)
        {
            if (model == null)
            {
                return null;
            }
            else
            {
                return new UserVm
                {
                    DateCreated = model.DateCreated,
                    Dob = model.Dob,
                    Email = model.Email,
                    FirstName = model.FirstName,
                    FullName = model.FullName,
                    Id = model.Id.ToString(),
                    LastName = model.LastName,
                    Password = model.LastName,
                    PhoneNumber = model.PhoneNumber,
                    UserName = model.UserName,
                };
            }
        }
        public static AppUser ToEntity(this UserVm model)
        {
            if (model == null)
            {
                return null;
            }
            else
            {
                return new AppUser
                {
                    Dob = model.Dob,
                    Email = model.Email,
                    FirstName = model.FirstName,
                    FullName = model.FullName,
                    LastName = model.LastName,
                    PasswordHash = model.Password,
                    PhoneNumber = model.PhoneNumber,
                    UserName = model.UserName
                };
            }
        }
    }
}
