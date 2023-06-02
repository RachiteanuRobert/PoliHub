using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Requests;
using MobyLabWebProgramming.Core.Responses;
using MobyLabWebProgramming.Infrastructure.Authorization;
using MobyLabWebProgramming.Infrastructure.Extensions;
using MobyLabWebProgramming.Infrastructure.Services.Interfaces;

namespace MobyLabWebProgramming.Backend.Controllers;

[ApiController]
[Route("api/[controller]/[action]")]
public class SubjectController : AuthorizedController
{
    private readonly ISubjectService _subjectService;
    public SubjectController(IUserService userService, ISubjectService subjectService) : base(userService)
    {
        _subjectService = subjectService;
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<RequestResponse<SubjectDTO>>> GetById([FromRoute] Guid id)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _subjectService.GetSubjectById(id)) :
            this.ErrorMessageResult<SubjectDTO>(currentUser.Error);
    }

    [HttpGet]
    public async Task<ActionResult<RequestResponse<PagedResponse<SubjectDTO>>>> GetPage([FromQuery] PaginationSearchQueryParams pagination)
    {
        return this.FromServiceResponse(await _subjectService.GetSubjects(pagination));
    }

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<RequestResponse>> Add([FromBody] SubjectAddDTO subject)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _subjectService.AddSubject(subject, currentUser.Result)) :
            this.ErrorMessageResult(currentUser.Error);
    }

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<RequestResponse>> AddUserToSubject([FromBody] UserToSubjectDTO userSubjectIds)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _subjectService.AddUserToSubject(userSubjectIds, currentUser.Result)) :
            this.ErrorMessageResult(currentUser.Error);
    }

    [Authorize]
    [HttpDelete("{userSubjectId:guid}")]
    public async Task<ActionResult<RequestResponse>> DeleteUserFromSubject([FromRoute] Guid userSubjectId)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _subjectService.DeleteUserFromSubject(userSubjectId, currentUser.Result)) :
            this.ErrorMessageResult(currentUser.Error);
    }

    [Authorize]
    [HttpPut]
    public async Task<ActionResult<RequestResponse>> Update([FromBody] SubjectUpdateDTO subject)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _subjectService.UpdateSubject(subject)) :
            this.ErrorMessageResult(currentUser.Error);
    }

    [Authorize]
    [HttpDelete("{id:guid}")]
    public async Task<ActionResult<RequestResponse>> Delete([FromRoute] Guid id)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _subjectService.DeleteSubject(id)) :
            this.ErrorMessageResult(currentUser.Error);
    }

    
}