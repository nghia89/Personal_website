using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System;
using System.Collections.Generic;
using System.Linq;

namespace WebAppIdentityServer.Api.Helpers
{
    public class ApiBadRequest : ApiResponse
    {
        public IEnumerable<string> Errors { get; }

        public ApiBadRequest(ModelStateDictionary modelState)
            : base(400)
        {
            if (modelState.IsValid)
            {
                throw new ArgumentException("ModelState must be invalid", nameof(modelState));
            }

            Errors = modelState.SelectMany(x => x.Value.Errors)
                .Select(x => x.ErrorMessage).ToArray();
        }
        public ApiBadRequest(IdentityResult identityResult)
           : base(400)
        {
            Errors = identityResult.Errors
                .Select(x => x.Code + " - " + x.Description).ToArray();
        }

        public ApiBadRequest(string message)
           : base(400, message)
        {
        }
    }
}
