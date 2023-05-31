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

public class CourseService : ICourseService
{
    private readonly IRepository<WebAppDatabaseContext> _repository;

    public CourseService(IRepository<WebAppDatabaseContext> repository)
    {
        _repository = repository;
    }

    public async Task<ServiceResponse<CourseDTO>> GetCourseById(Guid id, CancellationToken cancellationToken = default)
    {
        var result = await _repository.GetAsync(new CourseProjectionSpec(id), cancellationToken);

        return result != null ?
            ServiceResponse<CourseDTO>.ForSuccess(result) :
            ServiceResponse<CourseDTO>.FromError(new(HttpStatusCode.Forbidden, "Course not found!", ErrorCodes.EntityNotFound));
    }

    public async Task<ServiceResponse<PagedResponse<CourseDTO>>> GetCourses(PaginationSearchQueryParams pagination, CancellationToken cancellationToken)
    {
        var result = await _repository.PageAsync(pagination, new CourseProjectionSpec(pagination.Search), cancellationToken);

        return ServiceResponse<PagedResponse<CourseDTO>>.ForSuccess(result);
    }

    public async Task<ServiceResponse<CourseDTO>> GetCourseByName(string subjectName, CancellationToken cancellationToken = default)
    {
        var result = await _repository.GetAsync(new CourseProjectionSpec(subjectName), cancellationToken);

        return result != null ?
            ServiceResponse<CourseDTO>.ForSuccess(result) :
            ServiceResponse<CourseDTO>.FromError(new(HttpStatusCode.Forbidden, "Course not found!", ErrorCodes.EntityNotFound));
    }

    public async Task<ServiceResponse> AddUserToCourse(UserToCourseAddDTO userCourseIds, UserDTO? requestingUser, CancellationToken cancellationToken)
    {

        if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the admin can add users!", ErrorCodes.CannotAdd));
        }

        var course = await _repository.GetAsync(new CourseSpec(userCourseIds.CourseId), cancellationToken);
        if (course == null)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Bad course Id provided!", ErrorCodes.EntityNotFound));
        }

        var user = await _repository.GetAsync(new UserSpec(userCourseIds.UserId), cancellationToken);
        if (user == null)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.NotFound, "Bad user id provided!", ErrorCodes.EntityNotFound));
        }

        // Verify if user is enrolled
        var searchCourseUser = await _repository.GetAsync(new CourseUserProjectionSpec(userCourseIds.UserId, userCourseIds.CourseId), cancellationToken);
        if (searchCourseUser != null)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.NotFound, "User already enroled!", ErrorCodes.UserAlreadyExists));
        }

        CourseUser newCourseUser = new CourseUser
        {
            Course = course,
            User = user ,
            CourseId = course.Id,
            UserId = user.Id,
        };

        await _repository.AddAsync(newCourseUser);

        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse> AddCourse(CourseAddDTO course, UserDTO? requestingUser, CancellationToken cancellationToken)
    {
        if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin) // Verify who can add the user, you can change this however you se fit.
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the admin can add courses!", ErrorCodes.CannotAdd));
        }

        var result = await _repository.GetAsync(new CourseProjectionSpec(course.SubjectId), cancellationToken);
        if (result != null)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Course already exists!", ErrorCodes.CannotAdd));
        }

        
        //var Users = new List<User>();
        var CourseInstances = new List<CourseInstance>();

        /*
        if (course.UserIds != null)
        {
            foreach (Guid id in course.UserIds)
            {
                UserToCourseAddDTO userToCourseIds = new UserToCourseAddDTO
                {
                    CourseId = course.Id,
                    UserId = user.Id,
                };
                AddUserToCourse()
            }
        }
        

        
        if (course.CourseInstanceIds != null)
        {
            foreach (Guid id in course.CourseInstanceIds)
            {
                var courseInstance = await _repository.GetAsync(new CourseInstanceSpec(id), cancellationToken);
                if (courseInstance == null)
                {
                    return ServiceResponse.FromError(new(HttpStatusCode.NotFound, "Bad course instance provided", ErrorCodes.EntityNotFound));
                }
                CourseInstances.Add(courseInstance);
            }
        }
        */

        await _repository.AddAsync(new Course
        {
            ProfessorName = course.ProfessorName,
            StartTime = course.StartTime,
            Duration = course.Duration,
            Location = course.Location,
            Series = course.Series,
            DayOfWeek = course.DayOfWeek,
            SubjectId = course.SubjectId,
            //Users = Users,
            CourseInstances = CourseInstances
        }) ;

        return ServiceResponse.ForSuccess();
    }
    
    public async Task<ServiceResponse> UpdateCourse(CourseUpdateDTO course, UserDTO? requestingUser, CancellationToken cancellationToken)
    {
        if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the admin can update the courses!", ErrorCodes.CannotUpdate));
        }

        var entity = await _repository.GetAsync(new CourseSpec(course.Id), cancellationToken);

        /*
        var Users = new List<User>();
        var CourseInstances = new List<CourseInstance>();

        
        if (course.Users != null)
        {
            foreach (Guid id in course.Users)
            {
                var user = await _repository.GetAsync(new UserSpec(id), cancellationToken);
                if (user == null)
                {
                    return ServiceResponse.FromError(new(HttpStatusCode.NotFound, "Bad user id provided", ErrorCodes.EntityNotFound));
                }
                Users.Add(user);
            }
        }
        

        if (course.CourseInstanceIds != null)
        {
            foreach (Guid id in course.CourseInstanceIds)
            {
                var courseInstance = await _repository.GetAsync(new CourseInstanceSpec(id), cancellationToken);
                if (courseInstance == null)
                {
                    return ServiceResponse.FromError(new(HttpStatusCode.NotFound, "Bad course instance provided", ErrorCodes.EntityNotFound));
                }
                CourseInstances.Add(courseInstance);
            }
        }
        */


        if (entity != null)
        {
            entity.StartTime = course.StartTime ?? entity.StartTime;
            entity.ProfessorName = course.ProfessorName ?? entity.ProfessorName;
            entity.Duration = course.Duration ?? entity.Duration;
            entity.Location = course.Location ?? entity.Location;
            entity.Series = course.Series ?? entity.Series;
            entity.DayOfWeek = course.DayOfWeek ?? entity.DayOfWeek;
            entity.SubjectId = course.SubjectId ?? entity.SubjectId;
            //entity.Users = course.Users == null ? entity.Users : Users;
            //entity.CourseInstances = course.CourseInstanceIds == null ? entity.CourseInstances : CourseInstances;
            

            await _repository.UpdateAsync(entity, cancellationToken);
        }

        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse> DeleteCourse(Guid id, UserDTO? requestingUser, CancellationToken cancellationToken)
    {
        if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the admin can delete a course!", ErrorCodes.CannotDelete));
        }
        await _repository.DeleteAsync<Course>(id, cancellationToken);

        return ServiceResponse.ForSuccess();
    }
}
