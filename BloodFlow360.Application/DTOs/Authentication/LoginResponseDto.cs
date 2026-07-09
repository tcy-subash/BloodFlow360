namespace BloodFlow360.Application.DTOs.Authentication;

public class LoginResponseDto
{
    public string Token { get; set; } = string.Empty;

    public DateTime Expiration { get; set; }
}