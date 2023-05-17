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
public sealed class SubjectEntityProjectionSpec : BaseSpec<SubjectEntityProjectionSpec, Subject, Subject>
{
    /// <summary>
    /// Note that the specification projects the UserFile onto UserFileDTO together with the referenced User entity properties.
    /// </summary>
    protected override Expression<Func<Subject, Subject>> Spec => e => new()
    {
        SubjectId = e.SubjectId,
        Name = e.Name,
        Year = e.Year,
        Semester = e.Semester,
        Department = e.Department,
        CreditsNo = e.CreditsNo,
        Description = e.Description,
        Courses = e.Courses,
        Students = e.Students
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
