namespace BloodFlow360.Application.DTOs.RefreshToken;

public class CreateRefreshTokenDto
{
    public Guid UserId { get; set; }

    public string Token { get; set; } = string.Empty;

    public DateTime ExpiresAt { get; set; }

    public bool IsRevoked { get; set; }
}