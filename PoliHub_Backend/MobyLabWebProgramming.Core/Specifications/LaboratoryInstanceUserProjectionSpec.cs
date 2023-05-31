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
public sealed class LaboratoryInstanceUserProjectionSpec : BaseSpec<LaboratoryInstanceUserProjectionSpec, LaboratoryInstanceUser, LaboratoryInstanceUserDTO>
{
    /// <summary>
    /// Note that the specification projects the UserFile onto UserFileDTO together with the referenced User entity properties.
    /// </summary>
    protected override Expression<Func<LaboratoryInstanceUser, LaboratoryInstanceUserDTO>> Spec => e => new()
    {
        Id = e.Id,
        UserId = e.UserId,
        LaboratoryInstanceId = e.LaboratoryInstanceId,
        LaboratoryInstance = new LaboratoryInstanceSimpleDTO
        {
            Id = e.LaboratoryInstance.Id,
            Name = e.LaboratoryInstance.Name,
            LaboratoryId = e.LaboratoryInstance.LaboratoryId,
            LaboratoryInstanceDate = e.LaboratoryInstance.LaboratoryInstanceDate,
            Description = e.LaboratoryInstance.Description,
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

    public LaboratoryInstanceUserProjectionSpec(Guid id) : base(id)
    {
    }

    public LaboratoryInstanceUserProjectionSpec(Guid userId, Guid laboratoryInstanceId)
    {
        Query.Select(Derived.Spec).Where(e => e.UserId == userId && e.LaboratoryInstanceId == laboratoryInstanceId)
            .Include(e => e.LaboratoryInstance)
            .Include(e => e.User);
    }

}
