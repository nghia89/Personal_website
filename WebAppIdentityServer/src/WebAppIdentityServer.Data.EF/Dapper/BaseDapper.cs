using Dapper;
using Microsoft.Extensions.Configuration;
using MySqlConnector;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace WebAppIdentityServer.Data.EF.Dapper
{
    public class BaseDapper : IBaseDapper
    {
        private readonly IConfiguration _config;
        private string Connectionstring = "DefaultConnection";

        public BaseDapper(IConfiguration config)
        {
            _config = config;
        }
        public void Dispose()
        {

        }

        public async Task<IEnumerable<T>> Execute<T>(string sp, DynamicParameters parameters, CommandType commandType = CommandType.StoredProcedure)
        {
            using (IDbConnection db = GetDbConnection())
            {
                if (db.State == ConnectionState.Closed)
                {
                    db.Open();
                }

                return await db.QueryAsync<T>(sp, parameters, commandType: commandType);
            }
        }

        public async Task<T> Get<T>(string sp, DynamicParameters parameters, CommandType commandType = CommandType.Text)
        {
            using (IDbConnection db = GetDbConnection())
            {
                if (db.State == ConnectionState.Closed)
                {
                    db.Open();
                }

                return await db.QueryFirstOrDefaultAsync<T>(sp, parameters, commandType: commandType);

            }
        }

        public MySqlConnection GetDbConnection()
        {
            return new MySqlConnection(_config.GetConnectionString(Connectionstring));
        }

        public async Task<T> Insert<T>(string sp, DynamicParameters parameters, CommandType commandType = CommandType.StoredProcedure)
        {
            T result;
            using IDbConnection db = GetDbConnection();
            try
            {
                if (db.State == ConnectionState.Closed)
                {
                    db.Open();
                }

                using var tran = db.BeginTransaction();
                try
                {
                    result = await db.QueryFirstOrDefaultAsync<T>(sp, parameters, commandType: commandType, transaction: tran);
                    tran.Commit();
                }
                catch (Exception ex)
                {
                    tran.Rollback();
                    throw ex;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (db.State == ConnectionState.Open)
                {
                    db.Close();
                }
            }

            return result;
        }

        public async Task<T> Update<T>(string sp, DynamicParameters parameters, CommandType commandType = CommandType.StoredProcedure)
        {
            T result;
            using IDbConnection db = GetDbConnection();
            try
            {
                if (db.State == ConnectionState.Closed)
                {
                    db.Open();
                }

                using var tran = db.BeginTransaction();
                try
                {
                    result = await db.QueryFirstOrDefaultAsync<T>(sp, parameters, commandType: commandType, transaction: tran);
                    tran.Commit();
                }
                catch (Exception ex)
                {
                    tran.Rollback();
                    throw ex;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (db.State == ConnectionState.Open)
                {
                    db.Close();
                }
            }

            return result;
        }
    }
}
