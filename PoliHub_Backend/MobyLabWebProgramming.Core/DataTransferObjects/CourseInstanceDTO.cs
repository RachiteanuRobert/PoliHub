using MobyLabWebProgramming.Core.Enums;

namespace MobyLabWebProgramming.Core.DataTransferObjects;

/// <summary>
/// This DTO is used to transfer information about a user within the application and to client application.
/// Note that it doesn't contain a password property and that is why you should use DTO rather than entities to use only the data that you need or protect sensible information.
/// </summary>
public class CourseInstanceDTO
{
    public Guid Id { get; set; }
    public Guid CourseId { get; set; } = default!;
    public DateTime CourseInstanceDate { get; set; } = default!;

    public ICollection<UserSimpleDTO> Students { get; set; } = default!;
}
