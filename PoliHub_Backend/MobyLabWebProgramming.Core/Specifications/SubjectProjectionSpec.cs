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
        Professor = e.Professor,
        Department = e.Department,
        CreditsNo = e.CreditsNo,
        Description = e.Description,
        /*
        Course = new CourseSimpleDTO
        {
            Id = e.Course.Id,
            StartTime = e.Course.StartTime,
            Duration = e.Course.Duration,
            Location = e.Course.Location,
            SubjectId = e.Id
        },*/
        
        Laboratories = (ICollection<LaboratorySimpleDTO>)e.Laboratories.Select(l => new LaboratorySimpleDTO
        {
            Id = l.Id,
            StartTime = l.StartTime,
            Duration = l.Duration,
            Location = l.Location,
            AssistantName = l.AssistantName,
            SubjectId = e.Id,
        })
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
            .Include(e => e.Laboratories)
            .Where(e => EF.Functions.ILike(e.Name, searchExpr));
    }
}
