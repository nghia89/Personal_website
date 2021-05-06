using WebAppIdentityServer.Data.EF.Interfaces;

namespace WebAppIdentityServer.Data.EF.Entities
{
    public class CommandInFunction : IEntityTracking
    {
        public string CommandId { get; set; }
        public Command Command { get; set; }
        public string FunctionId { get; set; }
        public Function Function { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
    }
}
