using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.Threading.Tasks;
using WebAppIdentityServer.Utilities.Helpers;

namespace WebAppIdentityServer.Api.Helpers
{
    public class ErrorWrappingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ErrorWrappingMiddleware> _logger;
        protected IWebHostEnvironment _Host { get; }

        public ErrorWrappingMiddleware(RequestDelegate next, ILogger<ErrorWrappingMiddleware> logger, IWebHostEnvironment host)
        {
            _Host = host;
            _next = next;
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        public async Task Invoke(HttpContext context)
        {
            string message = string.Empty;
            var stackTrace = String.Empty;
            try
            {
                await _next.Invoke(context);
            }
            catch (Exception ex)
            {
                Console.WriteLine("catch Exception");
                _logger.LogError(ex, ex.Message);
                var exceptionType = ex.GetType();
                if (exceptionType == typeof(HandleException))
                {
                    message = ex.Message;
                    context.Response.StatusCode = 500;
                }
                else if (ex.Message == "403")
                {
                    context.Response.StatusCode = 403;
                }
                else
                {
                    context.Response.StatusCode = 500;
                    if (_Host.IsDevelopment() || _Host.IsStaging())
                    {
                        stackTrace = ex.StackTrace;
                    }
                }

            }
            var statusCode = context.Response.StatusCode;
            if (statusCode != 200 && !context.Response.HasStarted)
            {
                context.Response.ContentType = "application/json";

                var response = new ApiResponse(context.Response.StatusCode, message, stackTrace);

                var json = JsonConvert.SerializeObject(response);

                await context.Response.WriteAsync(json);
            }
        }
    }
}
