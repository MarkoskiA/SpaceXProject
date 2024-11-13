using Contracts.Services;
using Entity;
using Services.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Services
{
    public class SpaceXService : ISpaceXService
    {
        private readonly HttpClient _httpClient;
        //private readonly IConfiguration _configuration;

        public SpaceXService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }
        public async Task<IEnumerable<SpaceXLaunch>> GetLauhcnes(string apiAddition)
        {
            var apiUrl = Environment.GetEnvironmentVariable("SpaceXApiKey");
            HttpResponseMessage response = await _httpClient.GetAsync(apiUrl+apiAddition);

            var responseData = await response.TransformDataToListObjects();
            
            return responseData;
        }

        public async Task<SpaceXLaunchDetails> GetSpecificLaunch(string uid)
        {
            var apiUrl = Environment.GetEnvironmentVariable("SpaceXApiKey");
            HttpResponseMessage response = await _httpClient.GetAsync(apiUrl+uid);
            
            var responseData = await response.TransformDataToObject();

            return responseData;
        }
    }
}
