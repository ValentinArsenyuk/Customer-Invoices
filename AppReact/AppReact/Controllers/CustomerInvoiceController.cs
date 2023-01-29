using Microsoft.AspNetCore.Mvc;
using AppReact.Models;

namespace AppReact.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerInvoiceController : ControllerBase
    {

        private readonly DBTestContext _dbContext;

        public CustomerInvoiceController(DBTestContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        [Route("GetCustomerInvoices")]
        public IActionResult GetCustomerInvoices() { 
            List<CustomerInvoice> list = _dbContext.CustomerInvoices.ToList();
            return StatusCode(StatusCodes.Status200OK, list);
        }

        [HttpGet]
        [Route("CreateCustomerInvoice/{date}/{status}/{amount}")]
        public IActionResult CreateCustomerInvoice(string date, string status, int amount)
        {
            if(DateTime.TryParse(date, out DateTime d))
            {
                var customerInvoice = new CustomerInvoice { Date = d, Status = status, Amount = amount };
                _dbContext.Add<CustomerInvoice>(customerInvoice);
                _dbContext.SaveChanges();
                return StatusCode(StatusCodes.Status200OK);
            }
            return BadRequest();    
        }

        [HttpGet]
        [Route("EditCustomerInvoice/{id}/{date}/{status}/{amount}")]
        public IActionResult EditCustomerInvoice(int id, string date, string status, int amount)
        {
            if (DateTime.TryParse(date, out DateTime d))
            {
                var customerInvoice = new CustomerInvoice { Date = d, Status = status, Amount = amount };


                var result = _dbContext.CustomerInvoices.SingleOrDefault(b => b.Id == id);
                if (result != null)
                {
                    result.Date = d;
                    result.Status = status;
                    result.Amount = amount;

                    _dbContext.SaveChanges();
                }

                return StatusCode(StatusCodes.Status200OK);
            }
            return BadRequest();
        }
    }
}
