﻿using MobyLabWebProgramming.Core.Entities;
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
    public ICollection<CourseSimpleDTO> CourseUsers { get; set; } = default!;
    public ICollection<LaboratorySimpleDTO> LaboratoryUsers { get; set; } = default!;
    public ICollection<SubjectSimpleDTO> SubjectUsers { get; set; } = default!;
    public ICollection<LaboratoryInstanceSimpleDTO> LaboratoryInstanceUsers { get; set; } = default!;
    public ICollection<CourseInstanceSimpleDTO> CourseInstanceUsers { get; set; } = default!;
}
