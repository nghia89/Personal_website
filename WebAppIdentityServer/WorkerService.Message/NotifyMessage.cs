using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WorkerService.Message
{
    public class NotifyMessage
    {
        public string UserId { get; set; }
        public int Type { get; set; }
        public string Message { get; set; }
    }
}
