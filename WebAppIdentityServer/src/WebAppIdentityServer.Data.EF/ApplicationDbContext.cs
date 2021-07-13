using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using WebAppIdentityServer.Data.EF.Configurations;
using WebAppIdentityServer.Data.EF.Entities;
using WebAppIdentityServer.Data.EF.Extensions;
using WebAppIdentityServer.Data.EF.Interfaces;
using static WebAppIdentityServer.Infrastructure.Constants.SystemConstants;

namespace WebAppIdentityServer.Data.EF
{
    public class ApplicationDbContext : IdentityDbContext<AppUser, AppRole, Guid>
    {
        private readonly IHttpContextAccessor _accessor;
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
            //_accessor = this.GetService<IHttpContextAccessor>();
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.ConfigModelBuilder();

            builder.ApplyConfiguration(new AppUserConfiguration());
            builder.ApplyConfiguration(new AppRoleConfiguration());
            builder.Entity<IdentityUserClaim<Guid>>().ToTable("AppUserClaims");
            builder.Entity<IdentityUserRole<Guid>>().ToTable("AppUserRoles").HasKey(x => new { x.UserId, x.RoleId });
            builder.Entity<IdentityUserLogin<Guid>>().ToTable("AppUserLogins").HasKey(x => x.UserId);

            builder.Entity<IdentityRoleClaim<Guid>>().ToTable("AppRoleClaims");
            builder.Entity<IdentityUserToken<Guid>>().ToTable("AppUserTokens").HasKey(x => x.UserId);



        }
        public DbSet<Command> Commands { set; get; }
        public DbSet<ActivityLog> ActivityLogs { set; get; }
        public DbSet<Attachment> Attachments { set; get; }
        public DbSet<Bill> Bills { set; get; }
        public DbSet<BillDetail> BillDetails { set; get; }
        public DbSet<Blog> Blogs { set; get; }
        public DbSet<BlogTag> BlogTags { set; get; }
        public DbSet<Color> Colors { set; get; }
        public DbSet<Function> Functions { set; get; }
        public DbSet<ProductCategory> ProductCategory { set; get; }
        public DbSet<ProductQuantity> ProductQuantity { set; get; }
        public DbSet<ProductImages> ProductImages { set; get; }
        public DbSet<ProductCollections> ProductCollections { set; get; }
        public DbSet<ProductAndCollection> ProductAndCollections { set; get; }
        public DbSet<ProductTag> ProductTags { set; get; }
        public DbSet<Size> Sizes { set; get; }
        public DbSet<Slides> Slides { set; get; }
        public DbSet<SystemConfig> SystemConfigs { set; get; }
        public DbSet<Tag> Tags { set; get; }
        public DbSet<Permission> Permissions { set; get; }
        public DbSet<ProductQuantity> ProductQuantities { set; get; }
        public DbSet<Announcement> Announcements { set; get; }
        public DbSet<AnnouncementUser> AnnouncementUsers { set; get; }
        public DbSet<TableRecords> TableRecords { set; get; }
        public DbSet<PageOther> PageOthers { set; get; }
        public DbSet<CatalogOther> CatalogOthers { set; get; }



        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default(CancellationToken))
        {
            var userId = _accessor?.HttpContext?.User?.FindFirst(Claims.UserId)?.Value;
            IEnumerable<EntityEntry> modified = ChangeTracker.Entries()
                .Where(e => e.State == EntityState.Modified || e.State == EntityState.Added);
            foreach (EntityEntry item in modified)
            {
                if (item.Entity is IDateTracking changedOrAddedItem)
                {
                    if (item.State == EntityState.Added)
                    {
                        changedOrAddedItem.DateCreated = DateTime.Now;
                    }
                    else
                    {
                        changedOrAddedItem.DateModified = DateTime.Now;
                    }
                }
                if (item.Entity is IEntityTracking trackableEntity)
                {
                    if (item.State == EntityState.Added)
                    {
                        trackableEntity.CreatedBy = userId;
                    }
                    else
                    {
                        trackableEntity.UpdatedBy = userId;
                    }
                }
            }
            return base.SaveChangesAsync(cancellationToken);
        }

    }
}
