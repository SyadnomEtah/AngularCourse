using API.DTOs;
using API.Helpers;
using API.Interfaces;
using API.Models;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class MessageRepository : IMessageRepository
{
    private readonly DataContext _context;
    private readonly IMapper _mapper;

    public MessageRepository(DataContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public void AddMessage(Message message)
    {
        _context.Messages.Add(message);
    }

    public void DeleteMessage(Message message)
    {
        _context.Messages.Remove(message);
    }

    public async Task<Message?> GetMessageAsync(int id)
    {
        return await _context.Messages.FindAsync(id);
    }

    public async Task<PagedList<MessageDto>> GetMessagesForUserAsync(MessageParams messageParams)
    {
        var query = _context.Messages
            .OrderByDescending(x => x.DateSent)
            .AsQueryable();

        query = messageParams.Container switch
        {
            "Inbox" => query.Where(x => x.Recipient.UserName == messageParams.Username && !x.RecipientDeleted),
            "Outbox" => query.Where(x => x.Sender.UserName == messageParams.Username && !x.SenderDeleted),
            _ => query.Where(x => x.Recipient.UserName == messageParams.Username && x.DateRead == null && !x.RecipientDeleted)
        };
        
        var messages = query.ProjectTo<MessageDto>(_mapper.ConfigurationProvider);
        
        return await PagedList<MessageDto>.CreateAsync(messages, messageParams.PageNumber, messageParams.PageSize);
    }

    public async Task<IEnumerable<MessageDto>> GetMessageThreadAsync(string currentUsername, string recipientUsername)
    {
        var messages = await _context.Messages
            .Include(x => x.Sender).ThenInclude(x => x.Photos)
            .Include(x => x.Recipient).ThenInclude(x => x.Photos)
            .Where(x => 
                x.RecipientUsername == currentUsername 
                && !x.RecipientDeleted 
                && x.SenderUsername == recipientUsername 
                || x.SenderUsername == currentUsername 
                && !x.SenderDeleted 
                && x.RecipientUsername == recipientUsername)
            .OrderBy(x => x.DateSent)
            .ToListAsync();
        
        var unreadMessages = messages.Where(x => x.DateRead == null 
                                                 && x.RecipientUsername == currentUsername).ToList();

        if (unreadMessages.Count != 0)
        {
            unreadMessages.ForEach(x => x.DateRead = DateTime.UtcNow);
            await _context.SaveChangesAsync();
        }
        
        return _mapper.Map<IEnumerable<MessageDto>>(messages);
    }

    public async Task<bool> SaveAllAsync()
    {
        return await _context.SaveChangesAsync() > 0;
    }
}