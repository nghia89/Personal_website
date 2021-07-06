using System.Collections.Generic;
using WebAppIdentityServer.Utilities.Enum;
using WebAppIdentityServer.ViewModel.Models.Common;

namespace WebAppIdentityServer.ViewModel.Models.Product
{
    public class ProductCollectionVM
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int SortOrder { get; set; }
        public string Images { get; set; }
        public Status Status { set; get; }
        public string SeoAlias { set; get; }
        public string SeoKeywords { set; get; }
        public string SeoDescription { set; get; }
        public List<AttachmentVM> Attachments { get; set; }
    }
}
