using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using MobyLabWebProgramming.Core.Entities;

namespace MobyLabWebProgramming.Infrastructure.EntityConfigurations;

/// <summary>
/// This is the entity configuration for the Subject entity.
/// </summary>
public class LaboratoryUserConfiguration : IEntityTypeConfiguration<LaboratoryUser>
{
    public void Configure(EntityTypeBuilder<LaboratoryUser> builder)
    {
        builder.Property(e => e.Id)
            .IsRequired();
        builder.HasKey(x => x.Id);
        builder.Property(e => e.CreatedAt)
            .IsRequired();
        builder.Property(e => e.UpdatedAt)
            .IsRequired();

        builder.HasOne(e => e.Laboratory)
            .WithMany(l => l.LaboratoryUsers)
            .HasForeignKey(e => e.LaboratoryId);

        builder.HasOne(e => e.User)
            .WithMany(l => l.LaboratoryUsers)
            .HasForeignKey(e => e.UserId);
    }
}
