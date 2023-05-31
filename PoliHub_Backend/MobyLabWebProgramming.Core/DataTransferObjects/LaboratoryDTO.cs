using MobyLabWebProgramming.Core.Entities;
using MobyLabWebProgramming.Core.Enums;

namespace MobyLabWebProgramming.Core.DataTransferObjects;

/// <summary>
/// This DTO is used to transfer information about a user within the application and to client application.
/// Note that it doesn't contain a password property and that is why you should use DTO rather than entities to use only the data that you need or protect sensible information.
/// </summary>
public class LaboratoryDTO
{
    public string AssistantName { get; set; } = default!;
    public Guid Id { get; set; }
    public string StartTime { get; set; } = default!;
    public int Duration { get; set; } = default!;
    public string Location { get; set; } = default!;
    public int DayOfWeek { get; set; } = default!;
    public Guid CourseId { get; set; } = default!;
    //public course course { get; set; } = default!;
    public ICollection<LaboratoryInstanceSimpleDTO> LaboratoryInstances { get; set; } = default!;
    public ICollection<UserSimpleDTO> LaboratoryUsers { get; set; } = default!;
}
