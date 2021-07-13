

using System.Collections.Generic;
using WebAppIdentityServer.ViewModel.Common;

namespace WebAppIdentityServer.Infrastructure.CommonContains
{
    public class CommonContains
    {
        public static List<ImageSize> ImageSize()
        {
            return new List<ImageSize>()
                        {
                            new ImageSize("compact", 200, 200),
                            new ImageSize("small", 400, 400),
                            new ImageSize("medium", 650, 650),
                            new ImageSize("large", 1000, 1000)
                        };
        }
    }

}
