using Pathsala.DTOs;

namespace Pathsala.Services
{
    public interface IOrderService
    {
        //Task<OrderResponseDto> CreateOrderAsync(OrderRequestDto dto, string userId);
        Task<List<OrderResponseDto>> GetUserOrdersAsync(string userId);
        Task<List<OrderResponseDto>> GetAllOrdersAsync();
        //Task<bool> CancelOrderAsync(int orderId, string userId);
        Task<OrderResponseDto> CreateOrderAsync(OrderRequestDto dto, string userId);
        Task CancelOrderAsync(int orderId, string userId);
       

    }

}
