using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using MobyLabWebProgramming.Core.Entities;

namespace MobyLabWebProgramming.Infrastructure.EntityConfigurations;

/// <summary>
/// This is the entity configuration for the Subject entity.
/// </summary>
public class CourseInstanceUserConfiguration : IEntityTypeConfiguration<CourseInstanceUser>
{
    public void Configure(EntityTypeBuilder<CourseInstanceUser> builder)
    {
        builder.Property(e => e.Id)
            .IsRequired();
        builder.HasKey(x => x.Id);
        builder.Property(e => e.CreatedAt)
            .IsRequired();
        builder.Property(e => e.UpdatedAt)
            .IsRequired();

        builder.HasOne(e => e.CourseInstance)
            .WithMany(l => l.CourseInstanceUsers)
            .HasForeignKey(e => e.CourseInstanceId);

        builder.HasOne(e => e.User)
            .WithMany(l => l.CourseInstanceUsers)
            .HasForeignKey(e => e.UserId);
    }
}
