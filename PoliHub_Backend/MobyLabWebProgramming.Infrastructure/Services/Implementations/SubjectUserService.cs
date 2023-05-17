using System.Net;
using System.Xml.Linq;
using Ardalis.Specification;
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

public class SubjectUserService : ISubjectUserService
{
    private readonly IRepository<WebAppDatabaseContext> _repository;

    public SubjectUserService(IRepository<WebAppDatabaseContext> repository)
    {
        _repository = repository;
    }

    /*
    public async Task<ServiceResponse<SubjectDTO>> GetSubjectsByUserId(Guid id, Guid userId, CancellationToken cancellationToken = default)
    {
        var result = await _repository.GetAsync(new SubjectUserProjectionSpec(id), cancellationToken);

        return result != null ?
            ServiceResponse<SubjectDTO>.ForSuccess(result) :
            ServiceResponse<SubjectDTO>.FromError(new(HttpStatusCode.Forbidden, "Subject not found!", ErrorCodes.EntityNotFound));
    }
    */

    /*
    public async Task<ServiceResponse<PagedResponse<SubjectDTO>>> GetSubject(PaginationSearchQueryParams pagination, CancellationToken cancellationToken)
    {
        var result = await _repository.PageAsync(pagination, new SubjectProjectionSpec(pagination.Search), cancellationToken);

        return ServiceResponse<PagedResponse<SubjectDTO>>.ForSuccess(result);
    }
    */

    public async Task<ServiceResponse<SubjectUserDTO>> GetSubjectUserById(Guid id, CancellationToken cancellationToken = default)
    {
        var result = await _repository.GetAsync(new SubjectUserProjectionSpec(id), cancellationToken);

        return result != null ?
            ServiceResponse<SubjectUserDTO>.ForSuccess(result) :
            ServiceResponse<SubjectUserDTO>.FromError(new(HttpStatusCode.Forbidden, "SubjectUser not found!", ErrorCodes.EntityNotFound));
    }

    /*
    public async Task<ServiceResponse<SubjectUserDTO>> GetSubjectsFromUserById(Guid userId, CancellationToken cancellationToken = default)
    {
        var result = await _repository.GetAsync(new SubjectUserProjectionSpec(id), cancellationToken);

        return result != null ?
            ServiceResponse<SubjectUserDTO>.ForSuccess(result) :
            ServiceResponse<SubjectUserDTO>.FromError(new(HttpStatusCode.Forbidden, "SubjectUser not found!", ErrorCodes.EntityNotFound));
    }
    */

    public async Task<ServiceResponse> AddSubjectUser(Guid subjectId, Guid userId, UserDTO? requestingUser, CancellationToken cancellationToken)
    {
        if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin) // Verify who can add the user, you can change this however you se fit.
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the admin can add Subjects!", ErrorCodes.CannotAdd));
        }

        await _repository.AddAsync(new SubjectUser
        {
            SubjectId = subjectId,
            UserId = userId,
        });

        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse> DeleteSubjectUser(Guid id, UserDTO? requestingUser, CancellationToken cancellationToken)
    {
        if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the admin can delete a subject_user!", ErrorCodes.CannotDelete));
        }
        await _repository.DeleteAsync<Subject>(id, cancellationToken);

        return ServiceResponse.ForSuccess();
    }
}
