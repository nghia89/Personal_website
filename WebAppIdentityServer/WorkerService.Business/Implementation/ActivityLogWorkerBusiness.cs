
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebAppIdentityServer.Data.EF.Entities;
using WorkerService.Business.Interfaces;
using WorkerService.Repositoty.Interfaces;

namespace WorkerService.Business.Implementation
{
    public class ActivityLogWorkerBusiness : IActivityLogWorkerBusiness
    {
        private readonly IActivitylogWorkerRepositoty _activityLogRep;
        public ActivityLogWorkerBusiness(IActivitylogWorkerRepositoty activityLogRep)
        {
            _activityLogRep = activityLogRep;
        }
        public async Task Add(ActivityLog model)
        {
            _activityLogRep.Add(new ActivityLog
            {
                Action = model.Action,
                Content = model.Content,
                CreatedBy = model.CreatedBy,
                EntityName = model.EntityName,
                DateCreated = DateTime.UtcNow
            });
            await _activityLogRep.SaveAsync();
        }
    }
}
