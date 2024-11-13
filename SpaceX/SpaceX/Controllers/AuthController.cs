using Entity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace SpaceX.Controllers
{
    [ApiController]
    [Route("auth")]
    public class AuthController : Controller
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly IConfiguration _configuration;
        public AuthController(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
        }

        //register
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User user)
        {
            var u = new IdentityUser { UserName = user.Email, Email = user.Email };
            var result = await _userManager.CreateAsync(u, user.Password);

            if (result.Succeeded)
            {
                return Ok(new { message = "User is successfuly registered" });
            }
            return BadRequest(result.Errors);
        }

        //login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] User user)
        {
            var u = await _userManager.FindByNameAsync(user.Email);

            if(u != null && await _userManager.CheckPasswordAsync(u, user.Password))
            {
                  var securityKey = new SymmetricSecurityKey(
              Encoding.ASCII.GetBytes(_configuration["Authentication:SecretForKey"]));
            
            var signingCredentials = new SigningCredentials(
                securityKey, SecurityAlgorithms.HmacSha256);
            var authClaims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };
                var token = new JwtSecurityToken(
                    issuer: _configuration["Authentication:Issuer"],
                    expires: DateTime.Now.AddMinutes(double.Parse(_configuration["Authentication:ExpiryMinutes"])),
                    claims: authClaims,
                    signingCredentials: signingCredentials);
                return Ok(new { Email = user.Email, Token = new JwtSecurityTokenHandler().WriteToken(token) });
            }
            return Unauthorized();
        }

        //logout
        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return Ok(new {Message = "User logged out successfully"});
        }
    }
}
