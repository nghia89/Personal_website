using Microsoft.AspNetCore.Mvc;

namespace WebAppIdentityServer.Api.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}