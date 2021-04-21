using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAppIdentityServer.Business.Interfaces;
using WebAppIdentityServer.Data.EF.Entities;
using WebAppIdentityServer.Data.EF.Interfaces;
using WebAppIdentityServer.Repository.Interfaces;
using WebAppIdentityServer.ViewModel.Models.Common;

namespace WebAppIdentityServer.Business.Implementation
{
    public class FeedbackBusiness : BaseBusiness, IFeedbackBusiness
    {
        private IFeedbackRepository _feedbackRepository;
        private IUnitOfWork _unitOfWork;
        public FeedbackBusiness(IFeedbackRepository feedbackRepository,
           IUnitOfWork unitOfWork, IUserResolverService userResolver) : base(userResolver)
        {
            _feedbackRepository = feedbackRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task Add(FeedbackVM feedbackVm)
        {
            var page = new Feedback()
            {
                Email = feedbackVm.Email,
                Message = feedbackVm.Message,
                Name = feedbackVm.Name
            };
            await _feedbackRepository.AddAsync(page);
            await _unitOfWork.CommitAsync();
            return;
        }

        public async Task Delete(int id)
        {
            var data = await _feedbackRepository.GetByIdAsync(id);
            await _feedbackRepository.RemoveAsync(data);
            return;
        }

        public async Task<(List<FeedbackVM> data, long totalCount)> GetAllPaging(string keyword, int page, int pageSize)
        {
            var query = await _feedbackRepository.GetAllAsync(null);
            if (!string.IsNullOrEmpty(keyword))
            {
                query = query.Where(x => x.Name.Contains(keyword)).ToList();
            }

            int totalRow = query.Count();
            var data = query.OrderByDescending(x => x.DateCreated)
                .Skip((page - 1) * pageSize)
                .Take(pageSize);

            return (data.Select(x => new FeedbackVM()
            {
                Id = x.Id,
                Email = x.Email,
                Message = x.Message,
                Name = x.Name,
                Status = x.Status
            }).ToList(),
                 totalRow);
        }

        public async Task<FeedbackVM> GetById(int id)
        {
            var data = await _feedbackRepository.GetByIdAsync(id);
            return new FeedbackVM()
            {
                Id = data.Id,
                Email = data.Email,
                Message = data.Message,
                Name = data.Name,
                Status = data.Status

            };
        }
    }
}
