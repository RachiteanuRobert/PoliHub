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

    public async Task<ServiceResponse<PagedResponse<LaboratoryInstanceDTO>>> GetLaboratoryInstances(PaginationSearchQueryParams pagination, CancellationToken cancellationToken)
    {
        var result = await _repository.PageAsync(pagination, new LaboratoryInstanceProjectionSpec(pagination.Search), cancellationToken);

        return ServiceResponse<PagedResponse<LaboratoryInstanceDTO>>.ForSuccess(result);
    }

    
    public async Task<ServiceResponse<Boolean>> GetIsUserInLaboratoryInstance(Guid laboratoryInstanceId, Guid userId, CancellationToken cancellationToken = default)
    {
        var resultLaboratoryInstance = await _repository.GetAsync(new LaboratoryInstanceSpec(laboratoryInstanceId), cancellationToken);
        if (resultLaboratoryInstance == null)
        {
            return ServiceResponse<Boolean>.FromError(new(HttpStatusCode.Forbidden, "Laboratory Instance not found!", ErrorCodes.EntityNotFound));
        }
        
        var resultLaboratoryInstanceUser = await _repository.GetAsync(new LaboratoryInstanceUserProjectionSpec(userId, laboratoryInstanceId), cancellationToken);
        if(resultLaboratoryInstanceUser != null)
        { 
            return ServiceResponse<Boolean>.ForSuccess(true);
        }
        return ServiceResponse<Boolean>.ForSuccess(false);
    }
    

    public async Task<ServiceResponse> AddUserToLaboratoryInstance(UserToLaboratoryInstanceAddDTO userLaboratoryInstanceIds, UserDTO? requestingUser, CancellationToken cancellationToken)
    {
        var laboratoryInstance = await _repository.GetAsync(new LaboratoryInstanceSpec(userLaboratoryInstanceIds.LaboratoryInstanceId), cancellationToken);
        if (laboratoryInstance == null)
        {
            return ServiceResponse.ForSuccess();
        }

        var user = await _repository.GetAsync(new UserSpec(userLaboratoryInstanceIds.UserId), cancellationToken);
        if (user == null)
        {
            return ServiceResponse.ForSuccess();
        }

        // Verify if user is enrolled
        var searchLaboratoryInstanceUser = await _repository.GetAsync(new LaboratoryInstanceUserProjectionSpec(userLaboratoryInstanceIds.UserId, userLaboratoryInstanceIds.LaboratoryInstanceId), cancellationToken);
        if (searchLaboratoryInstanceUser != null)
        {
            return ServiceResponse.ForSuccess();
        }

        LaboratoryInstanceUser newLaboratoryInstanceUser = new LaboratoryInstanceUser
        {
            LaboratoryInstance = laboratoryInstance,
            User = user,
            LaboratoryInstanceId = laboratoryInstance.Id,
            UserId = user.Id,
        };

        await _repository.AddAsync(newLaboratoryInstanceUser);

        return ServiceResponse.ForSuccess();
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

        /*
        var Users = new List<User>();

        if (laboratoryInstance.Users != null)
        {
            foreach (Guid id in laboratoryInstance.Users)
            {
                var user = await _repository.GetAsync(new UserSpec(id), cancellationToken);
                if (user == null)
                {
                    return ServiceResponse.FromError(new(HttpStatusCode.NotFound, "Bad User id provided", ErrorCodes.EntityNotFound));
                }
                Users.Add(user);
            }
        }
        */

        await _repository.AddAsync(new LaboratoryInstance
        {
            //Laboratory = laboratoryInstance.Laboratory,
            LaboratoryId = laboratoryInstance.LaboratoryId,
            LaboratoryInstanceDate = laboratoryInstance.LaboratoryInstanceDate,
            Name = laboratoryInstance.Name,
            Description = laboratoryInstance.Description,
            //Users = Users
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

        /*
        var Users = new List<User>();

        if (laboratoryInstance.Users != null)
        {
            foreach (Guid id in laboratoryInstance.Users)
            {
                var user = await _repository.GetAsync(new UserSpec(id), cancellationToken);
                if (user == null)
                {
                    return ServiceResponse.FromError(new(HttpStatusCode.NotFound, "Bad user id provided", ErrorCodes.EntityNotFound));
                }
                Users.Add(user);
            }
        }
        */


        if (entity != null)
        {
            entity.LaboratoryId = laboratoryInstance.LaboratoryId;
            entity.Name = laboratoryInstance.Name;
            entity.Description = laboratoryInstance.Description;
            entity.LaboratoryInstanceDate = laboratoryInstance.LaboratoryInstanceDate;
            //entity.Users = laboratoryInstance.Users == null ? entity.Users : Users;

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
