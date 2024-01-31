using Microsoft.AspNetCore.Http;
using System.Net.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using System.Text.Json.Nodes;
using System.Runtime.CompilerServices;
using LibAppApi.Models;
using System.Text.RegularExpressions;

namespace LibAppApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FinnaController : ControllerBase
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IGoogleBooksService _googleBooksService;

        public FinnaController(IHttpClientFactory httpClientFactory, IGoogleBooksService googleBooksService)
        {
            _httpClientFactory = httpClientFactory;
            _googleBooksService = googleBooksService;
        }

        [HttpGet("GetIDbyTitle")]
        public async Task<IActionResult> GetIDbyTitle(string title)
        {
            try
            {
                var httpClient = _httpClientFactory.CreateClient();
                httpClient.BaseAddress = new System.Uri("https://api.finna.fi/api/v1/");

                // Call the external API to get the data
                var response = await httpClient.GetAsync($"search?lookfor={title}&type=Title&field%5B%5D=rawData&sort=relevance%2Cid%20asc&page=1&limit=20&prettyPrint=false&lng=fi&filter%5B%5D=~format_ext_str_mv%3A\"0%2FBook%2F\"");

                // Check if the request was successful
                if (response.IsSuccessStatusCode)
                {
                    var Json = Content(await response.Content.ReadAsStringAsync(), "application/json");


                    JObject jsonObject = JObject.Parse(Json.Content);
                    JArray records = (JArray)jsonObject["records"];

                    if (records == null)
                        return NotFound("No results");

                    foreach (var item in records)
                    {
                        JObject rawData = (JObject)item["rawData"];
                        if (rawData != null)
                        {
                            JArray Ids = (JArray)rawData["local_ids_str_mv"];
                            if (Ids != null)
                            {
                                foreach (var id in Ids)
                                {
                                    if (id != null && id.Type == JTokenType.String && ((string)id).Contains("vaarakirjastot"))
                                    {
                                        return Ok(id);
                                    }
                                }
                            }
                        }
                    }

                    return NotFound("No results");
                }
                else
                {
                    // Return the status code of the response if the request was not successful
                    return StatusCode((int)response.StatusCode);
                }
            }
            catch (System.Exception ex)
            {
                // Return any exceptions that occur during the request
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet("GetAvailability")]
        public async Task<IActionResult> GetAvailabilityByID(string id)
        {
            try
            {
                var httpClient = _httpClientFactory.CreateClient();
                httpClient.BaseAddress = new System.Uri("https://api.finna.fi/api/v1/");

                // Call the external API to get the data
                var response = await httpClient.GetAsync($"record?id={id}&field%5B%5D=rawData&prettyPrint=false&lng=fi");

                // Check if the request was successful
                if (response.IsSuccessStatusCode)
                {
                    var Json = Content(await response.Content.ReadAsStringAsync(), "application/json");


                    JObject jsonObject = JObject.Parse(Json.Content);
                    JArray records = (JArray)jsonObject["records"];

                    if (records == null || records.Count == 0)
                        return NotFound("No results");

                    JObject firstRecord = (JObject)records[0];

                    if (firstRecord == null)
                        return NotFound("No results");

                    JArray availableBuildings = (JArray)firstRecord["rawData"]["building_available_str_mv"];

                    if (availableBuildings == null)
                        return Ok("Not available.");

                    if (availableBuildings.Count == 0)
                        return Ok("Not available.");

                    return Ok(availableBuildings);
                }
                else
                {
                    // Return the status code of the response if the request was not successful
                    return StatusCode((int)response.StatusCode);
                }
            }
            catch (System.Exception ex)
            {
                // Return any exceptions that occur during the request
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet("GetBookDataByID")]
        public async Task<IActionResult> GetBookObjectByID(string id)
        {
            try
            {
                var httpClient = _httpClientFactory.CreateClient();
                httpClient.BaseAddress = new Uri("https://api.finna.fi/api/v1/");

                var response = await httpClient.GetAsync($"record?id={id}&field%5B%5D=rawData&prettyPrint=false&lng=fi");

                if (response.IsSuccessStatusCode)
                {
                    var jsonString = await response.Content.ReadAsStringAsync();
                    JObject jsonObject = JObject.Parse(jsonString);

                    if (jsonObject == null)
                        return NotFound("No results");

                    JArray records = (JArray)jsonObject["records"];

                    if (records == null || records.Count == 0)
                        return NotFound("No results");

                    JObject firstRecord = (JObject)records[0];

                    if (firstRecord == null)
                        return NotFound("No results");

                    string author = firstRecord["rawData"]["author"]?.FirstOrDefault()?.ToString() ?? "Unknown";
                    string title = firstRecord["rawData"]["title"]?.ToString();
                    string isbn = firstRecord["rawData"]["isbn"]?.FirstOrDefault()?.ToString();
                    string physicalInfo = firstRecord["rawData"]["physical"]?.FirstOrDefault()?.ToString();
                    string thumbnail = await _googleBooksService.GetCoverLink(title + " " + author);

                    if (title == null || author == null || isbn == null || physicalInfo == null)
                        return NotFound("Couldn't retrieve all the information.");

                    int pages = 0;
                    if (int.TryParse(Regex.Match(physicalInfo ?? "", @"\d+").Value, out int pageCount))
                        pages = pageCount;

                    return Ok(new Book(id, title, thumbnail, author, pages, isbn));
                }
                else
                {
                    return StatusCode((int)response.StatusCode);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }

    
}
