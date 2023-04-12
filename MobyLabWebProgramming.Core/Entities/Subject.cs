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

    public Course Course { get; set; } = default!;

    public ICollection<Laboratory> Laboratories { get; set; } = default!;

   // public ICollection<User> Students { get; set; } = default!;

    /// <summary>
    /// References to other entities such as this are used to automatically fetch correlated data, this is called a navigation property.
    /// Collection such as this can be used for Many-To-One or Many-To-Many relations.
    /// Note that this field will be null if not explicitly requested via a Include query, also note that the property is used by the ORM, in the database this collection doesn't exist. 
    /// </summary>
}
