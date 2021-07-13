using Dapper;
using MySqlConnector;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace WebAppIdentityServer.Data.EF.Dapper
{
    public interface IBaseDapper : IDisposable
    {
        MySqlConnection GetDbConnection();
        Task<T> Get<T>(string sp, DynamicParameters parameters, CommandType commandType = CommandType.StoredProcedure);
        Task<IEnumerable<T>> Execute<T>(string sp, DynamicParameters parameters, CommandType commandType = CommandType.StoredProcedure);
        Task<T> Insert<T>(string sp, DynamicParameters parameters, CommandType commandType = CommandType.StoredProcedure);
        Task<T> Update<T>(string sp, DynamicParameters parameters, CommandType commandType = CommandType.StoredProcedure);
    }
}
