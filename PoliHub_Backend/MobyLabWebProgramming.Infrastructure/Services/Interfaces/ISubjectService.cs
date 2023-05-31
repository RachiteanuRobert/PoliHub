using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Requests;
using MobyLabWebProgramming.Core.Responses;

namespace MobyLabWebProgramming.Infrastructure.Services.Interfaces;

public interface ISubjectService
{
    public Task<ServiceResponse<SubjectDTO>> GetSubjectById(Guid id, CancellationToken cancellationToken = default);
    public Task<ServiceResponse<PagedResponse<SubjectDTO>>> GetSubjects(PaginationSearchQueryParams pagination, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> AddUserToSubject(UserToSubjectAddDTO userSubjectIds, UserDTO? requestingUser, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> AddSubject(SubjectAddDTO subject, UserDTO? requestingUser = default, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> UpdateSubject(SubjectUpdateDTO subject, UserDTO? requestingUser = default, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> DeleteSubject(Guid id, UserDTO? requestingUser = default, CancellationToken cancellationToken = default);
}