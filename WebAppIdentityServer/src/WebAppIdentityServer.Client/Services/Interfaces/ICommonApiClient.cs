using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAppIdentityServer.ViewModel.Models.Common;

namespace WebAppIdentityServer.Client.Services.Interfaces
{
    public interface ICommonApiClient
    {
        Task<List<SlideShowVM>> getSlides();
        Task<SystemConfigVM> getSystemConfig();
    }
}
