using WebAppIdentityServer.Data.EF.Entities;
using WebAppIdentityServer.ViewModel.Models.Common;

namespace WebAppIdentityServer.Business.Mappers
{
    public static class SystemConfigMapper
    {
        public static SystemConfigVM ToModel(this SystemConfig model)
        {
            if (model == null)
            {
                return null;
            }
            else
            {
                return new SystemConfigVM
                {
                    Description = model.Description,
                    Keywords = model.Keywords,
                    Logo = model.Logo,
                    Title = model.Title,
                    FacebookMessager = model.FacebookMessager,
                    GoogleAnalytics = model.GoogleAnalytics,
                    Googletag = model.Googletag,
                    PhoneNumber = model.PhoneNumber,
                    Id = model.Id
                };
            }
        }
        public static SystemConfig ToEntity(this SystemConfigVM model)
        {
            if (model == null)
            {
                return null;
            }
            else
            {
                return new SystemConfig
                {
                    Description = model.Description,
                    Keywords = model.Keywords,
                    Logo = model.Logo,
                    Title = model.Title,
                    FacebookMessager = model.FacebookMessager,
                    GoogleAnalytics = model.GoogleAnalytics,
                    Googletag = model.Googletag,
                    PhoneNumber = model.PhoneNumber,
                    Id = model.Id
                };
            }
        }
    }
}
