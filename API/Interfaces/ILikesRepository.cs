using API.DTOs;
using API.Helpers;
using API.Models;

namespace API.Interfaces;

public interface ILikesRepository
{
    Task<UserLike?> GetUserLikeAsync(int sourceUserId, int targetUserId);
    Task<PagedList<MemberDto>> GetUserLikesAsync(LikesParams likesParams);
    Task<IEnumerable<int>> GetUserLikesIdsAsync(int currentUserId);
    void DeleteLike(UserLike like);
    void AddLike(UserLike like);
    Task<bool> SaveChangesAsync();
}