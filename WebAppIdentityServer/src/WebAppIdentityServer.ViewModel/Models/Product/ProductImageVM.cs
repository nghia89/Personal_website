using System;

namespace WebAppIdentityServer.ViewModel.Models.Product
{
    public class ProductImageVM
    {
        public long Id { get; set; }
        public long ProductId { get; set; }
        public string Path { get; set; }
        public int Size { get; set; }
        public string FileName { get; set; }
        public string Type { get; set; }
        public int SortOrder { get; set; }
        public string Caption { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime? DateModified { get; set; }

    }
}
