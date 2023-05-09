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

public class LaboratoryInstanceService : ILaboratoryInstanceService
{
    private readonly IRepository<WebAppDatabaseContext> _repository;

    public LaboratoryInstanceService(IRepository<WebAppDatabaseContext> repository)
    {
        _repository = repository;
    }

    public async Task<ServiceResponse<LaboratoryInstanceDTO>> GetLaboratoryInstance(Guid id, CancellationToken cancellationToken = default)
    {
        var result = await _repository.GetAsync(new LaboratoryInstanceProjectionSpec(id), cancellationToken);

        return result != null ?
            ServiceResponse<LaboratoryInstanceDTO>.ForSuccess(result) :
            ServiceResponse<LaboratoryInstanceDTO>.FromError(new(HttpStatusCode.Forbidden, "Laboratory Instance not found!", ErrorCodes.EntityNotFound));
    } 

    public async Task<ServiceResponse> AddLaboratoryInstance(LaboratoryInstanceAddDTO laboratoryInstance, UserDTO? requestingUser, CancellationToken cancellationToken)
    {
        if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin) // Verify who can add the user, you can change this however you se fit.
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the admin can add laboratory instances!", ErrorCodes.CannotAdd));
        }

        var result = await _repository.GetAsync(new LaboratoryInstanceProjectionSpec(laboratoryInstance.LaboratoryId), cancellationToken);
        if (result != null)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Laboratory Instance already exists!", ErrorCodes.CannotAdd));
        }

        var Students = new List<User>();

        if (laboratoryInstance.Students != null)
        {
            foreach (Guid id in laboratoryInstance.Students)
            {
                var student = await _repository.GetAsync(new UserSpec(id), cancellationToken);
                if (student == null)
                {
                    return ServiceResponse.FromError(new(HttpStatusCode.NotFound, "Bad student id provided", ErrorCodes.EntityNotFound));
                }
                Students.Add(student);
            }
        }

        await _repository.AddAsync(new LaboratoryInstance
        {
            //Laboratory = laboratoryInstance.Laboratory,
            LaboratoryId = laboratoryInstance.LaboratoryId,
            LaboratoryInstanceDate = laboratoryInstance.LaboratoryInstanceDate,
            Students = Students
        });

        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse> UpdateLaboratoryInstance(LaboratoryInstanceUpdateDTO laboratoryInstance, UserDTO? requestingUser, CancellationToken cancellationToken)
    {
        if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the admin can update the laboratories!", ErrorCodes.CannotUpdate));
        }

        var entity = await _repository.GetAsync(new LaboratoryInstanceSpec(laboratoryInstance.Id), cancellationToken);

        var Students = new List<User>();

        if (laboratoryInstance.Students != null)
        {
            foreach (Guid id in laboratoryInstance.Students)
            {
                var student = await _repository.GetAsync(new UserSpec(id), cancellationToken);
                if (student == null)
                {
                    return ServiceResponse.FromError(new(HttpStatusCode.NotFound, "Bad student id provided", ErrorCodes.EntityNotFound));
                }
                Students.Add(student);
            }
        }

        if (entity != null)
        {
            entity.LaboratoryId = laboratoryInstance.LaboratoryId;
            entity.LaboratoryInstanceDate = laboratoryInstance.LaboratoryInstanceDate;
            entity.Students = laboratoryInstance.Students == null ? entity.Students : Students;

            await _repository.UpdateAsync(entity, cancellationToken);
        }

        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse> DeleteLaboratoryInstance(Guid id, UserDTO? requestingUser, CancellationToken cancellationToken)
    {
        if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the admin can delete a laboratory instance!", ErrorCodes.CannotDelete));
        }
        await _repository.DeleteAsync<LaboratoryInstance>(id, cancellationToken);

        return ServiceResponse.ForSuccess();
    }
}
