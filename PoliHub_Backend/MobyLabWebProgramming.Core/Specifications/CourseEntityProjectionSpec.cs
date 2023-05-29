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
public sealed class CourseEntityProjectionSpec : BaseSpec<CourseEntityProjectionSpec, Course, Course>
{
    /// <summary>
    /// Note that the specification projects the UserFile onto UserFileDTO together with the referenced User entity properties.
    /// </summary>
    protected override Expression<Func<Course, Course>> Spec => e => new()
    {
        Id = e.Id,
        ProfessorName = e.ProfessorName,
        StartTime = e.StartTime,
        Duration = e.Duration,
        Location = e.Location,
        Series = e.Series,
        DayOfWeek = e.DayOfWeek,
        SubjectId = e.SubjectId,
        Subject = e.Subject,
        CourseUsers = e.CourseUsers,
        CourseInstances = e.CourseInstances,
        Laboratories = e.Laboratories
    };

    public CourseEntityProjectionSpec(Guid id) : base(id)
    {
    }
    public CourseEntityProjectionSpec(string? search)
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
            .Include(e => e.Laboratories)
            .Where(e => EF.Functions.ILike(e.ProfessorName, searchExpr));
    }
}
