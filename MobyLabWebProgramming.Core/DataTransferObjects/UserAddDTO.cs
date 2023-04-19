using MobyLabWebProgramming.Core.Enums;

namespace MobyLabWebProgramming.Core.DataTransferObjects;

/// <summary>
/// This DTO is used to add a user, note that it doesn't have an id property because the id for the user entity should be added by the application.
/// </summary>
public class UserAddDTO
{
    public string Name { get; set; } = default!;
    public string Email { get; set; } = default!;
    public string Password { get; set; } = default!;
    public UserRoleEnum Role { get; set; } = default!;
    public ICollection<Guid> Laboratories { get; set; } = default!;
    public ICollection<Guid> Courses { get; set; } = default!;
    public ICollection<Guid> LaboratoryInstances { get; set; } = default!;
    public ICollection<Guid> CourseInstances { get; set; } = default!;
}
