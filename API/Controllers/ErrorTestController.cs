using API.Data;
using API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class ErrorTestController :BaseApiController
{
    private readonly DataContext _context;
    public ErrorTestController(DataContext context)
    {
        _context = context;
    }

    [Authorize]
    [HttpGet("auth")]
    public ActionResult<string> GetAuth()
    {
        return "secret text";
    }
    
    [HttpGet("not-found")]
    public ActionResult<AppUser> GetNotFound()
    {
        var thing = _context.Users.Find(-1);
        if (thing == null)
            return NotFound();
        return thing;
    }
    
    [HttpGet("server-error")]
    public ActionResult<AppUser> GetServerError()
    {
        var thing = _context.Users.Find(-1) ?? throw new Exception("User not found");
        return thing;
    }
    
    [HttpGet("bad-request")]
    public ActionResult<string> GetBadRequest()
    {
        return BadRequest("Bad Request");
    }
}