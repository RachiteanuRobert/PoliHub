using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using MobyLabWebProgramming.Core.Entities;

namespace MobyLabWebProgramming.Infrastructure.EntityConfigurations;

/// <summary>
/// This is the entity configuration for the Subject entity.
/// </summary>
public class SubjectConfiguration : IEntityTypeConfiguration<Subject>
{
    public void Configure(EntityTypeBuilder<Subject> builder)
    {
        builder.Property(e => e.SubjectId)
            .IsRequired();
        builder.HasKey(x => x.SubjectId);         
        builder.Property(e => e.Name)
            .HasMaxLength(255)
            .IsRequired();
        builder.Property(e => e.Year)
            .HasMaxLength(5)
            .IsRequired();
        builder.Property(e => e.Semester)
            .HasMaxLength(5)
            .IsRequired();
        builder.Property(e => e.Department)
            .HasMaxLength(5)
            .IsRequired();
        builder.Property(e => e.CreditsNo)
            .HasMaxLength(5)
            .IsRequired();
        builder.Property(e => e.Description)
            .HasMaxLength(300)
            .IsRequired(false); // This specifies that this column can be null in the database.
        builder.Property(e => e.CreatedAt)
            .IsRequired();
        builder.Property(e => e.UpdatedAt)
            .IsRequired();

        builder.HasMany(e => e.Students)
            .WithMany(l => l.Subjects)
            .UsingEntity(j => j.ToTable("SubjectsStudents"));

        builder.HasMany(s => s.SubjectUsers)
             .WithOne(e => e.Subject)
             .HasForeignKey(s => s.Id)
             .HasPrincipalKey(e => e.SubjectId)
            .IsRequired();
    }
}
