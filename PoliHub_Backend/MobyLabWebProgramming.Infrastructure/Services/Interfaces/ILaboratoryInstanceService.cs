using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Requests;
using MobyLabWebProgramming.Core.Responses;

namespace MobyLabWebProgramming.Infrastructure.Services.Interfaces;

public interface ILaboratoryInstanceService
{
    public Task<ServiceResponse<LaboratoryInstanceDTO>> GetLaboratoryInstance(Guid id, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> AddUserToLaboratoryInstance(UserToLaboratoryInstanceAddDTO userLaboratoryInstanceIds, UserDTO? requestingUser, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> AddLaboratoryInstance(LaboratoryInstanceAddDTO laboratoryInstance, UserDTO? requestingUser = default, CancellationToken cancellationToken = default);
    public Task<ServiceResponse<PagedResponse<LaboratoryInstanceDTO>>> GetLaboratoryInstances(PaginationSearchQueryParams pagination, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> UpdateLaboratoryInstance(LaboratoryInstanceUpdateDTO laboratoryInstance, UserDTO? requestingUser = default, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> DeleteLaboratoryInstance(Guid id, UserDTO? requestingUser = default, CancellationToken cancellationToken = default);
}