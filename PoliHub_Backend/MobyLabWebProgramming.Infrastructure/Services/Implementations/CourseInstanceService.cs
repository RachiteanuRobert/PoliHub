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
    
    public async Task<ServiceResponse<PagedResponse<CourseInstanceDTO>>> GetCourseInstances(PaginationSearchQueryParams pagination, CancellationToken cancellationToken)
    {
        var result = await _repository.PageAsync(pagination, new CourseInstanceProjectionSpec(pagination.Search), cancellationToken);

        return ServiceResponse<PagedResponse<CourseInstanceDTO>>.ForSuccess(result);
    }

    public async Task<ServiceResponse<Boolean>> GetIsUserInCourseInstance(Guid courseInstanceId, Guid userId, CancellationToken cancellationToken = default)
    {
        var resultCourseInstance = await _repository.GetAsync(new CourseInstanceSpec(courseInstanceId), cancellationToken);
        if (resultCourseInstance == null)
        {
            return ServiceResponse<Boolean>.FromError(new(HttpStatusCode.NotFound, "Course Instance not found!", ErrorCodes.EntityNotFound));
        }

        var resultCourseInstanceUser = await _repository.GetAsync(new CourseInstanceUserProjectionSpec(userId, courseInstanceId), cancellationToken);
        if (resultCourseInstanceUser != null)
        {
            return ServiceResponse<Boolean>.ForSuccess(true);
        }
        return ServiceResponse<Boolean>.ForSuccess(false);
    }

    public async Task<ServiceResponse> AddUserToCourseInstance(UserToCourseInstanceAddDTO userCourseInstanceIds, UserDTO? requestingUser, CancellationToken cancellationToken)
    {
        var courseInstance = await _repository.GetAsync(new CourseInstanceSpec(userCourseInstanceIds.CourseInstanceId), cancellationToken);
        if (courseInstance == null)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.NotFound, "Bad course instance id provided!", ErrorCodes.EntityNotFound));
        }

        var user = await _repository.GetAsync(new UserSpec(userCourseInstanceIds.UserId), cancellationToken);
        if (user == null)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.NotFound, "Bad user id provided!", ErrorCodes.EntityNotFound));
        }

        // Verify if user is enrolled
        var searchCourseInstanceUser = await _repository.GetAsync(new CourseInstanceUserProjectionSpec(userCourseInstanceIds.UserId, userCourseInstanceIds.CourseInstanceId), cancellationToken);
        if (searchCourseInstanceUser != null)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.NotFound, "User already enroled!", ErrorCodes.UserAlreadyExists));
        }

        CourseInstanceUser newCourseInstanceUser = new CourseInstanceUser
        {
            CourseInstance = courseInstance,
            User = user,
            CourseInstanceId = courseInstance.Id,
            UserId = user.Id,
        };

        await _repository.AddAsync(newCourseInstanceUser);

        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse> AddCourseInstance(CourseInstanceAddDTO courseInstance, UserDTO? requestingUser, CancellationToken cancellationToken)
    {
        if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin) // Verify who can add the user, you can change this however you se fit.
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the admin can add course instances!", ErrorCodes.CannotAdd));
        }

        var result = await _repository.GetAsync(new CourseInstanceProjectionSpec(courseInstance.Name), cancellationToken);
        if (result != null)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.NotFound, "Course Instance already exists!", ErrorCodes.CannotAdd));
        }


        await _repository.AddAsync(new CourseInstance
        {
            CourseId = courseInstance.CourseId,
            Name = courseInstance.Name,
            Description = courseInstance.Description,
            CourseInstanceDate = courseInstance.CourseInstanceDate,
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

        /*
        var Users = new List<User>();
        var Course = new Course();

        if (courseInstance.Users != null)
        {
            foreach (Guid id in courseInstance.Users)
            {
                var user = await _repository.GetAsync(new UserSpec(id), cancellationToken);
                if (user == null)
                {
                    return ServiceResponse.FromError(new(HttpStatusCode.NotFound, "Bad user id provided", ErrorCodes.EntityNotFound));
                }
                Users.Add(user);
            }
        }

        Course = await _repository.GetAsync(new CourseSpec(courseInstance.CourseId), cancellationToken);
        if (Course == null)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.NotFound, "Bad course id provided", ErrorCodes.EntityNotFound));
        }
        */


        if (entity != null)
        {
            entity.CourseId = courseInstance.CourseId;
            entity.Name = courseInstance.Name;
            entity.Description = courseInstance.Description;
            entity.CourseInstanceDate = courseInstance.CourseInstanceDate;
            //entity.Users = courseInstance.Users == null ? entity.Users : Users;

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
