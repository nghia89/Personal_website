using WebAppIdentityServer.ViewModel.Enum;

namespace WebAppIdentityServer.ViewModel.Models.Common
{
    public class AttachmentVM
    {
        public long Id { get; set; }
        public string FileName { get; set; }
        public string Path { get; set; }
        public string FileType { get; set; }
        public long FileSize { get; set; }
    }
}
