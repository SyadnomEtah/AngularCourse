using API.DTOs;
using API.Helpers;
using API.Models;

namespace API.Interfaces;

public interface IUserRepository
{
    void Update(AppUser user);
    Task<IEnumerable<AppUser>> GetUsersAsync();
    Task<AppUser?> GetUserByIdAsync(int userId);
    public Task<AppUser?> GetUserByPhotoIdAsync(int photoId);
    Task<AppUser?> GetUserByUsernameAsync(string username);
    Task<PagedList<MemberDto>> GetMembersAsync(UserParams userParams);
    Task<MemberDto> GetMemberAsync(string username, bool isCurrentUser);
}