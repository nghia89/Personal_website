using System;
using System.Threading.Tasks;
using WorkerService.Business.Interfaces;
using WorkerService.HandleService.Interfaces;

namespace WorkerService.HandleService
{
    public class SomeHandleService : ISomeHandleService
    {
        private readonly IActivityLogWorkerBusiness _activityLogWorkerBus;
        public SomeHandleService(IActivityLogWorkerBusiness activityLogWorkerBus)
        {
            _activityLogWorkerBus = activityLogWorkerBus;
        }

        public async Task DeleteActivityLog30()
        {
            await _activityLogWorkerBus.DeleteLogsChedule30();

            Console.WriteLine(string.Format("Delete DeleteLogsChedule30 Success- {0}", DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")));
        }
    }
}
