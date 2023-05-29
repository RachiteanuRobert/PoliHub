using MobyLabWebProgramming.Core.Enums;

namespace MobyLabWebProgramming.Core.Entities;

/// <summary>
/// This is an example for a Laboratory entity, it will be mapped to a single table and each property will have it's own column except for entity object references also known as navigation properties.
/// </summary>
public class Laboratory : BaseEntity
{
    public string AssistantName { get; set; } = default!;
    public string StartTime { get; set; } = default!;
    public int Duration { get; set; } = default!;
    public string Location { get; set; } = default!;
    public int DayOfWeek { get; set; } = default!; 
    public Course Course { get; set; } = default!;
    public Guid CourseId { get; set; } = default!;
    public ICollection<LaboratoryInstance> LaboratoryInstances { get; set; } = default!;
    public ICollection<LaboratoryUser> LaboratoryUsers { get; set; } = default!;
}
