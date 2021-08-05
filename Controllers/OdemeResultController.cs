using market.sencard.com.tr.Cache;
using market.sencard.com.tr.Models;
using market.sencard.com.tr.State;
using Microsoft.AspNetCore.Mvc;

namespace market.sencard.com.tr.Controllers
{
    public class OdemeResultController : Controller
    {
        private readonly ICacheService cacheService;

        public OdemeResultController(ICacheService cacheService)
        {
            this.cacheService = cacheService;
        }

        [HttpPost]
        public IActionResult Index([FromForm] ResultForm resultForm)
        {
            if (resultForm.ResponseCode == "00")
            {
                var stateObject = cacheService.GetItem<StateObject>(resultForm.SessionToken);
                if (stateObject != null)
                {
                    stateObject.ResultForm = resultForm;
                    cacheService.SetItem(stateObject.Token, stateObject, 1440);
                }
            }

            return View(resultForm);
        }
    }
}