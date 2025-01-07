using API.Interfaces;

namespace API.Data;

public class UnitOfWork : IUnitOfWork
{
    private readonly DataContext _context;
    public IUserRepository UserRepository { get; }
    public IMessageRepository MessageRepository { get; }
    public ILikesRepository LikesRepository { get; }
    public IPhotoRepository PhotoRepository { get; }
    
    public UnitOfWork(DataContext context, IUserRepository userRepository, IMessageRepository messageRepository, ILikesRepository likesRepository, IPhotoRepository photoRepository)
    {
        _context = context;
        UserRepository = userRepository;
        MessageRepository = messageRepository;
        LikesRepository = likesRepository;
        PhotoRepository = photoRepository;
    }
    
    public async Task<bool> CommitAsync()
    {
        return await _context.SaveChangesAsync() > 0;
    }

    public bool HasChanges()
    {
        return _context.ChangeTracker.HasChanges();
    }
}