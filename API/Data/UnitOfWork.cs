using API.Interfaces;

namespace API.Data;

public class UnitOfWork : IUnitOfWork
{
    private readonly DataContext _context;
    public IUserRepository UserRepository { get; }
    public IMessageRepository MessageRepository { get; }
    public ILikesRepository LikesRepository { get; }
    
    public UnitOfWork(IUserRepository userRepository, IMessageRepository messageRepository, ILikesRepository likesRepository, DataContext context)
    {
        UserRepository = userRepository;
        MessageRepository = messageRepository;
        LikesRepository = likesRepository;
        _context = context;
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