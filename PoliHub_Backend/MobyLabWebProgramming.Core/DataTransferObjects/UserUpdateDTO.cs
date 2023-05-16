namespace MobyLabWebProgramming.Core.DataTransferObjects;

/// <summary>
/// This DTO is used to update a user, the properties besides the id are nullable to indicate that they may not be updated if they are null.
/// </summary>
public record UserUpdateDTO(Guid Id, string? Name = default, string? Password = default, string? Group = default);
/*    ICollection<Guid>? Laboratories = null,
    ICollection<Guid>? Courses = null,
    ICollection<Guid>? Subjects = null,
    ICollection<Guid>? LaboratoryInstances = null,
    ICollection<Guid>? CourseInstances = null*/