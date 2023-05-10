using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Requests;
using MobyLabWebProgramming.Core.Responses;
using MobyLabWebProgramming.Infrastructure.Authorization;
using MobyLabWebProgramming.Infrastructure.Extensions;
using MobyLabWebProgramming.Infrastructure.Services.Implementations;
using MobyLabWebProgramming.Infrastructure.Services.Interfaces;

namespace MobyLabWebProgramming.Backend.Controllers;

[ApiController]
[Route("api/[controller]/[action]")]
public class CourseInstanceController : AuthorizedController
{
    private readonly ICourseInstanceService _courseInstanceService;
    public CourseInstanceController(IUserService userService, ICourseInstanceService courseInstanceService) : base(userService)
    {
        _courseInstanceService = courseInstanceService;
    }


    [HttpGet("{id:guid}")]
    public async Task<ActionResult<RequestResponse<CourseInstanceDTO>>> GetById([FromRoute] Guid id)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _courseInstanceService.GetCourseInstance(id)) :
            this.ErrorMessageResult<CourseInstanceDTO>(currentUser.Error);
    }

    /*
    [HttpGet]
    public async Task<ActionResult<RequestResponse<PagedResponse<CourseInstanceDTO>>>> GetPage([FromQuery] PaginationSearchQueryParams pagination)
    {
        return this.FromServiceResponse(await _courseInstanceService.GetCourseInstances(pagination));
    }
    */

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<RequestResponse>> Add([FromBody] CourseInstanceAddDTO courseInstance)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _courseInstanceService.AddCourseInstance(courseInstance, currentUser.Result)) :
            this.ErrorMessageResult(currentUser.Error);
    }

    [Authorize]
    [HttpPut]
    public async Task<ActionResult<RequestResponse>> Update([FromBody] CourseInstanceUpdateDTO courseInstance)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _courseInstanceService.UpdateCourseInstance(courseInstance)) :
            this.ErrorMessageResult(currentUser.Error);
    }

    [Authorize]
    [HttpDelete("{id:guid}")]
    public async Task<ActionResult<RequestResponse>> Delete([FromRoute] Guid id)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _courseInstanceService.DeleteCourseInstance(id)) :
            this.ErrorMessageResult(currentUser.Error);
    }
}