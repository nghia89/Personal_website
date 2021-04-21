using System.Collections.Generic;

namespace WebAppIdentityServer.ViewModel
{
    public class Pagination<T>
    {
        public List<T> Items { get; set; }

        public long Total { get; set; }
    }
}
