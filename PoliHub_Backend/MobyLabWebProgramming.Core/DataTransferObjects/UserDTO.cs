using MobyLabWebProgramming.Core.Entities;
using MobyLabWebProgramming.Core.Enums;

namespace MobyLabWebProgramming.Core.DataTransferObjects;

/// <summary>
/// This DTO is used to transfer information about a user within the application and to client application.
/// Note that it doesn't contain a password property and that is why you should use DTO rather than entities to use only the data that you need or protect sensible information.
/// </summary>
public class UserDTO
{
    public Guid Id { get; set; }
    public string Name { get; set; } = default!;
    public string Email { get; set; } = default!;
    public UserRoleEnum Role { get; set; } = default!;
    public string Group { get; set; } = default!;
    public ICollection<CourseSimpleDTO> Courses { get; set; } = default!;
    public ICollection<LaboratorySimpleDTO> Laboratories { get; set; } = default!;
    public ICollection<SubjectSimpleDTO> Subjects { get; set; } = default!;
    public ICollection<LaboratoryInstanceDTO> LaboratoryInstances { get; set; } = default!;
    public ICollection<CourseInstanceDTO> CourseInstances { get; set; } = default!;
}
