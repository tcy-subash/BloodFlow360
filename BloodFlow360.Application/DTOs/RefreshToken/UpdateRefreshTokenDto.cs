namespace BloodFlow360.Application.DTOs.RefreshToken;

public class UpdateRefreshTokenDto
{
    public string Token { get; set; } = string.Empty;

    public DateTime ExpiresAt { get; set; }

    public bool IsRevoked { get; set; }
}