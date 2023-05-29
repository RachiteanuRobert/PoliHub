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
public sealed class SubjectProjectionSpec : BaseSpec<SubjectProjectionSpec, Subject, SubjectDTO>
{
    /// <summary>
    /// Note that the specification projects the UserFile onto UserFileDTO together with the referenced User entity properties.
    /// </summary>
    protected override Expression<Func<Subject, SubjectDTO>> Spec => e => new()
    {
        Id = e.Id,
        Name = e.Name,
        Year = e.Year,
        Semester = e.Semester,
        Department = e.Department,
        CreditsNo = e.CreditsNo,
        Description = e.Description,

        Courses = e.Courses.Select(c => new CourseSimpleDTO
        {
            Id = c.Id,
            ProfessorName = c.ProfessorName,
            StartTime = c.StartTime,
            Duration = c.Duration,
            Location = c.Location,
            Series = c.Series,
            DayOfWeek = c.DayOfWeek,
            SubjectId = e.Id
        }).ToList(),

        SubjectUsers = e.SubjectUsers.Select(u => new JoinUserSimpleDTO
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
    };

    public SubjectProjectionSpec(Guid id) : base(id)
    {
    }

    public SubjectProjectionSpec(string? search)
    {
        search = !string.IsNullOrWhiteSpace(search) ? search.Trim() : null;

        if (search == null)
        {
            return;
        }

        var searchExpr = $"%{search.Replace(" ", "%")}%";

        Query
            .Where(e => EF.Functions.ILike(e.Name, searchExpr));
    }
}
