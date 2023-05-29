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
public class CourseController : AuthorizedController
{
    private readonly ICourseService _courseService;
    public CourseController(IUserService userService, ICourseService courseService) : base(userService)
    {
        _courseService = courseService;
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<RequestResponse<CourseDTO>>> GetById([FromRoute] Guid id)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _courseService.GetCourseById(id)) :
            this.ErrorMessageResult<CourseDTO>(currentUser.Error);
    }

    [HttpGet]
    public async Task<ActionResult<RequestResponse<PagedResponse<CourseDTO>>>> GetPage([FromQuery] PaginationSearchQueryParams pagination)
    {
        return this.FromServiceResponse(await _courseService.GetCourses(pagination));
    }

    
    [Authorize]
    [HttpPost]
    public async Task<ActionResult<RequestResponse>> AddUserToCourse([FromBody] UserToCourseAddDTO userCourseIds)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _courseService.AddUserToCourse(userCourseIds, currentUser.Result)) :
            this.ErrorMessageResult(currentUser.Error);
    }

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<RequestResponse>> Add([FromBody] CourseAddDTO course)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _courseService.AddCourse(course, currentUser.Result)) :
            this.ErrorMessageResult(currentUser.Error);
    }
    

    [Authorize]
    [HttpPut]
    public async Task<ActionResult<RequestResponse>> Update([FromBody] CourseUpdateDTO course)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _courseService.UpdateCourse(course)) :
            this.ErrorMessageResult(currentUser.Error);
    }

    [Authorize]
    [HttpDelete("{id:guid}")]
    public async Task<ActionResult<RequestResponse>> Delete([FromRoute] Guid id)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _courseService.DeleteCourse(id)) :
            this.ErrorMessageResult(currentUser.Error);
    }
}