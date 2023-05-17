using MobyLabWebProgramming.Core.Entities;
using MobyLabWebProgramming.Core.Enums;

namespace MobyLabWebProgramming.Core.DataTransferObjects;

/// <summary>
/// This DTO is used to transfer information about a user within the application and to client application.
/// Note that it doesn't contain a password property and that is why you should use DTO rather than entities to use only the data that you need or protect sensible information.
/// </summary>
public class CourseSimpleDTO
{
    public Guid Id { get; set; }
    public int StartTime { get; set; } = default!;
    public int Duration { get; set; } = default!;
    public string Location { get; set; } = default!;
<<<<<<< HEAD
=======
    public int DayOfWeek { get; set; } = default!;
>>>>>>> parent of b670fb9 (ERROR_DESTROYED_MERGE_TABLE)
    public Guid SubjectId { get; set; } = default!;
}
