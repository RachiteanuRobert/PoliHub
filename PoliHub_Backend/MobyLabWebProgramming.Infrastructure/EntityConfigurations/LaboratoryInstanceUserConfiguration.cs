using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using MobyLabWebProgramming.Core.Entities;

namespace MobyLabWebProgramming.Infrastructure.EntityConfigurations;

/// <summary>
/// This is the entity configuration for the Subject entity.
/// </summary>
public class LaboratoryInstanceUserConfiguration : IEntityTypeConfiguration<LaboratoryInstanceUser>
{
    public void Configure(EntityTypeBuilder<LaboratoryInstanceUser> builder)
    {
        builder.Property(e => e.Id)
            .IsRequired();
        builder.HasKey(x => x.Id);
        builder.Property(e => e.CreatedAt)
            .IsRequired();
        builder.Property(e => e.UpdatedAt)
            .IsRequired();

        builder.HasOne(e => e.LaboratoryInstance)
            .WithMany(l => l.LaboratoryInstanceUsers)
            .HasForeignKey(e => e.LaboratoryInstanceId);

        builder.HasOne(e => e.User)
            .WithMany(l => l.LaboratoryInstanceUsers)
            .HasForeignKey(e => e.UserId);
    }
}
