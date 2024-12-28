using System.Security.Claims;
using API.Data;
using API.DTOs;
using API.Interfaces;
using API.Models;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[Authorize]
public class UsersController : BaseApiController
{
    private readonly IUserRepository _userRepository;
    private readonly IMapper _mapper;
    
    public UsersController(IUserRepository userRepository, IMapper mapper)
    {
        _userRepository = userRepository;
        _mapper = mapper;
    }
    
    [HttpGet]
    public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
    {
        var users = await _userRepository.GetMembersAsync();
        
        return Ok(users);
    }
    
    [HttpGet("{username}")]
    public async Task<ActionResult<MemberDto>> GetUser(string username)
    {
        var user = await _userRepository.GetMemberAsync(username);
        if(user == null)
            return NotFound();
        
        return user;
    }

    [HttpPut]
    public async Task<ActionResult> UpdateUser(MemberUpdateDto member)
    {
        var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        
        if(username == null)
            return BadRequest("Username could not be found");

        var user = await _userRepository.GetUserByUsernameAsync(username);
        if(user == null)
            return BadRequest("User could not be found");
        
        _mapper.Map(member, user);

        if (await _userRepository.SaveAllAsync())
            return NoContent();
        return BadRequest("Failed to update user");
    }
}