using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebAppIdentityServer.Business.Interfaces;
using WebAppIdentityServer.Data.EF.Entities;
using WebAppIdentityServer.Repository.Interfaces;

namespace WebAppIdentityServer.Business.Implementation
{
    public class ActivityLogBusiness : IActivityLogBusiness
    {
        private readonly IActivityLogRepository _activityLogRep;
        private readonly IServiceProvider _serviceProvider;
        public ActivityLogBusiness(IServiceProvider serviceProvider,IActivityLogRepository activityLogRep)
        {
            _activityLogRep = activityLogRep;
            _serviceProvider = serviceProvider;
        }
        public Task Add(ActivityLog model)
        {
            throw new NotImplementedException();
        }
    }
}
