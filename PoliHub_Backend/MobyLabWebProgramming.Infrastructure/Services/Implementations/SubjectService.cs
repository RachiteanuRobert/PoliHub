using System.Collections.Specialized;
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

public class SubjectService : ISubjectService
{
    private readonly IRepository<WebAppDatabaseContext> _repository;
    public SubjectService(IRepository<WebAppDatabaseContext> repository)
    {
        _repository = repository;
        //_subjectUser = subjectUser;
    }

    public async Task<ServiceResponse<SubjectDTO>> GetSubjectById(Guid id, CancellationToken cancellationToken = default)
    {
        var result = await _repository.GetAsync(new SubjectProjectionSpec(id), cancellationToken);

        return result != null ?
            ServiceResponse<SubjectDTO>.ForSuccess(result) :
            ServiceResponse<SubjectDTO>.FromError(new(HttpStatusCode.Forbidden, "Subject not found!", ErrorCodes.EntityNotFound));
    }

    public async Task<ServiceResponse<PagedResponse<SubjectDTO>>> GetSubjects(PaginationSearchQueryParams pagination, CancellationToken cancellationToken)
    {
        var result = await _repository.PageAsync(pagination, new SubjectProjectionSpec(pagination.Search), cancellationToken);

        return ServiceResponse<PagedResponse<SubjectDTO>>.ForSuccess(result);
    }

    public async Task<ServiceResponse<SubjectDTO>> GetSubjectByName(string subjectName, CancellationToken cancellationToken = default)
    {
        var result = await _repository.GetAsync(new SubjectProjectionSpec(subjectName), cancellationToken);

        return result != null ?
            ServiceResponse<SubjectDTO>.ForSuccess(result) :
            ServiceResponse<SubjectDTO>.FromError(new(HttpStatusCode.Forbidden, "Subject not found!", ErrorCodes.EntityNotFound));
    }

    public async Task<ServiceResponse> AddUserToSubject(UserToSubjectAddDTO userSubjectIds, UserDTO? requestingUser, CancellationToken cancellationToken)
    {

        if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin) 
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the admin can add users!", ErrorCodes.CannotAdd));
        }

        var subject = await _repository.GetAsync(new SubjectSpec(userSubjectIds.SubjectId), cancellationToken);
        if (subject == null)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Bad subject Id provided!", ErrorCodes.EntityNotFound));
        }

        var user = await _repository.GetAsync(new UserSpec(userSubjectIds.UserId), cancellationToken);
        if (user == null)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.NotFound, "Bad user id provided!", ErrorCodes.EntityNotFound));
        }

        // Verify if user is enrolled
        var searchSubjectUser = await _repository.GetAsync(new SubjectUserProjectionSpec(userSubjectIds.UserId, userSubjectIds.SubjectId), cancellationToken);
        if (searchSubjectUser != null)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.NotFound, "User already enroled!", ErrorCodes.UserAlreadyExists));
        }
        
        SubjectUser newSubjectUser = new SubjectUser
        {
            Subject = subject,
            User = user,
            SubjectId = subject.Id,
            UserId = user.Id,
        };

        await _repository.AddAsync(newSubjectUser);

        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse> AddSubject(SubjectAddDTO subject, UserDTO? requestingUser, CancellationToken cancellationToken)
    {
        if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin) // Verify who can add the user, you can change this however you se fit.
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the admin can add Subjects!", ErrorCodes.CannotAdd));
        }

        var result = await _repository.GetAsync(new SubjectProjectionSpec(subject.Name), cancellationToken);
        if (result != null)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Subject already exists!", ErrorCodes.CannotAdd));
        }

        /*
        var Users = new List<User>();

        if (subject.UserIds != null)
        {
            foreach (Guid id in subject.UserIds)
            {
                var user = await _repository.GetAsync(new UserSpec(id), cancellationToken);
                if (user == null)
                {
                    return ServiceResponse.FromError(new(HttpStatusCode.NotFound, "Bad User id provided", ErrorCodes.EntityNotFound));
                }
                User.Add(user);
            }
        }
        */

        await _repository.AddAsync(new Subject
        {
            Name = subject.Name,
            Year = subject.Year,
            Semester = subject.Semester,
            Department = subject.Department,
            CreditsNo = subject.CreditsNo,
            Description = subject.Description,
            // Users = Users
            /*
            Course = NewCourse,
            */
        });

        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse> UpdateSubject(SubjectUpdateDTO subject, UserDTO? requestingUser, CancellationToken cancellationToken)
    {
        if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the admin can update the subjects!", ErrorCodes.CannotUpdate));
        }

        var entity = await _repository.GetAsync(new SubjectSpec(subject.Id), cancellationToken);

        /*
        var Users = new List<User>();

        if (subject.UserIds != null)
        {
            foreach (Guid id in subject.UserIds)
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
            entity.Name = subject.Name ?? entity.Name;
            entity.Year = subject.Year ?? entity.Year;
            entity.Semester = subject.Semester ?? entity.Semester;
            entity.Department = subject.Department ?? entity.Department;
            entity.CreditsNo = subject.CreditsNo ?? entity.CreditsNo;
            entity.Description = subject.Description ?? entity.Description;
            entity.SubjectUsers = subject.SubjectUsers ?? entity.SubjectUsers;
            //entity.Users = Users ?? entity.Users;
            /*
            
            entity.Course = subject.Course ?? entity.Course;
            entity.Laboratories = subject.Laboratories == null ? entity.Laboratories : Laboratories;*/

            await _repository.UpdateAsync(entity, cancellationToken);
        }

        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse> DeleteSubject(Guid id, UserDTO? requestingUser, CancellationToken cancellationToken)
    {
        if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the admin can delete a subject!", ErrorCodes.CannotDelete));
        }
        await _repository.DeleteAsync<Subject>(id, cancellationToken);

        return ServiceResponse.ForSuccess();
    }
}
