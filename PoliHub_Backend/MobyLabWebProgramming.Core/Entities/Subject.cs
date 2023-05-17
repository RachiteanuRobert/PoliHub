using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Enums;

namespace MobyLabWebProgramming.Core.Entities;

/// <summary>
/// This is an example for a subject entity, it will be mapped to a single table and each property will have it's own column except for entity object references also known as navigation properties.
/// </summary>
public class Subject : BaseEntity
{
    public string Name { get; set; } = default!;
    public char Year { get; set; } = default!;
    public string Professor { get; set; } = default!;
    public string Department { get; set; } = default!;
    public char CreditsNo { get; set; } = default!;
    public string Description { get; set; } = default!;
<<<<<<< HEAD
    public Course Course { get; set; } = default!;
    public ICollection<Laboratory> Laboratories { get; set; } = default!;
=======
    public ICollection<Course> Courses { get; set; } = default!;
    public ICollection<User> Students { get; set; } = default!;
>>>>>>> parent of b670fb9 (ERROR_DESTROYED_MERGE_TABLE)
}
