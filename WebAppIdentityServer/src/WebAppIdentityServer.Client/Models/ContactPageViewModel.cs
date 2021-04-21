using WebAppIdentityServer.ViewModel.Models.Common;

namespace WebAppIdentityServer.Client.Models
{
    public class ContactPageViewModel
    {
        public ContactVM Contact { set; get; }

        public FeedbackVM Feedback { set; get; }
    }
}
