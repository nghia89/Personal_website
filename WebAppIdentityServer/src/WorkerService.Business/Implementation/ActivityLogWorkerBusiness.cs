
using MassTransit;
using System;
using System.Linq;
using System.Threading.Tasks;
using WebAppIdentityServer.Data.EF.Entities;
using WorkerService.Business.Interfaces;
using WorkerService.Repositoty.Interfaces;

namespace WorkerService.Business.Implementation
{
    public class ActivityLogWorkerBusiness : IActivityLogWorkerBusiness
    {
        private readonly IActivitylogWorkerRepositoty _activityLogRep;
        private readonly IBusControl _bus;
        public ActivityLogWorkerBusiness(IActivitylogWorkerRepositoty activityLogRep, IBusControl bus)
        {
            _activityLogRep = activityLogRep;
            _bus = bus;
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
            //await _bus.Publish(new NotifyMessage() { UserId = "08d92e36-e713-4419-87d2-018ec67d585b", Message = "aaaaaa"});
            await _activityLogRep.SaveAsync();
        }

        public async Task DeleteLogsChedule30()
        {
            var dnow = DateTime.UtcNow.AddMonths(-1);
            var data = await _activityLogRep.FindAllAsync(x => x.DateCreated < dnow, null);
            if (data.Any())
            {
                await _activityLogRep.RemoveMultipleAsync(data.ToList());
            }
        }
    }
}
