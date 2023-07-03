using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Requests;
using MobyLabWebProgramming.Core.Responses;

namespace MobyLabWebProgramming.Infrastructure.Services.Interfaces;

public interface ICourseInstanceService
{
    public Task<ServiceResponse<CourseInstanceDTO>> GetCourseInstance(Guid id, CancellationToken cancellationToken = default);
    public Task<ServiceResponse<PagedResponse<CourseInstanceDTO>>> GetCourseInstances(PaginationSearchQueryParams pagination, CancellationToken cancellationToken = default);
    public Task<ServiceResponse<Boolean>> GetIsUserInCourseInstance(Guid courseInstanceId, Guid userId, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> AddUserToCourseInstance(UserToCourseInstanceAddDTO userCourseInstanceIds, UserDTO? requestingUser, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> AddCourseInstance(CourseInstanceAddDTO courseInstance, UserDTO? requestingUser = default, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> UpdateCourseInstance(CourseInstanceUpdateDTO courseInstance, UserDTO? requestingUser = default, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> DeleteCourseInstance(Guid id, UserDTO? requestingUser = default, CancellationToken cancellationToken = default);
}