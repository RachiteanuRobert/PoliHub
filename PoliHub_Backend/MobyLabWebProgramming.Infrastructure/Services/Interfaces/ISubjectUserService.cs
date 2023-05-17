using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Requests;
using MobyLabWebProgramming.Core.Responses;

namespace MobyLabWebProgramming.Infrastructure.Services.Interfaces;

public interface ISubjectUserService
{
    public Task<ServiceResponse<SubjectUserDTO>> GetSubjectUserById(Guid id, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> AddSubjectUser(Guid subjectId, Guid userId, UserDTO? requestingUser, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> DeleteSubjectUser(Guid id, UserDTO? requestingUser = default, CancellationToken cancellationToken = default);
}