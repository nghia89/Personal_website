using System.Collections.Generic;

namespace WebAppIdentityServer.ViewModel.Models.System
{
    internal class TreeItem<T>
    {
        public T Item { get; set; }
        public IEnumerable<TreeItem<T>> Children { get; set; }
    }
}
