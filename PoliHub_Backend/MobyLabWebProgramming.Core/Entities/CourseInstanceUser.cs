using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Enums;

namespace MobyLabWebProgramming.Core.Entities;

/// <summary>
/// This is an example for a subject entity, it will be mapped to a single table and each property will have it's own column except for entity object references also known as navigation properties.
/// </summary>
public class CourseInstanceUser : BaseEntity
{
    public Guid CourseInstanceId { get; set; } = default!;
    public Guid UserId { get; set; } = default!;

    public CourseInstance CourseInstance { get; set; } = default!;
    public User User { get; set; } = default!;
}
