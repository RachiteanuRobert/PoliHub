using MobyLabWebProgramming.Core.Enums;

namespace MobyLabWebProgramming.Core.Entities;

/// <summary>
/// This is an example for a Laboratory entity, it will be mapped to a single table and each property will have it's own column except for entity object references also known as navigation properties.
/// </summary>
public class Laboratory : BaseEntity
{
    public int StartTime { get; set; } = default!;
    public int Duration { get; set; } = default!;
    public string Location { get; set; } = default!;
    public string AssistantName { get; set; } = default!;
    public Subject Subject { get; set; } = default!;
    public Guid SubjectId { get; set; } = default!;
    public ICollection<LaboratoryInstance> LaboratoryInstances { get; set; } = default!;
    public ICollection<User> Students { get; set; } = default!;
}
