using MassTransit;
using System;
using System.Threading.Tasks;
using WebAppIdentityServer.Business.Interfaces;
using WebAppIdentityServer.Data.EF.Entities;
using WebAppIdentityServer.Repository.Interfaces;
using WorkerService.Message;

namespace WebAppIdentityServer.Business.Implementation
{
    public class ActivityLogBusiness : BaseBusiness, IActivityLogBusiness
    {
        private readonly IActivityLogRepository _activityLogRep;
        private readonly IServiceProvider _serviceProvider;
        private readonly IPublishEndpoint _endpoint;
        public ActivityLogBusiness(IPublishEndpoint endpoint, IServiceProvider serviceProvider,
            IActivityLogRepository activityLogRep, IUserResolverService userResolver) : base(userResolver)
        {
            _activityLogRep = activityLogRep;
            _serviceProvider = serviceProvider;
            _endpoint = endpoint;
        }

        public async Task HandleAdd(ActivityLog model)
        {
            await _endpoint.Publish<ActivityLogMessage>(new ActivityLogMessage
            {
                ActivityLog = model
            });
        }
    }
}
