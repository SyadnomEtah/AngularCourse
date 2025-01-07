using API.DTOs;
using API.Models;

namespace API.Interfaces;

public interface IPhotoRepository
{
    public Task<IEnumerable<PhotoForApprovalDto>> GetUnapprovedPhotosAsync();
    public Task<Photo?> GetPhotoByIdAsync(int photoId);
    public void RemovePhoto(Photo photo);
}