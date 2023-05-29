using MobyLabWebProgramming.Core.Entities;

namespace MobyLabWebProgramming.Core.DataTransferObjects;

/// <summary>
/// This DTO is used to update a user, the properties besides the id are nullable to indicate that they may not be updated if they are null.
/// </summary>
public record SubjectUpdateDTO(Guid Id, string? Name = null, char? Year = null, char? Semester = null,
    string? Department = null, string? Description = null, char? CreditsNo = null, ICollection<SubjectUser> SubjectUsers = null);
