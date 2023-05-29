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
public sealed class LaboratoryInstanceProjectionSpec : BaseSpec<LaboratoryInstanceProjectionSpec, LaboratoryInstance, LaboratoryInstanceDTO>
{
    /// <summary>
    /// Note that the specification projects the UserFile onto UserFileDTO together with the referenced User entity properties.
    /// </summary>
    protected override Expression<Func<LaboratoryInstance, LaboratoryInstanceDTO>> Spec => e => new()
    {
        Id = e.Id,
        Name = e.Name,
        Description = e.Description,
        LaboratoryId = e.LaboratoryId,
        LaboratoryInstanceDate = e.LaboratoryInstanceDate,
        LaboratoryInstanceUsers = e.LaboratoryInstanceUsers.Select(u => new JoinUserSimpleDTO
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

    public LaboratoryInstanceProjectionSpec(Guid id) : base(id)
    {
    }

    public LaboratoryInstanceProjectionSpec(string? search)
    {
        search = !string.IsNullOrWhiteSpace(search) ? search.Trim() : null;

        if (search == null)
        {
            return;
        }

        var searchExpr = $"%{search.Replace(" ", "%")}%";

        Query
            .Include(e => e.LaboratoryInstanceUsers)
            .Where(e => EF.Functions.ILike(e.Name, searchExpr));
    }
}
