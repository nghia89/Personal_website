using Microsoft.EntityFrameworkCore;
using WebAppIdentityServer.Data.EF.Entities;

namespace WebAppIdentityServer.Data.EF.Configurations
{
    public static class BuilderConfigurations
    {
        public static void ConfigModelBuilder(this ModelBuilder builder)
        {
            builder.Entity<Product>(entity =>
            {
                entity.ToTable("Products");
                entity.HasKey(x => x.Id);
                entity.HasIndex(x => new { x.Name, x.Code }).IsFullText(true);
                entity.HasIndex(x => new { x.Id });
            });

            builder.Entity<ActivityLog>(entity =>
            {
                entity.ToTable("ActivityLogs");
                entity.HasKey(x => x.Id);
                entity.HasIndex(x => new { x.Id });
            });
            builder.Entity<Attachment>(entity =>
            {
                entity.ToTable("Attachments");
                entity.HasKey(x => x.Id);
                entity.HasIndex(x => new { x.Id });
            });
            builder.Entity<Bill>(entity =>
            {
                entity.ToTable("Bills");
                entity.HasKey(x => x.Id);
                entity.HasIndex(x => new { x.Id });
            });
            builder.Entity<BillDetail>(entity =>
            {
                entity.ToTable("BillDetails");
                entity.HasKey(x => x.Id);
                entity.HasIndex(x => new { x.Id });
            });
            builder.Entity<Blog>(entity =>
            {
                entity.ToTable("Blogs");
                entity.HasKey(x => x.Id);
                entity.HasIndex(x => new { x.Id });
            });
            builder.Entity<BlogTag>(entity =>
            {
                entity.ToTable("BlogTags");
                entity.HasKey(x => x.Id);
                entity.HasIndex(x => new { x.Id });
            });
            builder.Entity<Color>(entity =>
            {
                entity.ToTable("Colors");
                entity.HasKey(x => x.Id);
                entity.HasIndex(x => new { x.Id });
            });
            builder.Entity<Command>(entity =>
            {
                entity.ToTable("Commands");
                entity.HasKey(x => x.Id);
                entity.HasIndex(x => new { x.Id });
            });
            builder.Entity<Function>(entity =>
            {
                entity.ToTable("Functions");
                entity.HasKey(x => x.Id);
                entity.HasIndex(x => new { x.Id });
            });
            builder.Entity<ProductCategory>(entity =>
            {
                entity.ToTable("ProductCategorys");
                entity.HasKey(x => x.Id);
                entity.HasIndex(x => new { x.Id });
            });
            builder.Entity<ProductQuantity>(entity =>
            {
                entity.ToTable("ProductQuantitys");
                entity.HasKey(x => x.Id);
                entity.HasIndex(x => new { x.Id });
            });
            builder.Entity<ProductTag>(entity =>
            {
                entity.ToTable("ProductTags");
                entity.HasKey(x => x.Id);
                entity.HasIndex(x => new { x.Id });
            });
            builder.Entity<Size>(entity =>
            {
                entity.ToTable("Size");
                entity.HasKey(x => x.Id);
                entity.HasIndex(x => new { x.Id });
            });
            builder.Entity<Slides>(entity =>
            {
                entity.ToTable("Slides");
                entity.HasKey(x => x.Id);
                entity.HasIndex(x => new { x.Id });
            });
            builder.Entity<SystemConfig>(entity =>
            {
                entity.ToTable("SystemConfigs");
                entity.HasKey(x => x.Id);
                entity.HasIndex(x => new { x.Id });
            });
            builder.Entity<Tag>(entity =>
            {
                entity.ToTable("Tags");
                entity.HasKey(x => x.Id);
                entity.HasIndex(x => new { x.Id });
            });
            builder.Entity<Permission>(entity =>
            {
                entity.ToTable("Permissions");
                entity.HasKey(x => new { x.AppRoleId, x.FunctionId, x.CommandId });
                entity.HasIndex(x => new { x.FunctionId, x.CommandId, x.AppRoleId });
            });
            builder.Entity<ProductQuantity>(entity =>
            {
                entity.ToTable("ProductQuantitys");
                entity.HasKey(x => new { x.Id });
                entity.HasIndex(x => new { x.Id });
            });
            builder.Entity<Announcement>(entity =>
            {
                entity.ToTable("Announcements");
                entity.HasKey(x => new { x.Id });
                entity.HasIndex(x => new { x.Id });
            });
            builder.Entity<AnnouncementUser>(entity =>
            {
                entity.ToTable("AnnouncementUsers");
                entity.HasKey(x => new { x.Id });
                entity.HasIndex(x => new { x.AnnouncementId, x.UserId });
            });
            builder.Entity<TableRecords>(entity =>
           {
               entity.ToTable("TableRecords");
               entity.HasKey(x => x.Id);
           });
            builder.Entity<ProductImages>(entity =>
            {
                entity.ToTable("ProductImages");
                entity.HasKey(x => x.Id);
                entity.HasIndex(x => x.Id);
                entity.HasIndex(x => x.ProductId);
            });

            builder.Entity<ProductCollections>(entity =>
            {
                entity.ToTable("ProductCollections");
                entity.HasKey(x => x.Id);
                entity.HasIndex(x => x.Id);
            });

            builder.Entity<ProductAndCollection>(entity =>
            {
                entity.ToTable("ProductAndCollections");
                entity.HasKey(x => new { x.ProductId, x.ProductCollectionId });
                entity.HasIndex(x => new { x.ProductId, x.ProductCollectionId });
                entity.HasIndex(x => x.ProductCollectionId);
            });

            builder.Entity<CatalogOther>(entity =>
           {
               entity.ToTable("CatalogOthers");
               entity.HasKey(x => x.Id);
           });

            builder.Entity<PageOther>(entity =>
           {
               entity.ToTable("PageOthers");
               entity.HasKey(x => x.Id);
           });
        }
    }
}
