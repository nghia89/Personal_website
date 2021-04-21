using System;
using System.Collections.Generic;
using System.Text;
using WebAppIdentityServer.Data.EF.Entities;
using WebAppIdentityServer.ViewModel.Models.System;

namespace WebAppIdentityServer.Business.Mappers
{
    public static class ResourceOrganizationMapper
    {
        public static ResourceOrganizationVM ToModel(this ResourceOrganization model)
        {
            if (model == null)
            {
                return null;
            }
            else
            {
                return new ResourceOrganizationVM
                {
                    Id = model.Id,
                    Name = model.Name,
                    Description = model.Description,
                    Email = model.Email,
                    Phone = model.Phone,
                    Status = model.Status,
                    CreatedBy = model.CreatedBy,
                    DateCreated = model.DateCreated,
                    DateModified = model.DateModified,
                    UpdatedBy = model.UpdatedBy,
                    Domain=model.Domain
                };
            }
        }
        public static ResourceOrganization ToEntity(this ResourceOrganizationVM model)
        {
            if (model == null)
            {
                return null;
            }
            else
            {
                return new ResourceOrganization
                {
                    Id = model.Id,
                    Name = model.Name,
                    Description = model.Description,
                    Email = model.Email,
                    Phone = model.Phone,
                    Status = model.Status,
                    Domain = model.Domain
                };
            }
        }
    }
}
