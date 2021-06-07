using System.Collections.Generic;

namespace WebAppIdentityServer.Utilities
{
    public class PagedResult<T>
    {
        public PagedResult()
        {
            Data = new List<T>();
        }
        public IList<T> Data { get; set; }
        public long TotalCount { get; set; }
    }
}
