using System.Linq.Expressions;
using Ardalis.Specification;
using Microsoft.EntityFrameworkCore;
using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Entities;

namespace MobyLabWebProgramming.Core.Specifications;

/// <summary>
/// This is a specification to filter the user file entities and map it to and UserFileDTO object via the constructors.
/// Note how the constructors call the base class's constructors. Also, this is a sealed class, meaning it cannot be further derived.
/// </summary>
public sealed class CourseProjectionSpec : BaseSpec<CourseProjectionSpec, Course, CourseDTO>
{
    /// <summary>
    /// Note that the specification projects the UserFile onto UserFileDTO together with the referenced User entity properties.
    /// </summary>
    protected override Expression<Func<Course, CourseDTO>> Spec => e => new()
    {
        Id = e.Id,
        ProfessorName = e.ProfessorName,
        StartTime = e.StartTime,
        Duration = e.Duration,
        Location = e.Location,
        Series = e.Series,
        DayOfWeek = e.DayOfWeek,
        SubjectId = e.SubjectId,
        CourseUsers = e.CourseUsers.Select(u => new JoinUserSimpleDTO
        {
            Id = u.Id,
            UserId = u.UserId,
            User = new UserSimpleDTO
            {
                Id = u.User.Id,
                Name = u.User.Name,
                Email = u.User.Email,
                Role = u.User.Role,
                Group = u.User.Group
            }
        }).ToList(),
        /*
        CourseInstances = (ICollection<Guid>)e.CourseInstances
        */
    };

    public CourseProjectionSpec(Guid id) : base(id)
    {
    }
    public CourseProjectionSpec(string? search)
    {
        search = !string.IsNullOrWhiteSpace(search) ? search.Trim() : null;

        if (search == null)
        {
            return;
        }

        var searchExpr = $"%{search.Replace(" ", "%")}%";

        Query
            .Include(e => e.CourseInstances)
            .Include(e => e.CourseUsers)
            .Where(e => EF.Functions.ILike(e.ProfessorName, searchExpr));
    }
}
