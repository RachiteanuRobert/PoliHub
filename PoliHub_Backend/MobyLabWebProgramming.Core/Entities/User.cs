﻿using MobyLabWebProgramming.Core.Enums;

namespace MobyLabWebProgramming.Core.Entities;

/// <summary>
/// This is an example for a user entity, it will be mapped to a single table and each property will have it's own column except for entity object references also known as navigation properties.
/// </summary>
public class User : BaseEntity
{
    public string Name { get; set; } = default!;
    public string Email { get; set; } = default!;
    public string Password { get; set; } = default!;
    public UserRoleEnum Role { get; set; } = default!;
    public string Group { get; set; } = default!;

    /// <summary>
    /// References to other entities such as this are used to automatically fetch correlated data, this is called a navigation property.
    /// Collection such as this can be used for Many-To-One or Many-To-Many relations.
    /// Note that this field will be null if not explicitly requested via a Include query, also note that the property is used by the ORM, in the database this collection doesn't exist. 
    /// </summary>
    public ICollection<UserFile> UserFiles { get; set; } = default!;
    public ICollection<Course> Courses { get; set; } = default!;
    public ICollection<Laboratory> Laboratories { get; set; } = default!;
<<<<<<< HEAD
=======
    public ICollection<Subject> Subjects { get; set; } = default!;
>>>>>>> parent of b670fb9 (ERROR_DESTROYED_MERGE_TABLE)
    public ICollection<LaboratoryInstance> LaboratoryInstances { get; set; } = default!;
    public ICollection<CourseInstance> CourseInstances { get; set; } = default!;
}
