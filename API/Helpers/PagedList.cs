using Microsoft.EntityFrameworkCore;

namespace API.Helpers;

public class PagedList<T> : List<T>
{
    public int CurrentPage { get; set; }
    public int TotalPages { get; set; }
    public int PageSize { get; set; }
    public int TotalCount { get; set; }
    
    public PagedList(IEnumerable<T> items, int count, int pageIndex, int pageSize)
    {
        CurrentPage = pageIndex;
        TotalPages = (int)Math.Ceiling(count / (double)pageSize);
        PageSize = pageSize;
        TotalCount = count;
        AddRange(items);
    }

    public static async Task<PagedList<T>> CreateAsync(IQueryable<T> query, int pageIndex, int pageSize)
    {
        var count = await query.CountAsync();
        var items = await query.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToListAsync();
        return new PagedList<T>(items, count, pageIndex, pageSize);
    }
}