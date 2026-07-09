using BloodFlow360.Application.DTOs.Authentication;

namespace BloodFlow360.Application.Interfaces.Authentication;

public interface IAuthenticationService
{
    Task<AuthenticationResponse> RegisterAsync(RegisterRequest request);

    Task<AuthenticationResponse> LoginAsync(LoginRequest request);
}