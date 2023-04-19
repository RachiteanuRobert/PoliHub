using MobyLabWebProgramming.Core.Entities;

namespace MobyLabWebProgramming.Core.DataTransferObjects;

/// <summary>
/// This DTO is used to update a user, the properties besides the id are nullable to indicate that they may not be updated if they are null.
/// </summary>
public record CourseUpdateDTO(Guid Id, int? StartTime = null, int? Duration = null, string? Location = null,
    Guid? SubjectId = null, ICollection<Guid>? CourseInstances = null, ICollection<Guid>? Students = null);
