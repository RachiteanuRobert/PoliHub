using System.Linq.Expressions;
using Ardalis.Specification;
using Ardalis.Specification.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Entities;

namespace MobyLabWebProgramming.Core.Specifications;

/// <summary>
/// This is a specification to filter the user file entities and map it to and UserFileDTO object via the constructors.
/// Note how the constructors call the base class's constructors. Also, this is a sealed class, meaning it cannot be further derived.
/// </summary>
public sealed class CourseUserProjectionSpec : BaseSpec<CourseUserProjectionSpec, CourseUser, CourseUserDTO>
{
    /// <summary>
    /// Note that the specification projects the UserFile onto UserFileDTO together with the referenced User entity properties.
    /// </summary>
    protected override Expression<Func<CourseUser, CourseUserDTO>> Spec => e => new()
    {
        Id = e.Id,
        UserId = e.UserId,
        CourseId = e.CourseId,
        Course = new CourseSimpleDTO
        {
            Id = e.Course.Id,
            ProfessorName = e.Course.ProfessorName,
            StartTime = e.Course.StartTime,
            Duration = e.Course.Duration,
            Location = e.Course.Location,
            DayOfWeek = e.Course.DayOfWeek,
            SubjectId = e.Course.SubjectId,
        },
        User = new UserSimpleDTO
        {
            Id = e.User.Id,
            Name = e.User.Name,
            Email = e.User.Email,
            Role = e.User.Role,
            Group = e.User.Group
        }
        
    };

    public CourseUserProjectionSpec(Guid id) : base(id)
    {
    }

    public CourseUserProjectionSpec(Guid userId, Guid courseId)
    {
        Query.Select(Derived.Spec).Where(e => e.UserId == userId && e.CourseId == courseId)
            .Include(e => e.Course)
            .Include(e => e.User);
    }
}
