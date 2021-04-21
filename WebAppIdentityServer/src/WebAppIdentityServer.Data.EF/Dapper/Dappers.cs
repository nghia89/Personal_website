using Dapper;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace WebAppIdentityServer.Data.EF.Dapper
{
    public class Dappers : IDapper
    {
        private readonly IConfiguration _config;
        private string Connectionstring = "DefaultConnection";

        public Dappers(IConfiguration config)
        {
            _config = config;
        }
        public void Dispose()
        {

        }

        public async Task<IEnumerable<T>> Execute<T>(string sp, DynamicParameters parms, CommandType commandType = CommandType.StoredProcedure)
        {
            using (IDbConnection db = GetDbconnection())
            {
                if (db.State == ConnectionState.Closed)
                {
                    db.Open();
                }

                return await db.QueryAsync<T>(sp, parms, commandType: commandType);
            }
        }

        public async Task<T> Get<T>(string sp, DynamicParameters parms, CommandType commandType = CommandType.Text)
        {
            using (IDbConnection db = GetDbconnection())
            {
                if (db.State == ConnectionState.Closed)
                {
                    db.Open();
                }

                return await db.QueryFirstOrDefaultAsync<T>(sp, parms, commandType: commandType);

            }
        }

        public MySqlConnection GetDbconnection()
        {
            return new MySqlConnection(_config.GetConnectionString(Connectionstring));
        }

        public async Task<T> Insert<T>(string sp, DynamicParameters parms, CommandType commandType = CommandType.StoredProcedure)
        {
            T result;
            using IDbConnection db = GetDbconnection();
            try
            {
                if (db.State == ConnectionState.Closed)
                {
                    db.Open();
                }

                using var tran = db.BeginTransaction();
                try
                {
                    result = await db.QueryFirstOrDefaultAsync<T>(sp, parms, commandType: commandType, transaction: tran);
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

        public async Task<T> Update<T>(string sp, DynamicParameters parms, CommandType commandType = CommandType.StoredProcedure)
        {
            T result;
            using IDbConnection db = GetDbconnection();
            try
            {
                if (db.State == ConnectionState.Closed)
                {
                    db.Open();
                }

                using var tran = db.BeginTransaction();
                try
                {
                    result = await db.QueryFirstOrDefaultAsync<T>(sp, parms, commandType: commandType, transaction: tran);
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
