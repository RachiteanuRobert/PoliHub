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
public sealed class SubjectUserProjectionSpec : BaseSpec<SubjectUserProjectionSpec, SubjectUser, SubjectUserDTO>
{
    /// <summary>
    /// Note that the specification projects the UserFile onto UserFileDTO together with the referenced User entity properties.
    /// </summary>
    protected override Expression<Func<SubjectUser, SubjectUserDTO>> Spec => e => new()
    {
        Id = e.Id,
        UserId = e.UserId,
        SubjectId = e.SubjectId,
        Subject = new SubjectSimpleDTO
        {
            SubjectId = e.Subject.SubjectId,
            Name = e.Subject.Name,
            Year = e.Subject.Year,
            Semester = e.Subject.Semester,
            Department = e.Subject.Department,
            CreditsNo = e.Subject.CreditsNo,
            Description = e.Subject.Description,
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

    public SubjectUserProjectionSpec(Guid id) : base(id)
    {
    }
}
