using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebAppIdentityServer.Utilities
{
    public class Appsettings
    {
        public QueueSettings QueueSettings { get; set; }

        public Appsettings()
        {

        }

        public Appsettings(QueueSettings queueSettings)
        {
            QueueSettings = queueSettings;
        }
    }
}
