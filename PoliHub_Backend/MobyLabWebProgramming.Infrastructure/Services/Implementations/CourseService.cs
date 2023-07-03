using System.Net;
using Microsoft.AspNetCore.Cors.Infrastructure;
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
            return ServiceResponse.FromError(new(HttpStatusCode.NotFound, "Bad course Id provided!", ErrorCodes.EntityNotFound));
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

    public async Task<ServiceResponse> DeleteUserFromCourse(Guid userCourseId, UserDTO? requestingUser, CancellationToken cancellationToken)
    {

        if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the admin can remove users!", ErrorCodes.CannotAdd));
        }

        // Verify if user is enrolled
        var courseUser = await _repository.GetAsync(new CourseUserProjectionSpec(userCourseId), cancellationToken);
        if (courseUser == null)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.NotFound, "User is not enroled!", ErrorCodes.EntityNotFound));
        }

        await _repository.DeleteAsync<CourseUser>(userCourseId, cancellationToken);

        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse> AddCourse(CourseAddDTO course, UserDTO? requestingUser, CancellationToken cancellationToken)
    {
        if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin) // Verify who can add the user, you can change this however you se fit.
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the admin can add courses!", ErrorCodes.CannotAdd));
        }

        var courseResult = await _repository.GetAsync(new CourseProjectionSpec(course.ProfessorName), cancellationToken);
        if (courseResult != null)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Course already exists!", ErrorCodes.CannotAdd));
        }

        var subjectResult = await _repository.GetAsync(new SubjectProjectionSpec(course.SubjectId), cancellationToken);
        if (subjectResult == null)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Subject does not exist!", ErrorCodes.EntityNotFound));
        }

        var subject = new Subject
        {
            Name = subjectResult.Name
        };

        await _repository.AddAsync(new Course
        {
            ProfessorName = course.ProfessorName,
            StartTime = course.StartTime,
            Duration = course.Duration,
            Location = course.Location,
            Series = course.Series,
            DayOfWeek = course.DayOfWeek,
            SubjectId = course.SubjectId,
            Subject = subject
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


        if (entity != null)
        {
            entity.StartTime = course.StartTime ?? entity.StartTime;
            entity.ProfessorName = course.ProfessorName ?? entity.ProfessorName;
            entity.Duration = course.Duration ?? entity.Duration;
            entity.Location = course.Location ?? entity.Location;
            entity.Series = course.Series ?? entity.Series;
            entity.DayOfWeek = course.DayOfWeek ?? entity.DayOfWeek;
            entity.SubjectId = course.SubjectId ?? entity.SubjectId;

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

        var resultCourse = await _repository.GetAsync(new CourseSpec(id), cancellationToken);
        if(resultCourse == null)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.NotFound, "Course not Found!", ErrorCodes.CannotDelete));
        }

        //Delete Course Users
        if (resultCourse.CourseUsers != null){
            foreach (CourseUser eachUser in resultCourse.CourseUsers)
            {
                await _repository.DeleteAsync<CourseUser>(eachUser.Id, cancellationToken);
            }
        }

        //Delete Course Instances
        if (resultCourse.CourseInstances != null)
        {
            foreach (CourseInstance eachCourseIns in resultCourse.CourseInstances)
            {
                if (eachCourseIns.CourseInstanceUsers != null)
                {
                    foreach (CourseInstanceUser eachUser in eachCourseIns.CourseInstanceUsers)
                    {
                        await _repository.DeleteAsync<CourseInstanceUser>(eachUser.Id, cancellationToken);
                    }
                }

                await _repository.DeleteAsync<CourseInstance>(eachCourseIns.Id, cancellationToken);
            }
        }

        //Delete Laboratories
        if (resultCourse.Laboratories != null)
        {
            foreach (Laboratory eachLaboratory in resultCourse.Laboratories)
            {
                //Delete Laboratory Instances
                if (resultCourse.Laboratories != null) { 
                    foreach (LaboratoryInstance eachLaboratoryIns in eachLaboratory.LaboratoryInstances)
                    {
                        foreach (LaboratoryInstanceUser eachUser in eachLaboratoryIns.LaboratoryInstanceUsers)
                        {
                            await _repository.DeleteAsync<LaboratoryInstanceUser>(eachUser.Id, cancellationToken);
                        }

                        await _repository.DeleteAsync<LaboratoryInstance>(eachLaboratory.Id, cancellationToken);
                    }
                }

                await _repository.DeleteAsync<Laboratory>(eachLaboratory.Id, cancellationToken);
            }
        }

        await _repository.DeleteAsync<Course>(id, cancellationToken);

        return ServiceResponse.ForSuccess();
    }
}

