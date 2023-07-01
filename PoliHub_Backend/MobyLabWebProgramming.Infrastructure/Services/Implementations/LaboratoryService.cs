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

public class LaboratoryService : ILaboratoryService
{
    private readonly IRepository<WebAppDatabaseContext> _repository;

    public LaboratoryService(IRepository<WebAppDatabaseContext> repository)
    {
        _repository = repository;
    }

    public async Task<ServiceResponse<LaboratoryDTO>> GetLaboratoryById(Guid Id, CancellationToken cancellationToken = default)
    {
        var result = await _repository.GetAsync(new LaboratoryProjectionSpec(Id), cancellationToken);

        return result != null ?
            ServiceResponse<LaboratoryDTO>.ForSuccess(result) :
            ServiceResponse<LaboratoryDTO>.FromError(new(HttpStatusCode.Forbidden, "Laboratory not found!", ErrorCodes.EntityNotFound));
    }
    public async Task<ServiceResponse<PagedResponse<LaboratoryDTO>>> GetLaboratories(PaginationSearchQueryParams pagination, CancellationToken cancellationToken)
    {
        var result = await _repository.PageAsync(pagination, new LaboratoryProjectionSpec(pagination.Search), cancellationToken);

        return ServiceResponse<PagedResponse<LaboratoryDTO>>.ForSuccess(result);
    }

    public async Task<ServiceResponse> AddUserToLaboratory(UserToLaboratoryAddDTO userLaboratoryIds, UserDTO? requestingUser, CancellationToken cancellationToken)
    {

        if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the admin can add users!", ErrorCodes.CannotAdd));
        }

        var laboratory = await _repository.GetAsync(new LaboratorySpec(userLaboratoryIds.LaboratoryId), cancellationToken);
        if (laboratory == null)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Bad Laboratory Id provided!", ErrorCodes.EntityNotFound));
        }

        var user = await _repository.GetAsync(new UserSpec(userLaboratoryIds.UserId), cancellationToken);
        if (user == null)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.NotFound, "Bad user id provided!", ErrorCodes.EntityNotFound));
        }

        // Verify if user is enrolled
        var searchSubjectUser = await _repository.GetAsync(new LaboratoryUserProjectionSpec(userLaboratoryIds.UserId, userLaboratoryIds.LaboratoryId), cancellationToken);
        if (searchSubjectUser != null)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.NotFound, "User already enroled!", ErrorCodes.UserAlreadyExists));
        }

        LaboratoryUser newLaboratoryUser = new LaboratoryUser
        {
            Laboratory = laboratory,
            User = user,
            LaboratoryId = laboratory.Id,
            UserId = user.Id,
        };

        await _repository.AddAsync(newLaboratoryUser);

        await _repository.UpdateAsync(laboratory, cancellationToken);

        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse> DeleteUserFromLaboratory(Guid userLaboratoryId, UserDTO? requestingUser, CancellationToken cancellationToken)
    {

        if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the admin can remove users!", ErrorCodes.CannotAdd));
        }

        // Verify if user is enrolled
        var laboratoryUser = await _repository.GetAsync(new LaboratoryUserProjectionSpec(userLaboratoryId), cancellationToken);
        if (laboratoryUser == null)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.NotFound, "User is not enroled!", ErrorCodes.EntityNotFound));
        }

        await _repository.DeleteAsync<LaboratoryUser>(userLaboratoryId, cancellationToken);

        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse> AddLaboratory(LaboratoryAddDTO laboratory, UserDTO? requestingUser, CancellationToken cancellationToken)
    {
        if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin) // Verify who can add the user, you can change this however you se fit.
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the admin can add laboratories!", ErrorCodes.CannotAdd));
        }

        var result = await _repository.GetAsync(new LaboratoryProjectionSpec(laboratory.AssistantName), cancellationToken);
        if (result != null)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.NotFound, "Laboratory already exists!", ErrorCodes.CannotAdd));
        }

        
        var courseResult = await _repository.GetAsync(new CourseProjectionSpec(laboratory.CourseId), cancellationToken);
        if (courseResult == null)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.NotFound, "Course already exists!", ErrorCodes.EntityNotFound));
        }

        var subjectResult = await _repository.GetAsync(new SubjectProjectionSpec(courseResult.SubjectId), cancellationToken);
        if (subjectResult == null)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.NotFound, "Subject does not exist!", ErrorCodes.EntityNotFound));
        }

        var subject = new Subject
        {
            Name = subjectResult.Name
        };

        var course = new Course
        {
            Subject = subject
        };

        await _repository.AddAsync(new Laboratory
        {
            StartTime = laboratory.StartTime,
            Duration = laboratory.Duration,
            Location = laboratory.Location,
            AssistantName = laboratory.AssistantName,
            DayOfWeek = laboratory.DayOfWeek,
            CourseId = laboratory.CourseId,
            Course = course
        });

        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse> UpdateLaboratories(Guid laboratoryId, UserDTO? requestingUser = default, CancellationToken cancellationToken = default)
    {
        if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the admin can update the laboratorys!", ErrorCodes.CannotUpdate));
        }

        var laboratoryResult = await _repository.GetAsync(new LaboratoryProjectionSpec(laboratoryId), cancellationToken);
        if (laboratoryResult == null)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "laboratory not found!", ErrorCodes.EntityNotFound));
        }

        var courseResult = await _repository.GetAsync(new CourseProjectionSpec(laboratoryResult.CourseId), cancellationToken);
        if (courseResult == null)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.NotFound, "Course does not exist!", ErrorCodes.EntityNotFound));
        }

        var subjectResult = await _repository.GetAsync(new SubjectProjectionSpec(courseResult.SubjectId), cancellationToken);
        if (subjectResult == null)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.NotFound, "Subject does not exist!", ErrorCodes.EntityNotFound));
        }

        var subject = new Subject
        {
            Name = subjectResult.Name
        };

        var course = new Course
        {
            Subject = subject
        };

        var entity = await _repository.GetAsync(new LaboratorySpec(laboratoryId), cancellationToken);
        if (entity == null)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.NotFound, "Laboratory not found2!", ErrorCodes.EntityNotFound));
        }

        if (entity != null)
        {
            entity.Course = course;

            await _repository.UpdateAsync(entity, cancellationToken);
        }


        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse> UpdateLaboratory(LaboratoryUpdateDTO laboratory, UserDTO? requestingUser, CancellationToken cancellationToken)
    {
        if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the admin can update the laboratories!", ErrorCodes.CannotUpdate));
        }

        var entity = await _repository.GetAsync(new LaboratorySpec(laboratory.Id), cancellationToken);

        if (entity != null)
        {
            entity.StartTime = laboratory.StartTime ?? entity.StartTime;
            entity.Duration = laboratory.Duration ?? entity.Duration;
            entity.Location = laboratory.Location ?? entity.Location;
            entity.AssistantName = laboratory.AssistantName ?? entity.AssistantName;
            entity.DayOfWeek = laboratory.DayOfWeek ?? entity.DayOfWeek;
            entity.CourseId = laboratory.CourseId ?? entity.CourseId;

            await _repository.UpdateAsync(entity, cancellationToken);
        }

        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse> DeleteLaboratory(Guid id, UserDTO? requestingUser, CancellationToken cancellationToken)
    {
        if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the admin can delete a laboratory!", ErrorCodes.CannotDelete));
        }
        await _repository.DeleteAsync<Laboratory>(id, cancellationToken);

        return ServiceResponse.ForSuccess();
    }
}
