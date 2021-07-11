using WebAppIdentityServer.ViewModel.Enum;

namespace WebAppIdentityServer.ViewModel.Models.Common
{
    public class ContactVM
    {
        public string Id { set; get; }
        public string Name { set; get; }

        public string Phone { set; get; }

        public string Email { set; get; }

        public string Website { set; get; }

        public string Address { set; get; }

        public string Other { set; get; }

        public double? Lat { set; get; }

        public double? Lng { set; get; }

        public Status Status { set; get; }
    }
}
