﻿using System.Linq.Expressions;
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
        LaboratoryId = e.LaboratoryId,
        LaboratoryInstanceDate = e.LaboratoryInstanceDate,
        Students = (ICollection<Guid>)e.Students
    };

    public LaboratoryInstanceProjectionSpec(Guid id) : base(id)
    {
    }
}
