using Microsoft.AspNetCore.Mvc.RazorPages;
using System;
using WebAppIdentityServer.Infrastructure.Helpers;

namespace WebAppIdentityServer.Api.Areas.Identity.Pages.Account
{
    public class AccessDeniedModel : PageModel
    {
        public void OnGet()
        {
            throw new HandleException("403");
        }
    }
}

