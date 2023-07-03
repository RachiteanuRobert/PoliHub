using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MobyLabWebProgramming.Core.Entities;

namespace MobyLabWebProgramming.Infrastructure.EntityConfigurations;

/// <summary>
/// This is the entity configuration for the User entity, generally the Entity Framework will figure out most of the configuration but,
/// for some specifics such as unique keys, indexes and foreign keys it is better to explicitly specify them.
/// Note that the EntityTypeBuilder implements a Fluent interface, meaning it is a highly declarative interface using method-chaining.
/// </summary>
public class CourseInstanceConfiguration : IEntityTypeConfiguration<CourseInstance>
{
    public void Configure(EntityTypeBuilder<CourseInstance> builder)
    {
        builder.Property(e => e.Id) // This specifies which property is configured.
            .IsRequired(); // Here it is specified if the property is required, meaning it cannot be null in the database.
        builder.HasKey(x => x.Id); // Here it is specifies that the property Id is the primary key.
        builder.Property(e => e.CreatedAt)
            .IsRequired();
        builder.Property(e => e.UpdatedAt)
            .IsRequired();
        builder.Property(e => e.CourseInstanceDate)
            .IsRequired();
        builder.Property(e => e.Name)
            .HasMaxLength(100)
            .IsRequired();
        builder.Property(e => e.Description)
            .HasMaxLength(200)
            .IsRequired();


        builder.HasOne(e => e.Course) // This specifies a one-to-many relation.
            .WithMany(e => e.CourseInstances) // This provides the reverse mapping for the one-to-many relation. 
            .HasForeignKey(e => e.CourseId) // Here the foreign key column is specified.
            .HasPrincipalKey(e => e.Id) // This specifies the referenced key in the referenced table.
            .IsRequired()
            .OnDelete(DeleteBehavior.Cascade); // This specifies the delete behavior when the referenced entity is removed.
    }
}
