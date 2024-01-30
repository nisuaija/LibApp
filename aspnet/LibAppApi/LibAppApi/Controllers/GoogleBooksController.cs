using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace LibAppApi.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class GoogleBooksController : ControllerBase
    {
        private readonly IGoogleBooksService _googleBooksService;

        public GoogleBooksController(IGoogleBooksService googleBooksService)
        {
            _googleBooksService = googleBooksService;
        }

        [HttpGet("GetIDbyTitle")]
        public async Task<IActionResult> GetCoverLink(string titleAndAuthor)
        {
            string thumbnail = await _googleBooksService.GetCoverLink(titleAndAuthor);
            if (thumbnail != null)
                return Ok(thumbnail);
            else
                return NotFound("No results");
        }
    }

    public class GoogleBooksService : IGoogleBooksService
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public GoogleBooksService(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        public async Task<string> GetCoverLink(string titleAndAuthor)
        {
            try
            {
                var httpClient = _httpClientFactory.CreateClient();
                httpClient.BaseAddress = new System.Uri("https://www.googleapis.com/books/v1/");

                // Call the external API to get the data
                var response = await httpClient.GetAsync($"volumes?q={titleAndAuthor}&fields=items(volumeInfo/imageLinks/thumbnail)");

                // Check if the request was successful
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync();
                    JObject jsonObject = JObject.Parse(content);
                    JArray items = (JArray)jsonObject["items"];

                    if (items == null || items.Count == 0)
                        return null;

                    JObject item = (JObject)items[0];
                    string thumbnail = (string)item["volumeInfo"]["imageLinks"]["thumbnail"];
                    return thumbnail;
                }
                else
                {
                    // Return null if the request was not successful
                    return null;
                }
            }
            catch (System.Exception ex)
            {
                // Return null if an exception occurs during the request
                return null;
            }
        }
    }
}
