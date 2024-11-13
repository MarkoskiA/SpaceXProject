

using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace SpaceX.Infrastructure
{
    public class UserDbContext: IdentityDbContext<IdentityUser>
    {
        public UserDbContext(DbContextOptions options): base(options)
        {

        }
    }
}
