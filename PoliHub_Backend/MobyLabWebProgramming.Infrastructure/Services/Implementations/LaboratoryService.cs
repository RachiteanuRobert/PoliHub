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

public class LaboratoryService : ILaboratoryService
{
    private readonly IRepository<WebAppDatabaseContext> _repository;

    public LaboratoryService(IRepository<WebAppDatabaseContext> repository)
    {
        _repository = repository;
    }

    public async Task<ServiceResponse<LaboratoryDTO>> GetLaboratoryByName(string assistantName, CancellationToken cancellationToken = default)
    {
        var result = await _repository.GetAsync(new LaboratoryProjectionSpec(assistantName), cancellationToken);

        return result != null ?
            ServiceResponse<LaboratoryDTO>.ForSuccess(result) :
            ServiceResponse<LaboratoryDTO>.FromError(new(HttpStatusCode.Forbidden, "Laboratory not found!", ErrorCodes.EntityNotFound));
    }

    public async Task<ServiceResponse<LaboratoryDTO>> GetLaboratoryById(Guid Id, CancellationToken cancellationToken = default)
    {
        var result = await _repository.GetAsync(new LaboratoryProjectionSpec(Id), cancellationToken);

        return result != null ?
            ServiceResponse<LaboratoryDTO>.ForSuccess(result) :
            ServiceResponse<LaboratoryDTO>.FromError(new(HttpStatusCode.Forbidden, "Laboratory not found!", ErrorCodes.EntityNotFound));
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
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Laboratory already exists!", ErrorCodes.CannotAdd));
        }

        var Students = new List<User>();
        var LaboratoryInstances = new List<LaboratoryInstance>();

        if (laboratory.Students != null)
        {
            foreach (Guid id in laboratory.Students)
            {
                var student = await _repository.GetAsync(new UserSpec(id), cancellationToken);
                if (student == null)
                {
                    return ServiceResponse.FromError(new(HttpStatusCode.NotFound, "Bad student id provided", ErrorCodes.EntityNotFound));
                }
                Students.Add(student);
            }
        }

        if (laboratory.LaboratoryInstances != null)
        {
            foreach (Guid id in laboratory.LaboratoryInstances)
            {
                var laboratoryInstance = await _repository.GetAsync(new LaboratoryInstanceSpec(id), cancellationToken);
                if (laboratoryInstance == null)
                {
                    return ServiceResponse.FromError(new(HttpStatusCode.NotFound, "Bad laboratory instance provided", ErrorCodes.EntityNotFound));
                }
                LaboratoryInstances.Add(laboratoryInstance);
            }
        }

        await _repository.AddAsync(new Laboratory
        {
            StartTime = laboratory.StartTime,
            Duration = laboratory.Duration,
            Location = laboratory.Location,
            AssistantName = laboratory.AssistantName,
            SubjectId = laboratory.SubjectId,
            //Subject = laboratory.Subject,
            Students = Students,
            LaboratoryInstances = LaboratoryInstances
        });

        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse> UpdateLaboratory(LaboratoryUpdateDTO laboratory, UserDTO? requestingUser, CancellationToken cancellationToken)
    {
        if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the admin can update the laboratories!", ErrorCodes.CannotUpdate));
        }

        var entity = await _repository.GetAsync(new LaboratorySpec(laboratory.Id), cancellationToken);

        var Students = new List<User>();
        var LaboratoryInstances = new List<LaboratoryInstance>();

        if (laboratory.Students != null)
        {
            foreach (Guid id in laboratory.Students)
            {
                var student = await _repository.GetAsync(new UserSpec(id), cancellationToken);
                if (student == null)
                {
                    return ServiceResponse.FromError(new(HttpStatusCode.NotFound, "Bad student id provided", ErrorCodes.EntityNotFound));
                }
                Students.Add(student);
            }
        }

        if (laboratory.LaboratoryInstances != null)
        {
            foreach (Guid id in laboratory.LaboratoryInstances)
            {
                var laboratoryInstance = await _repository.GetAsync(new LaboratoryInstanceSpec(id), cancellationToken);
                if (laboratoryInstance == null)
                {
                    return ServiceResponse.FromError(new(HttpStatusCode.NotFound, "Bad laboratory instance provided", ErrorCodes.EntityNotFound));
                }
                LaboratoryInstances.Add(laboratoryInstance);
            }
        }


        if (entity != null)
        {
            entity.StartTime = laboratory.StartTime ?? entity.StartTime;
            entity.Duration = laboratory.Duration ?? entity.Duration;
            entity.Location = laboratory.Location ?? entity.Location;
            //entity.Subject = laboratory.Subject ?? entity.Subject;
            entity.AssistantName = laboratory.AssistantName ?? laboratory.AssistantName;
            entity.SubjectId = laboratory.SubjectId ?? entity.SubjectId;
            entity.Students = laboratory.Students == null ? entity.Students : Students;
            entity.LaboratoryInstances = laboratory.LaboratoryInstances == null ? entity.LaboratoryInstances : LaboratoryInstances;


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
