namespace WebAppIdentityServer.Data.EF.Interfaces
{
    public interface IHasSeoMetaData
    {
        public string SeoAlias { set; get; }
        public string SeoKeywords { set; get; }
        public string SeoDescription { set; get; }
    }
}
