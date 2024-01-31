using Microsoft.AspNetCore.Mvc;

namespace LibAppApi.Controllers
{
    public interface IFinnaControllerService
    {
        Task<IActionResult> GetIDbyTitle(string title);
        Task<IActionResult> GetAvailabilityByID(string id);
        Task<IActionResult> GetBookObjectByID(string id);
    }
}
