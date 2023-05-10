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
        
        var Students = new List<User>();
        var CourseInstances = new List<CourseInstance>();

        if (course.Students != null)
        {
            foreach (Guid id in course.Students)
            {
                var student = await _repository.GetAsync(new UserSpec(id), cancellationToken);
                if (student == null)
                {
                    return ServiceResponse.FromError(new(HttpStatusCode.NotFound, "Bad student id provided", ErrorCodes.EntityNotFound));
                }
                Students.Add(student);
            }
        }

        if (course.CourseInstances != null)
        {
            foreach (Guid id in course.CourseInstances)
            {
                var courseInstance = await _repository.GetAsync(new CourseInstanceSpec(id), cancellationToken);
                if (courseInstance == null)
                {
                    return ServiceResponse.FromError(new(HttpStatusCode.NotFound, "Bad course instance provided", ErrorCodes.EntityNotFound));
                }
                CourseInstances.Add(courseInstance);
            }
        }

        await _repository.AddAsync(new Course
        {
            StartTime = course.StartTime,
            Duration = course.Duration,
            Location = course.Location,
            SubjectId = course.SubjectId,
            //Subject = course.Subject,
            Students = Students,
            CourseInstances = CourseInstances
        });

        return ServiceResponse.ForSuccess();
    }
    
    public async Task<ServiceResponse> UpdateCourse(CourseUpdateDTO course, UserDTO? requestingUser, CancellationToken cancellationToken)
    {
        if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the admin can update the courses!", ErrorCodes.CannotUpdate));
        }

        var entity = await _repository.GetAsync(new CourseSpec(course.Id), cancellationToken);

        var Students = new List<User>();
        var CourseInstances = new List<CourseInstance>();

        if (course.Students != null)
        {
            foreach (Guid id in course.Students)
            {
                var student = await _repository.GetAsync(new UserSpec(id), cancellationToken);
                if (student == null)
                {
                    return ServiceResponse.FromError(new(HttpStatusCode.NotFound, "Bad student id provided", ErrorCodes.EntityNotFound));
                }
                Students.Add(student);
            }
        }

        if (course.CourseInstances != null)
        {
            foreach (Guid id in course.CourseInstances)
            {
                var courseInstance = await _repository.GetAsync(new CourseInstanceSpec(id), cancellationToken);
                if (courseInstance == null)
                {
                    return ServiceResponse.FromError(new(HttpStatusCode.NotFound, "Bad course instance provided", ErrorCodes.EntityNotFound));
                }
                CourseInstances.Add(courseInstance);
            }
        }


        if (entity != null)
        {
            entity.StartTime = course.StartTime ?? entity.StartTime;
            entity.Duration = course.Duration ?? entity.Duration;
            entity.Location = course.Location ?? entity.Location;
            //entity.Subject = course.Subject ?? entity.Subject;
            entity.SubjectId = course.SubjectId ?? entity.SubjectId;
            entity.Students = course.Students == null ? entity.Students : Students;
            entity.CourseInstances = course.CourseInstances == null ? entity.CourseInstances : CourseInstances;


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
