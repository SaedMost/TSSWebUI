using market.sencard.com.tr.Cache;
using Microsoft.AspNetCore.Mvc;

namespace market.sencard.com.tr.Controllers
{
    public class BupaController : Controller
    {
        private readonly ICacheService cacheService;

        public BupaController(ICacheService cacheService)
        {
            this.cacheService = cacheService;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult PaketSecimi()
        {
            return View();
        }

        public IActionResult SaglikBilgileri()
        {
            return View();
        }

        public IActionResult IletisimBilgileri()
        {
            return View();
        }

        public IActionResult Odeme()
        {
            return View();
        }
    }
}