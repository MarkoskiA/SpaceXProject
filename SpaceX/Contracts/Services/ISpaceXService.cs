using Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contracts.Services
{
    public interface ISpaceXService
    {
        Task<IEnumerable<SpaceXLaunch>> GetLauhcnes(string uid);
        Task<SpaceXLaunchDetails> GetSpecificLaunch(string uid);
    }
}
