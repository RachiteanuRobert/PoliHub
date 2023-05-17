using System.Net;
using System.Xml.Linq;
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
<<<<<<< HEAD

        var Laboratories = new List<Laboratory>();
        //var NewCourse = new Course();  

=======
        /*
        var Laboratories = new List<Laboratory>();
        //var NewCourse = new Course();  

>>>>>>> parent of b670fb9 (ERROR_DESTROYED_MERGE_TABLE)
        if (subject.Laboratories != null)
        {
            foreach (Guid id in subject.Laboratories)
            {
                var laboratory = await _repository.GetAsync(new LaboratorySpec(id), cancellationToken);
                if (laboratory == null)
                {
                    return ServiceResponse.FromError(new(HttpStatusCode.NotFound, "Bad laboratory id provided", ErrorCodes.EntityNotFound));
                }
                Laboratories.Add(laboratory);
            }
        }

<<<<<<< HEAD
        /*
=======
        
>>>>>>> parent of b670fb9 (ERROR_DESTROYED_MERGE_TABLE)
        NewCourse = await _repository.GetAsync(new CourseSpec(subject.Id), cancellationToken);
        if (NewCourse == null)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.NotFound, "Bad subject id provided", ErrorCodes.EntityNotFound));
        }
        */

        await _repository.AddAsync(new Subject
        {
            Name = subject.Name,
            Year = subject.Year,
            Professor = subject.Professor,
            Department = subject.Department,
            CreditsNo = subject.CreditsNo,
<<<<<<< HEAD
            Description = subject.Description,
            //Course = NewCourse,
            Laboratories = Laboratories
=======
            Description = subject.Description

            /*
            Course = NewCourse,
            Laboratories = Laboratories
            */
>>>>>>> parent of b670fb9 (ERROR_DESTROYED_MERGE_TABLE)
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

<<<<<<< HEAD
=======
        /*
>>>>>>> parent of b670fb9 (ERROR_DESTROYED_MERGE_TABLE)
        var Laboratories = new List<Laboratory>();

        if (subject.Laboratories != null)
        {
            foreach (Guid id in subject.Laboratories)
            {
                var laboratory = await _repository.GetAsync(new LaboratorySpec(id), cancellationToken);
                if (laboratory == null)
                {
                    return ServiceResponse.FromError(new(HttpStatusCode.NotFound, "Bad laboratory id provided", ErrorCodes.EntityNotFound));
                }
                Laboratories.Add(laboratory);
            }
        }

        if (entity != null)
        {
            entity.Name = subject.Name ?? entity.Name;
            entity.Year = subject.Year ?? entity.Year;
            entity.Professor = subject.Professor ?? entity.Professor;
            entity.Department = subject.Department ?? entity.Department;
            entity.CreditsNo = subject.CreditsNo ?? entity.CreditsNo;
            entity.Description = subject.Description ?? entity.Description;
<<<<<<< HEAD
            //entity.Course = subject.Course ?? entity.Course;
            entity.Laboratories = subject.Laboratories == null ? entity.Laboratories : Laboratories;
=======
/*
            entity.Course = subject.Course ?? entity.Course;
            entity.Laboratories = subject.Laboratories == null ? entity.Laboratories : Laboratories;*/
>>>>>>> parent of b670fb9 (ERROR_DESTROYED_MERGE_TABLE)

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
