using System.Text.Json;
using API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class Seed
{
    public static async Task SeedUsers(UserManager<AppUser> userManager, RoleManager<AppRole> roleManager)
    {
        if(await userManager.Users.AnyAsync()) 
            return;
        
        var userData = await File.ReadAllTextAsync("Data/UserSeedData.json");

        var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
        
        var users = JsonSerializer.Deserialize<List<AppUser>>(userData, options);

        if(users == null)
            return;

        var roles = new List<AppRole>
        {
            new() { Name = "Admin" },
            new() { Name = "Moderator" },
            new() { Name = "Member" }
        };

        foreach (var role in roles)
        {
            await roleManager.CreateAsync(role);
        }
        
        foreach (var user in users)
        {
            user.UserName = user.UserName!.ToLower();
            await userManager.CreateAsync(user, "Pa$$w0rd");
            await userManager.AddToRoleAsync(user, "Member");
            
            foreach (var photo in user.Photos)
            {
                photo.IsApproved = true;
            }
        }
        
        var admin = new AppUser
        {
            UserName = "admin",
            KnownAs = "Admin",
            Gender = "",
            City = "",
            Country = "",
        };
        
        await userManager.CreateAsync(admin, "Pa$$w0rd");
        await userManager.AddToRolesAsync(admin, ["Admin", "Moderator"]);
    }
}