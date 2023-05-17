using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Entities;
using MobyLabWebProgramming.Core.Requests;
using MobyLabWebProgramming.Core.Responses;
using MobyLabWebProgramming.Infrastructure.Authorization;
using MobyLabWebProgramming.Infrastructure.Extensions;
using MobyLabWebProgramming.Infrastructure.Services.Implementations;
using MobyLabWebProgramming.Infrastructure.Services.Interfaces;

namespace MobyLabWebProgramming.Backend.Controllers;

[ApiController]
[Route("api/[controller]/[action]")]
public class LaboratoryController : AuthorizedController
{
    private readonly ILaboratoryService _laboratoryService;
    public LaboratoryController(IUserService userService, ILaboratoryService laboratoryService) : base(userService)
    {
        _laboratoryService = laboratoryService;
    }


    [HttpGet("{id:guid}")]
    public async Task<ActionResult<RequestResponse<LaboratoryDTO>>> GetById([FromRoute] Guid id)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _laboratoryService.GetLaboratoryById(id)) :
            this.ErrorMessageResult<LaboratoryDTO>(currentUser.Error);
    }

    [HttpGet]
    public async Task<ActionResult<RequestResponse<PagedResponse<LaboratoryDTO>>>> GetPage([FromQuery] PaginationSearchQueryParams pagination)
    {
        return this.FromServiceResponse(await _laboratoryService.GetLaboratories(pagination));
    }

    [HttpGet]
    public async Task<ActionResult<RequestResponse<LaboratoryDTO>>> GetByName([FromRoute] string assistantName)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _laboratoryService.GetLaboratoryByName(assistantName)) :
            this.ErrorMessageResult<LaboratoryDTO>(currentUser.Error);
    }

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<RequestResponse>> AddStudentToLaboratory([FromBody] StudentToLaboratoryAddDTO studentLaboratoryIds)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _laboratoryService.AddStudentToLaboratory(studentLaboratoryIds, currentUser.Result)) :
            this.ErrorMessageResult(currentUser.Error);
    }

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<RequestResponse>> Add([FromBody] LaboratoryAddDTO laboratory)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _laboratoryService.AddLaboratory(laboratory, currentUser.Result)) :
            this.ErrorMessageResult(currentUser.Error);
    }

    [Authorize]
    [HttpPut]
    public async Task<ActionResult<RequestResponse>> Update([FromBody] LaboratoryUpdateDTO laboratory)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _laboratoryService.UpdateLaboratory(laboratory)) :
            this.ErrorMessageResult(currentUser.Error);
    }

    [Authorize]
    [HttpDelete("{id:guid}")]
    public async Task<ActionResult<RequestResponse>> Delete([FromRoute] Guid id)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _laboratoryService.DeleteLaboratory(id)) :
            this.ErrorMessageResult(currentUser.Error);
    }
}