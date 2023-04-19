using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Requests;
using MobyLabWebProgramming.Core.Responses;

namespace MobyLabWebProgramming.Infrastructure.Services.Interfaces;

public interface ILaboratoryService
{
    public Task<ServiceResponse<LaboratoryDTO>> GetLaboratoryByName(string assistantName, CancellationToken cancellationToken = default);
    public Task<ServiceResponse<LaboratoryDTO>> GetLaboratoryById(Guid id, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> AddLaboratory(LaboratoryAddDTO laboratory, UserDTO? requestingUser = default, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> UpdateLaboratory(LaboratoryUpdateDTO laboratory, UserDTO? requestingUser = default, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> DeleteLaboratory(Guid id, UserDTO? requestingUser = default, CancellationToken cancellationToken = default);
}