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
public sealed class CourseInstanceUserProjectionSpec : BaseSpec<CourseInstanceUserProjectionSpec, CourseInstanceUser, CourseInstanceUserDTO>
{
    /// <summary>
    /// Note that the specification projects the UserFile onto UserFileDTO together with the referenced User entity properties.
    /// </summary>
    protected override Expression<Func<CourseInstanceUser, CourseInstanceUserDTO>> Spec => e => new()
    {
        Id = e.Id,
        UserId = e.UserId,
        CourseInstanceId = e.CourseInstanceId,
        CourseInstance = new CourseInstanceSimpleDTO
        {
            Id = e.CourseInstance.Id,
            Name = e.CourseInstance.Name,
            CourseId = e.CourseInstance.CourseId,
            CourseInstanceDate = e.CourseInstance.CourseInstanceDate,
            Description = e.CourseInstance.Description,
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

    public CourseInstanceUserProjectionSpec(Guid id) : base(id)
    {
    }

    public CourseInstanceUserProjectionSpec(Guid userId, Guid courseInstanceId)
    {
        Query.Select(Derived.Spec).Where(e => e.UserId == userId && e.CourseInstanceId == courseInstanceId)
            .Include(e => e.CourseInstance)
            .Include(e => e.User);
    }

}
