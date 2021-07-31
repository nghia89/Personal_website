using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebAppIdentityServer.Data.EF.Entities;
using WebAppIdentityServer.Data.EF.Interfaces;

namespace WorkerService.Repositoty.Interfaces
{
    public interface IActivitylogWorkerRepositoty : IRepository<ActivityLog>
    {
    }
}
