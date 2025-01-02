using System.Security.Claims;

namespace API.Extensions;

public static class ClaimsPrincipleExtensions
{
    public static string GetUsername(this ClaimsPrincipal user)
    {
        var username = user.FindFirstValue(ClaimTypes.Name)
                       ?? throw new Exception("Cannot get username from token.");

        return username;
    }

    public static int GetUserId(this ClaimsPrincipal user)
    {
        var userId = user.FindFirstValue(ClaimTypes.NameIdentifier)
                     ?? throw new Exception("Cannot get user ID from token.");

        return int.Parse(userId);
    }
}