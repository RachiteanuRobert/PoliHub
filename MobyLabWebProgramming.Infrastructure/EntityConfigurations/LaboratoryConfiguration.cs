using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MobyLabWebProgramming.Core.Entities;

namespace MobyLabWebProgramming.Infrastructure.EntityConfigurations;

/// <summary>
/// This is the entity configuration for the User entity, generally the Entity Framework will figure out most of the configuration but,
/// for some specifics such as unique keys, indexes and foreign keys it is better to explicitly specify them.
/// Note that the EntityTypeBuilder implements a Fluent interface, meaning it is a highly declarative interface using method-chaining.
/// </summary>
public class LaboratoryConfiguration : IEntityTypeConfiguration<Laboratory>
{
    public void Configure(EntityTypeBuilder<Laboratory> builder)
    {
        builder.Property(e => e.Id) // This specifies which property is configured.
            .IsRequired(); // Here it is specified if the property is required, meaning it cannot be null in the database.
        builder.HasKey(x => x.Id); // Here it is specifies that the property Id is the primary key.
        builder.Property(e => e.Name)
            .HasMaxLength(255) // This specifies the maximum length for varchar type in the database.
            .IsRequired();
        builder.Property(e => e.Year)
            .HasMaxLength(5)
            .IsRequired();
        builder.Property(e => e.Professor)
            .HasMaxLength(255)
            .IsRequired();
        builder.Property(e => e.Department)
            .HasMaxLength(255)
            .IsRequired();
        builder.Property(e => e.CreditsNo)
            .HasMaxLength(5)
            .IsRequired();
        builder.Property(e => e.Description)
            .HasMaxLength(4095)
            .IsRequired(false); // This specifies that this column can be null in the database.
        builder.Property(e => e.StartTime)
            .HasMaxLength(255)
            .IsRequired();
        builder.Property(e => e.Duration)
            .HasMaxLength(255)
            .IsRequired();
        builder.Property(e => e.Location)
            .HasMaxLength(255)
            .IsRequired();
        builder.Property(e => e.AssistantName)
            .HasMaxLength(255)
            .IsRequired();
        builder.Property(e => e.CreatedAt)
            .IsRequired();
        builder.Property(e => e.UpdatedAt)
            .IsRequired();

        builder.HasOne(e => e.Subject) // This specifies a one-to-many relation.
            .WithMany(e => e.Laboratories) // This provides the reverse mapping for the one-to-many relation. 
            .HasForeignKey(e => e.LaboratoryId) // Here the foreign key column is specified.
            .HasPrincipalKey(e => e.Id) // This specifies the referenced key in the referenced table.
            .IsRequired()
            .OnDelete(DeleteBehavior.NoAction); // This specifies the delete behavior when the referenced entity is removed.
    }
}
