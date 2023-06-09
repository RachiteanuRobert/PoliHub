﻿using MobyLabWebProgramming.Core.Entities;
using MobyLabWebProgramming.Core.Enums;

namespace MobyLabWebProgramming.Core.DataTransferObjects;

/// <summary>
/// This DTO is used to transfer information about a user within the application and to client application.
/// Note that it doesn't contain a password property and that is why you should use DTO rather than entities to use only the data that you need or protect sensible information.
/// </summary>
public class LaboratoryInstanceAddDTO
{
    public Guid LaboratoryId { get; set; } = default!;
    public DateOnly LaboratoryInstanceDate { get; set; } = default!;
    public ICollection<Guid> Students { get; set; } = default!;
}
