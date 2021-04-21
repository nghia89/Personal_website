using WebAppIdentityServer.Utilities.Enum;

namespace WebAppIdentityServer.ViewModel.Models.Common
{
    public class SlideShowVM
    {
        public long Id { set; get; }
        public string Name { set; get; }
        public string Description { set; get; }
        public string Image { set; get; }
        public string Url { set; get; }
        public int? DisplayOrder { set; get; }
        public Status Status { set; get; }
        public string Content { set; get; }
        public string GroupAlias { get; set; }
    }
}
