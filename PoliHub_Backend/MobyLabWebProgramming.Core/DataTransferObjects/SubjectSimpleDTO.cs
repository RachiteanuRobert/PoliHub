using MobyLabWebProgramming.Core.Entities;
using MobyLabWebProgramming.Core.Enums;

namespace MobyLabWebProgramming.Core.DataTransferObjects;

/// <summary>
/// This DTO is used to transfer information about a user within the application and to client application.
/// Note that it doesn't contain a password property and that is why you should use DTO rather than entities to use only the data that you need or protect sensible information.
/// </summary>
public class SubjectSimpleDTO
{
    public Guid SubjectId { get; set; }
    public string Name { get; set; } = default!;
    public char Year { get; set; } = default!;
    public char Semester { get; set; } = default!;
    public string Department { get; set; } = default!;
    public char CreditsNo { get; set; } = default!;
    public string Description { get; set; } = default!;
}
