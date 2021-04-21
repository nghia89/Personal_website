using Microsoft.AspNetCore.Mvc.RazorPages;
using System;

namespace WebAppIdentityServer.Api.Areas.Identity.Pages.Account
{
    public class AccessDeniedModel : PageModel
    {
        public void OnGet()
        {
            throw new Exception("403");
        }
    }
}

