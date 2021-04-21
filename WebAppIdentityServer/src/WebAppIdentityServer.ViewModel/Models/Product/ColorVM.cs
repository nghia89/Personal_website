namespace WebAppIdentityServer.ViewModel.Models.Product
{
    public class ColorVM
    {
        public int Id { get; set; }

        public string Name
        {
            get; set;
        }

        public string Code { get; set; }
        public long? OrgId { get; set; }
    }
}
