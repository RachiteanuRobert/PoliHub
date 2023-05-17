using System.Linq.Expressions;
using Ardalis.Specification;
using Microsoft.EntityFrameworkCore;
using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Entities;

namespace MobyLabWebProgramming.Core.Specifications;

/// <summary>
/// This is a specification to filter the user entities and map it to and UserDTO object via the constructors.
/// Note how the constructors call the base class's constructors. Also, this is a sealed class, meaning it cannot be further derived.
/// </summary>
public sealed class UserProjectionSpec : BaseSpec<UserProjectionSpec, User, UserDTO>
{
    /// <summary>
    /// This is the projection/mapping expression to be used by the base class to get UserDTO object from the database.
    /// </summary>
    protected override Expression<Func<User, UserDTO>> Spec => e => new()
    {
        Id = e.Id,
        Email = e.Email,
        Name = e.Name,
        Role = e.Role,
        Group = e.Group,
        Courses = e.Courses.Select(c => new CourseSimpleDTO
        {
            Id = c.Id,
            ProfessorName = c.ProfessorName,
            StartTime = c.StartTime,
            Duration = c.Duration,
            Location = c.Location,
            Series = c.Series,
            DayOfWeek = c.DayOfWeek,
            SubjectId =c.SubjectId
        }).ToList(),

        Subjects = e.Subjects.Select(s => new SubjectSimpleDTO
        {
            Id = s.Id,
            Name = s.Name,
            Year = s.Year,
            Semester = s.Semester,
            Department = s.Department,
            CreditsNo = s.CreditsNo,
            Description = s.Description
        }).ToList(),
        Laboratories = e.Laboratories.Select(l => new LaboratorySimpleDTO
        {
            Id = l.Id,
            AssistantName = l.AssistantName,
            StartTime = l.StartTime,
            Duration = l.Duration,
            Location = l.Location,
            DayOfWeek = l.DayOfWeek,
            CourseId = l.CourseId
        }).ToList()
    };

    public UserProjectionSpec(bool orderByCreatedAt = true) : base(orderByCreatedAt)
    {
    }

    public UserProjectionSpec(Guid id) : base(id)
    {
    }

    public UserProjectionSpec(string? search)
    {
        search = !string.IsNullOrWhiteSpace(search) ? search.Trim() : null;

        if (search == null)
        {
            return;
        }

        var searchExpr = $"%{search.Replace(" ", "%")}%";

        Query.Where(e => EF.Functions.ILike(e.Name, searchExpr)); // This is an example on who database specific expressions can be used via C# expressions.
                                                                                           // Note that this will be translated to the database something like "where user.Name ilike '%str%'".
    }
}
