using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Requests;
using MobyLabWebProgramming.Core.Responses;

namespace MobyLabWebProgramming.Infrastructure.Services.Interfaces;

public interface ICourseService
{
    public Task<ServiceResponse<CourseDTO>> GetCourseById(Guid id, CancellationToken cancellationToken = default);
    public Task<ServiceResponse<CourseDTO>> GetCourseByName(string subjectName, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> AddCourse(CourseAddDTO course, UserDTO? requestingUser = default, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> UpdateCourse(CourseUpdateDTO course, UserDTO? requestingUser = default, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> DeleteCourse(Guid id, UserDTO? requestingUser = default, CancellationToken cancellationToken = default);
}