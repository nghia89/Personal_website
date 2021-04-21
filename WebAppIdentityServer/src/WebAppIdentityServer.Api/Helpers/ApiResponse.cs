using Newtonsoft.Json;

namespace WebAppIdentityServer.Api.Helpers
{
    public class ApiResponse
    {
        public int statusCode { get; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string message { get; }
        public string stackTrace { get; }
        public bool isError { get; }

        public ApiResponse(int statusCode, string message = null, string stackTrace = null)
        {
            isError = true;
            statusCode = statusCode;
            stackTrace = stackTrace;
            message = message ?? GetDefaultMessageForStatusCode(statusCode);
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
