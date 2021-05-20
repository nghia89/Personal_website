
using System.ComponentModel.DataAnnotations;

namespace WebAppIdentityServer.Data.EF.Entities
{
    public class TableRecords
    {
        public long Id { get; set; }
        public long Count { get; set; }

        public int Type { get; set; }
    }
}
