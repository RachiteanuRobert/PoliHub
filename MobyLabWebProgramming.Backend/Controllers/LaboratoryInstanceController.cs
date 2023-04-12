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
public class LaboratoryInstanceController : AuthorizedController
{
    private readonly ILaboratoryInstanceService _laboratoryInstanceService;
    public LaboratoryInstanceController(IUserService userService, ILaboratoryInstanceService laboratoryInstanceService) : base(userService)
    {
        _laboratoryInstanceService = laboratoryInstanceService;
    }

    [Authorize]
    [HttpGet("{id:guid}")]
    public async Task<ActionResult<RequestResponse<LaboratoryInstanceDTO>>> GetById([FromRoute] Guid id)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _laboratoryInstanceService.GetLaboratoryInstance(id)) :
            this.ErrorMessageResult<LaboratoryInstanceDTO>(currentUser.Error);
    }

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<RequestResponse>> Add([FromBody] LaboratoryInstanceAddDTO laboratoryInstance)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _laboratoryInstanceService.AddLaboratoryInstance(laboratoryInstance, currentUser.Result)) :
            this.ErrorMessageResult(currentUser.Error);
    }

    [Authorize]
    [HttpPut]
    public async Task<ActionResult<RequestResponse>> Update([FromBody] LaboratoryInstanceUpdateDTO laboratoryInstance)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _laboratoryInstanceService.UpdateLaboratoryInstance(laboratoryInstance)) :
            this.ErrorMessageResult(currentUser.Error);
    }

    [Authorize]
    [HttpDelete("{id:guid}")]
    public async Task<ActionResult<RequestResponse>> Delete([FromRoute] Guid id)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _laboratoryInstanceService.DeleteLaboratoryInstance(id)) :
            this.ErrorMessageResult(currentUser.Error);
    }
}