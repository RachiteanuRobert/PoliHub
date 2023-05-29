using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MobyLabWebProgramming.Core.Entities;

namespace MobyLabWebProgramming.Infrastructure.EntityConfigurations;

/// <summary>
/// This is the entity configuration for the User entity, generally the Entity Framework will figure out most of the configuration but,
/// for some specifics such as unique keys, indexes and foreign keys it is better to explicitly specify them.
/// Note that the EntityTypeBuilder implements a Fluent interface, meaning it is a highly declarative interface using method-chaining.
/// </summary>
public class CourseConfiguration : IEntityTypeConfiguration<Course>
{
    public void Configure(EntityTypeBuilder<Course> builder)
    {
        builder.Property(e => e.Id) // This specifies which property is configured.
            .IsRequired(); // Here it is specified if the property is required, meaning it cannot be null in the database.
        builder.HasKey(x => x.Id); // Here it is specifies that the property Id is the primary key.
        builder.Property(e => e.ProfessorName)
            .HasMaxLength(255)
            .IsRequired();
        builder.Property(e => e.StartTime)
            .IsRequired();
        builder.Property(e => e.Duration)
            .HasMaxLength(255)
            .IsRequired();
        builder.Property(e => e.Location)
            .HasMaxLength(255)
            .IsRequired();
        builder.Property(e => e.Series)
            .HasMaxLength(10)
            .IsRequired();
        builder.Property(e => e.DayOfWeek)
            .HasMaxLength(10)
            .IsRequired();
        builder.Property(e => e.CreatedAt)
            .IsRequired();
        builder.Property(e => e.UpdatedAt)
            .IsRequired();

        builder.HasOne(e => e.Subject)
             .WithMany(s => s.Courses)
             .HasForeignKey(s => s.SubjectId)
             .HasPrincipalKey(e => e.Id) 
            .IsRequired()
            .OnDelete(DeleteBehavior.NoAction);
    }
}
