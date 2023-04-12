using System.Net;
using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Entities;
using MobyLabWebProgramming.Core.Enums;
using MobyLabWebProgramming.Core.Errors;
using MobyLabWebProgramming.Core.Requests;
using MobyLabWebProgramming.Core.Responses;
using MobyLabWebProgramming.Core.Specifications;
using MobyLabWebProgramming.Infrastructure.Database;
using MobyLabWebProgramming.Infrastructure.Repositories.Interfaces;
using MobyLabWebProgramming.Infrastructure.Services.Interfaces;

namespace MobyLabWebProgramming.Infrastructure.Services.Implementations;

public class CourseInstanceService : ICourseInstanceService
{
    private readonly IRepository<WebAppDatabaseContext> _repository;

    public CourseInstanceService(IRepository<WebAppDatabaseContext> repository)
    {
        _repository = repository;
    }

    public async Task<ServiceResponse<CourseInstanceDTO>> GetCourseInstance(Guid id, CancellationToken cancellationToken = default)
    {
        var result = await _repository.GetAsync(new CourseInstanceProjectionSpec(id), cancellationToken);

        return result != null ?
            ServiceResponse<CourseInstanceDTO>.ForSuccess(result) :
            ServiceResponse<CourseInstanceDTO>.FromError(new(HttpStatusCode.Forbidden, "Course Instance not found!", ErrorCodes.EntityNotFound));
    } 

    public async Task<ServiceResponse> AddCourseInstance(CourseInstanceAddDTO courseInstance, UserDTO? requestingUser, CancellationToken cancellationToken)
    {
        if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin) // Verify who can add the user, you can change this however you se fit.
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the admin can add course instances!", ErrorCodes.CannotAdd));
        }

        var result = await _repository.GetAsync(new LaboratoryInstanceProjectionSpec(courseInstance.CourseId), cancellationToken);
        if (result != null)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Course Instance already exists!", ErrorCodes.CannotAdd));
        }

        await _repository.AddAsync(new CourseInstance
        {
            CourseId = courseInstance.CourseId
        });

        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse> UpdateCourseInstance(CourseInstanceUpdateDTO courseInstance, UserDTO? requestingUser, CancellationToken cancellationToken)
    {
        if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the admin can update the courses!", ErrorCodes.CannotUpdate));
        }

        var entity = await _repository.GetAsync(new CourseInstanceSpec(courseInstance.Id), cancellationToken);

        if (entity != null)
        {
            entity.CourseId = courseInstance.CourseId;

            await _repository.UpdateAsync(entity, cancellationToken);
        }

        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse> DeleteCourseInstance(Guid id, UserDTO? requestingUser, CancellationToken cancellationToken)
    {
        if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the admin can delete a course instance!", ErrorCodes.CannotDelete));
        }
        await _repository.DeleteAsync<CourseInstance>(id, cancellationToken);

        return ServiceResponse.ForSuccess();
    }
}
