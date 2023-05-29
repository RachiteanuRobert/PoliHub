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
        SubjectUsers = e.SubjectUsers.Select(u => new JoinUserSimpleSubjectDTO
        {
            Id = u.Id,
            SubjectId = u.SubjectId,
            Subject = new SubjectSimpleDTO
            {
                Id = u.Subject.Id,
                Name = u.Subject.Name,
                Semester = u.Subject.Semester,
                Year = u.Subject.Year,
                Department = u.Subject.Department,
                CreditsNo = u.Subject.CreditsNo,
                Description = u.Subject.Description
            }
        }).ToList(),
        CourseUsers = e.CourseUsers.Select(u => new JoinUserSimpleCourseDTO
        {
            Id = u.Id,
            CourseId = u.CourseId,
            Course = new CourseSimpleDTO
            {
                Id = u.Course.Id,
                ProfessorName = u.Course.ProfessorName,
                StartTime = u.Course.StartTime,
                Duration = u.Course.Duration,
                Location = u.Course.Location,
                Series = u.Course.Series,
                DayOfWeek = u.Course.DayOfWeek,
                SubjectId = u.Course.SubjectId,
            }
        }).ToList(),
        LaboratoryUsers = e.LaboratoryUsers.Select(u => new JoinUserSimpleLaboratoryDTO
        {
            Id = u.Id,
            LaboratoryId = u.LaboratoryId,
            Laboratory = new LaboratorySimpleDTO
            {
                Id = u.Laboratory.Id,
                AssistantName = u.Laboratory.AssistantName,
                StartTime = u.Laboratory.StartTime,
                Duration = u.Laboratory.Duration,
                Location = u.Laboratory.Location,
                DayOfWeek = u.Laboratory.DayOfWeek,
                CourseId = u.Laboratory.CourseId,
            }
        }).ToList(),
        CourseInstanceUsers = e.CourseInstanceUsers.Select(u => new JoinUserSimpleCourseInstanceDTO
        {
            Id = u.Id,
            CourseInstanceId = u.CourseInstanceId,
            CourseInstance = new CourseInstanceSimpleDTO
            {
                Id = u.CourseInstance.Id,
                CourseId = u.CourseInstance.CourseId,
                Name = u.CourseInstance.Name,
                Description = u.CourseInstance.Description,
                CourseInstanceDate = u.CourseInstance.CourseInstanceDate,
            }
        }).ToList(),
        LaboratoryInstanceUsers = e.LaboratoryInstanceUsers.Select(u => new JoinUserSimpleLaboratoryInstanceDTO
        {
            Id = u.Id,
            LaboratoryInstanceId = u.LaboratoryInstanceId,
            LaboratoryInstance = new LaboratoryInstanceSimpleDTO
            {
                Id = u.LaboratoryInstance.Id,
                LaboratoryId = u.LaboratoryInstance.LaboratoryId,
                Name = u.LaboratoryInstance.Name,
                Description = u.LaboratoryInstance.Description,
                LaboratoryInstanceDate = u.LaboratoryInstance.LaboratoryInstanceDate,
            }
        }).ToList(),
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
