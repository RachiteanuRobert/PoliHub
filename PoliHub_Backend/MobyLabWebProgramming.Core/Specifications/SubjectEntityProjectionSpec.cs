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
public sealed class SubjectEntityProjectionSpec : BaseSpec<SubjectEntityProjectionSpec, Subject, SubjectDTO>
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
            DayOfWeek = c.DayOfWeek,
            Series = c.Series,
            SubjectId = c.SubjectId,

        }).ToList(),
        SubjectUsers = e.SubjectUsers.Select(su => new JoinUserSimpleDTO
        {
            
            User = new UserSimpleDTO 
            {
                Id = su.User.Id,
                Name = su.User.Name,
                Email = su.User.Email,
                Role = su.User.Role,
                Group = su.User.Group
            }

        }).ToList()
    };

    public SubjectEntityProjectionSpec(Guid id) : base(id)
    {
    }
    public SubjectEntityProjectionSpec(string? search)
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
