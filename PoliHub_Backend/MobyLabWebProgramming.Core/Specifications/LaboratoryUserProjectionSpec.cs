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
public sealed class LaboratoryUserProjectionSpec : BaseSpec<LaboratoryUserProjectionSpec, LaboratoryUser, LaboratoryUserDTO>
{
    /// <summary>
    /// Note that the specification projects the UserFile onto UserFileDTO together with the referenced User entity properties.
    /// </summary>
    protected override Expression<Func<LaboratoryUser, LaboratoryUserDTO>> Spec => e => new()
    {
        Id = e.Id,
        UserId = e.UserId,
        LaboratoryId = e.LaboratoryId,
        Laboratory = new LaboratorySimpleDTO
        {
            Id = e.Laboratory.Id,
            AssistantName = e.Laboratory.AssistantName,
            StartTime = e.Laboratory.StartTime,
            Duration = e.Laboratory.Duration,
            Location = e.Laboratory.Location,
            DayOfWeek = e.Laboratory.DayOfWeek,
            CourseId = e.Laboratory.CourseId,
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

    public LaboratoryUserProjectionSpec(Guid id) : base(id)
    {
    }

    public LaboratoryUserProjectionSpec(Guid userId, Guid laboratoryId)
    {
        Query.Select(Derived.Spec).Where(e => e.UserId == userId && e.LaboratoryId == laboratoryId)
            .Include(e => e.Laboratory)
            .Include(e => e.User);
    }
}
