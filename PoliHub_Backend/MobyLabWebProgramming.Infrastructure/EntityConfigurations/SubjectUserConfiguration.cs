using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using MobyLabWebProgramming.Core.Entities;

namespace MobyLabWebProgramming.Infrastructure.EntityConfigurations;

/// <summary>
/// This is the entity configuration for the Subject entity.
/// </summary>
public class SubjectUserConfiguration : IEntityTypeConfiguration<SubjectUser>
{
    public void Configure(EntityTypeBuilder<SubjectUser> builder)
    {
        builder.Property(e => e.Id)
            .IsRequired();
        builder.HasKey(x => x.Id);         
        builder.Property(e => e.CreatedAt)
            .IsRequired();
        builder.Property(e => e.UpdatedAt)
            .IsRequired();

        builder.HasOne(e => e.Subject)
            .WithMany(l => l.SubjectUsers)
            .HasForeignKey(e => e.SubjectId);

        builder.HasOne(e => e.User)
            .WithMany(l => l.SubjectUsers)
            .HasForeignKey(e => e.UserId);
    }
}
