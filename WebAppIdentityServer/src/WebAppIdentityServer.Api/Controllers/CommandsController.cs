using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAppIdentityServer.Api.Helpers;
using WebAppIdentityServer.Data.EF;
using WebAppIdentityServer.Data.EF.Entities;
using WebAppIdentityServer.ViewModel.Models.System;

namespace WebAppIdentityServer.Api.Controllers
{
    public class CommandsController : BaseController
    {
        private readonly ApplicationDbContext _context;

        public CommandsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet()]
        [Authorize]
        public async Task<IActionResult> GetCommants()
        {
            var commands = _context.Commands;

            var commandVms = await commands.Select(u => new CommandVm()
            {
                Id = u.Id,
                Name = u.Name,
            }).ToListAsync();

            return ToOkResult(commandVms);
        }

        [HttpPost()]
        [ApiValidationFilter]
        public async Task<IActionResult> Post([FromBody] CommandVm commandVm)
        {
            var commands = _context.Commands;
            var entity = new Command() { Id = commandVm.Id, Name = commandVm.Name };
            commands.Add(entity);
            await _context.SaveChangesAsync();

            return ToOkResult(commandVm);
        }

        [HttpGet("{functionId}")]
        public async Task<IActionResult> GetCommantsInFunction(string functionId)
        {
            var query = from a in _context.Commands
                        join cif in _context.CommandInFunctions on a.Id equals cif.CommandId into result1
                        from commandInFunction in result1.DefaultIfEmpty()
                        join f in _context.Functions on commandInFunction.FunctionId equals f.Id into result2
                        from function in result2.DefaultIfEmpty()
                        select new
                        {
                            a.Id,
                            a.Name,
                            commandInFunction.FunctionId
                        };

            query = query.Where(x => x.FunctionId == functionId);

            var data = await query.Select(x => new CommandVm()
            {
                Id = x.Id,
                Name = x.Name
            }).ToListAsync();

            return ToOkResult(data);
        }

        [HttpGet("{functionId}/not-in-function")]
        public async Task<IActionResult> GetCommantsNotInFunction(string functionId)
        {
            var query = from a in _context.Commands
                        join cif in _context.CommandInFunctions on a.Id equals cif.CommandId into result1
                        from commandInFunction in result1.DefaultIfEmpty()
                        join f in _context.Functions on commandInFunction.FunctionId equals f.Id into result2
                        from function in result2.DefaultIfEmpty()
                        select new
                        {
                            a.Id,
                            a.Name,
                            commandInFunction.FunctionId
                        };

            query = query.Where(x => x.FunctionId != functionId).Distinct();

            var data = await query.Select(x => new CommandVm()
            {
                Id = x.Id,
                Name = x.Name
            }).ToListAsync();

            return ToOkResult(data);
        }

        [HttpPost]
        [Route("command_to_function")]
        public async Task<IActionResult> PostCommandToFunction([FromBody] AddCommandToFunctionRequest request)
        {
            var commandInFunction = await _context.CommandInFunctions.FindAsync(request.CommandId, request.FunctionId);
            if (commandInFunction != null)
            {
                return BadRequest($"Lệnh này đã được thêm vào chức năng");
            }

            var entity = new CommandInFunction()
            {
                CommandId = request.CommandId,
                FunctionId = request.FunctionId
            };
            _context.CommandInFunctions.Add(entity);
            var result = await _context.SaveChangesAsync();

            if (result > 0)
            {
                return ToOkResult(await _context.CommandInFunctions.FindAsync(entity.CommandId, entity.FunctionId));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpDelete("{functionId}/{commandId}")]
        public async Task<IActionResult> PostCommandToFunction(string functionId, string commandId)
        {
            var commandInFunction = await _context.CommandInFunctions.FindAsync(functionId, commandId);
            if (commandInFunction == null)
            {
                return BadRequest($"Không tồn tại");
            }

            var entity = new CommandInFunction()
            {
                CommandId = commandId,
                FunctionId = functionId
            };
            _context.CommandInFunctions.Remove(entity);
            var result = await _context.SaveChangesAsync();

            if (result > 0)
            {
                return ToOkResult();
            }
            else
            {
                return BadRequest();
            }
        }
    }
}