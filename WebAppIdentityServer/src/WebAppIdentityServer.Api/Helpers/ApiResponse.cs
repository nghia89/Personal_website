using Newtonsoft.Json;

namespace WebAppIdentityServer.Api.Helpers
{
    public class ApiResponse
    {
        public int statusCode { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string message { get; }
        public string stackTrace { get; }
        public bool isError { get; }

        public ApiResponse(int statusCodeOut, string messageOut = null, string stackTraceOut = null)
        {
            isError = true;
            statusCode = statusCodeOut;
            stackTrace = stackTraceOut;
            message = messageOut ?? GetDefaultMessageForStatusCode(statusCode);
        }

        private static string GetDefaultMessageForStatusCode(int statusCode)
        {
            switch (statusCode)
            {
                case 403:
                    return "No Authorization";
                case 404:
                    return "Resource not found";

                case 500:
                    return "An unhandled error occurred";

                default:
                    return null;
            }
        }
    }
}
