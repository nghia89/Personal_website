using Microsoft.EntityFrameworkCore;
using WebAppIdentityServer.Data.EF.Entities;

namespace WebAppIdentityServer.Data.EF.Configurations
{
    public static class BuilderConfigurations
    {
        public static void ConfigModelBuilder(this ModelBuilder builder)
        {
            builder.Entity<ResourceOrganization>(e =>
            {
                e.ToTable("ResourceOrganizations");
                e.HasKey(x => x.Id);
                e.HasIndex(x => x.Id);
            });

            builder.Entity<Product>(entity =>
            {
                entity.HasKey(x => x.Id);
                entity.ToTable("Products");
                entity.HasIndex(x => new { x.Name }).ForMySqlIsFullText(true);
                entity.HasIndex(x => new { x.OrgId, x.Id });
            });

            builder.Entity<ActivityLog>(entity =>
            {
                entity.ToTable("ActivityLogs");
                entity.HasKey(x => x.Id);
                entity.HasIndex(x => new { x.OrgId, x.Id });
            });
            builder.Entity<Attachment>(entity =>
            {
                entity.ToTable("Attachments");
                entity.HasKey(x => x.Id);
                entity.HasIndex(x => new { x.OrgId, x.Id });
            });
            builder.Entity<Bill>(entity =>
            {
                entity.ToTable("Bills");
                entity.HasKey(x => x.Id);
                entity.HasIndex(x => new { x.OrgId, x.Id });
            });
            builder.Entity<BillDetail>(entity =>
            {
                entity.ToTable("BillDetails");
                entity.HasKey(x => x.Id);
                entity.HasIndex(x => new { x.OrgId, x.Id });
            });
            builder.Entity<Blog>(entity =>
            {
                entity.ToTable("Blogs");
                entity.HasKey(x => x.Id);
                entity.HasIndex(x => new { x.OrgId, x.Id });
            });
            builder.Entity<BlogTag>(entity =>
            {
                entity.ToTable("BlogTags");
                entity.HasKey(x => x.Id);
                entity.HasIndex(x => new { x.OrgId, x.Id });
            });
            builder.Entity<Color>(entity =>
            {
                entity.ToTable("Colors");
                entity.HasKey(x => x.Id);
                entity.HasIndex(x => new { x.OrgId, x.Id });
            });
            builder.Entity<Command>(entity =>
            {
                entity.ToTable("Commands");
                entity.HasKey(x => x.Id);
                entity.HasIndex(x => new { x.OrgId, x.Id });
            });
            builder.Entity<Function>(entity =>
            {
                entity.ToTable("Functions");
                entity.HasKey(x => x.Id);
                entity.HasIndex(x => new { x.OrgId, x.Id });
            });
            builder.Entity<ProductCategory>(entity =>
            {
                entity.ToTable("ProductCategorys");
                entity.HasKey(x => x.Id);
                entity.HasIndex(x => new { x.OrgId, x.Id });
            });
            builder.Entity<ProductQuantity>(entity =>
            {
                entity.ToTable("ProductQuantitys");
                entity.HasKey(x => x.Id);
                entity.HasIndex(x => new { x.OrgId, x.Id });
            });
            builder.Entity<ProductTag>(entity =>
            {
                entity.ToTable("ProductTags");
                entity.HasKey(x => x.Id);
                entity.HasIndex(x => new { x.OrgId, x.Id });
            });
            builder.Entity<Size>(entity =>
            {
                entity.ToTable("Size");
                entity.HasKey(x => x.Id);
                entity.HasIndex(x => new { x.OrgId, x.Id });
            });
            builder.Entity<Slide>(entity =>
            {
                entity.ToTable("Slides");
                entity.HasKey(x => x.Id);
                entity.HasIndex(x => new { x.OrgId, x.Id });
            });
            builder.Entity<SystemConfig>(entity =>
            {
                entity.ToTable("SystemConfigs");
                entity.HasKey(x => x.Id);
                entity.HasIndex(x => new { x.OrgId, x.Id });
            });
            builder.Entity<Tag>(entity =>
            {
                entity.ToTable("Tags");
                entity.HasKey(x => x.Id);
                entity.HasIndex(x => new { x.OrgId, x.Id });
            });
            builder.Entity<CommandInFunction>(entity =>
            {
                entity.ToTable("CommandInFunctions");
                entity.HasKey(x => new { x.CommandId, x.FunctionId });
                entity.HasIndex(x => new { x.OrgId, x.CommandId, x.FunctionId });
            });
            builder.Entity<Permission>(entity =>
            {
                entity.ToTable("Permissions");
                entity.HasKey(x => new { x.AppRoleId, x.FunctionId, x.CommandId });
                entity.HasIndex(x => new { x.OrgId, x.FunctionId, x.CommandId, x.AppRoleId });
            });
            builder.Entity<ProductQuantity>(entity =>
            {
                entity.ToTable("ProductQuantitys");
                entity.HasKey(x => new { x.Id });
                entity.HasIndex(x => new { x.OrgId, x.Id });
            });
            builder.Entity<Announcement>(entity =>
            {
                entity.ToTable("Announcements");
                entity.HasKey(x => new { x.Id });
                entity.HasIndex(x => new { x.OrgId, x.Id });
            });
            builder.Entity<AnnouncementUser>(entity =>
            {
                entity.ToTable("AnnouncementUsers");
                entity.HasKey(x => new { x.Id });
                entity.HasIndex(x => new { x.OrgId, x.AnnouncementId, x.UserId });
            });
        }
    }
}
