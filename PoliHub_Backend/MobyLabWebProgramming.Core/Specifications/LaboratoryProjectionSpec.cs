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
public sealed class LaboratoryProjectionSpec : BaseSpec<LaboratoryProjectionSpec, Laboratory, LaboratoryDTO>
{
    /// <summary>
    /// Note that the specification projects the UserFile onto UserFileDTO together with the referenced User entity properties.
    /// </summary>
    protected override Expression<Func<Laboratory, LaboratoryDTO>> Spec => e => new()
    {
        Id = e.Id,
        StartTime = e.StartTime,
        Duration = e.Duration,
        Location = e.Location,
        AssistantName = e.AssistantName,
        DayOfWeek = e.DayOfWeek,
        CourseId = e.CourseId
        /*
        Students = (ICollection<Guid>)e.Students,
        LaboratoryInstances = (ICollection<Guid>)e.LaboratoryInstances
        */
    };

    public LaboratoryProjectionSpec(Guid id) : base(id)
    {
    }

    public LaboratoryProjectionSpec(string? search)
    {
        search = !string.IsNullOrWhiteSpace(search) ? search.Trim() : null;

        if (search == null)
        {
            return;
        }

        var searchExpr = $"%{search.Replace(" ", "%")}%";

        Query
            .Include(e => e.LaboratoryInstances)
            .Include(e => e.Students)
            .Where(e => EF.Functions.ILike(e.AssistantName, searchExpr));
    }
}
