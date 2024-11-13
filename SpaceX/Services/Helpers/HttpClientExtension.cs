using Entity;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Services.Helpers
{
    public static class HttpClientExtension
    {
        public static async Task<List<SpaceXLaunch>> TransformDataToListObjects(this HttpResponseMessage response)
        {
            if (!response.IsSuccessStatusCode)
                throw new ApplicationException($"Something went wrong calling the API: {response.ReasonPhrase}");

            var dataAsString = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
            JToken token = JToken.Parse(dataAsString);
            List<SpaceXLaunch> list = new List<SpaceXLaunch>();
            if (token.Type == JTokenType.Array)
            {
                list = token.Select(obj => new SpaceXLaunch
                {
                    Id = (string)obj["id"],
                    Name = (string)obj["name"],
                    Url = (string)obj["links"]["patch"]["small"],
                }).ToList();
            }
            else
            {

                list.Add(new SpaceXLaunch
                {
                    Id = (string)token["id"],
                    Name = (string)token["name"],
                    Url = (string)token["links"]["patch"]["small"],
                });
            }

            return list;
        }

        public static async Task<SpaceXLaunchDetails> TransformDataToObject(this HttpResponseMessage response)
        {
            if (!response.IsSuccessStatusCode)
                throw new ApplicationException($"Something went wrong calling the API: {response.ReasonPhrase}");
            var dataAsString = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
            JObject jsonObject = JObject.Parse(dataAsString);
            var a = (string)jsonObject["success"];

            return new SpaceXLaunchDetails
            {
                Id = (string)jsonObject["id"],
                Title = (string)jsonObject["name"],
                Date = (string)jsonObject["date_local"],
                Url = (string)jsonObject["links"]["patch"]["small"],
                Success = (string)jsonObject["success"] != null ? (bool)jsonObject["success"] : null,
                Details = (string)jsonObject["details"],
                Article = (string)jsonObject["links"]["article"],
                Webcast = (string)jsonObject["links"]["webcast"],
                Wikipeida = (string)jsonObject["links"]["wikipedia"],
            };
        }
    }
}
