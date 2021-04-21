using System;

namespace WebAppIdentityServer.ViewModel.Models.System
{
    public class UserVm
    {
        public string Id { get; set; }
        public long OrgId { get; set; }

        public string UserName { get; set; }
        public string Password { get; set; }

        public string Email { get; set; }

        public string PhoneNumber { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }
        public string Name { get; set; }
        public string FullName { get; set; }

        public DateTime Dob { get; set; }
        public DateTime DateCreated { get; set; }

    }
}
