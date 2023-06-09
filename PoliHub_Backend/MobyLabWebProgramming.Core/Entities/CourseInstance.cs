﻿using MobyLabWebProgramming.Core.Enums;

namespace MobyLabWebProgramming.Core.Entities;

/// <summary>
/// This is an example for a Laboratory entity, it will be mapped to a single table and each property will have it's own column except for entity object references also known as navigation properties.
/// </summary>
public class CourseInstance : BaseEntity
{
    public Course Course { get; set; } = default!;
    public Guid CourseId { get; set; } = default!;
    public DateOnly CourseInstanceDate { get; set; } = default!;
    public ICollection<User> Students { get; set; } = default!;

}
