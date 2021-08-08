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
        public string Title { set; get; }
        public string Content { set; get; }
        public string Link { set; get; }
        public string ToUserId { set; get; }
    }
}
