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
    private readonly ISubjectUserService _subjectUser;
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

    public async Task<ServiceResponse> AddStudentToSubject(StudentToSubjectAddDTO studentSubjectIds, UserDTO? requestingUser, CancellationToken cancellationToken)
    {

        if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin) 
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the admin can add students!", ErrorCodes.CannotAdd));
        }

        var subject = await _repository.GetAsync(new SubjectEntityProjectionSpec(studentSubjectIds.SubjectId), cancellationToken);
        if (subject == null)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Bad subject Id provided!", ErrorCodes.EntityNotFound));
        }

        var student = await _repository.GetAsync(new UserSpec(studentSubjectIds.StudentId), cancellationToken);
        if (student == null)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.NotFound, "Bad student id provided!", ErrorCodes.EntityNotFound));
        }

        // Verify if student is enrolled
        foreach (SubjectUser SubjectUser in subject.SubjectUsers) { 
            if((SubjectUser.UserId ==  student.Id) || (SubjectUser.SubjectId == subject.SubjectId)){
                return ServiceResponse.FromError(new(HttpStatusCode.NotFound, "Student already enroled!", ErrorCodes.UserAlreadyExists));
            }
        }

        var SubjectUserResult = await _subjectUser.AddSubjectUser(subject.SubjectId, student.Id, requestingUser, cancellationToken);
        if (SubjectUserResult == null)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Subject User could not be added provided!", ErrorCodes.CannotAdd));
        }
        SubjectUser newSubjectUser = new SubjectUser
        {
            Subject = subject,
            User = student,
            SubjectId = subject.SubjectId,
            UserId = student.Id,
        };

        
        if (subject.SubjectUsers != null) {
            subject.SubjectUsers.Add(newSubjectUser);
        }
        else {
            var SubjectUsers = new List<SubjectUser>();
            SubjectUsers.Add(newSubjectUser);
            subject.SubjectUsers = SubjectUsers;   
        }
      
        await _repository.UpdateAsync(subject, cancellationToken);  
        

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
        var Students = new List<User>();

        if (subject.StudentIds != null)
        {
            foreach (Guid id in subject.StudentIds)
            {
                var student = await _repository.GetAsync(new UserSpec(id), cancellationToken);
                if (student == null)
                {
                    return ServiceResponse.FromError(new(HttpStatusCode.NotFound, "Bad student id provided", ErrorCodes.EntityNotFound));
                }
                Students.Add(student);
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
           // Students = Students
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
        var Students = new List<User>();
        Students = null;

        if (subject.StudentIds != null)
        {
            foreach (Guid id in subject.StudentIds)
            {
                var student = await _repository.GetAsync(new UserSpec(id), cancellationToken);
                if (student == null)
                {
                    return ServiceResponse.FromError(new(HttpStatusCode.NotFound, "Bad student id provided", ErrorCodes.EntityNotFound));
                }
                Students.Add(student);
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
            //entity.Students = Students ?? entity.Students;
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
