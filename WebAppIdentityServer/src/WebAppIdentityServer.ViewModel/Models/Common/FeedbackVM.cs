using System;
using WebAppIdentityServer.ViewModel.Enum;

namespace WebAppIdentityServer.ViewModel.Models.Common
{
    public class FeedbackVM
    {
        public int Id { set; get; }
        public string Name { set; get; }

        public string Email { set; get; }
        public string Message { set; get; }

        public Status Status { set; get; }
        public DateTime DateCreated { set; get; }
        public DateTime DateModified { set; get; }
    }
}
