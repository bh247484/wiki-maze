using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using asp_net_app.Data;
using asp_net_app.Models;

namespace asp_net_app.Controllers;

[ApiController]
[Route("[controller]")]
public class TestController : ControllerBase
{
  private readonly ILogger<TestController> _logger;
  private readonly ApiDbContext _context;
  public class TestProps {
    public string name { get; set; }
  }

  public TestController(
    ILogger<TestController> logger,
    ApiDbContext context
  )
  {
      _logger = logger;
      _context = context;
  }

  [HttpPost(Name = "PostTest")]
  public async Task<Test> Create(TestProps testProps)
  {
    var newTest = new Test()
    {
      Name = testProps.name
    };

    _context.Add(newTest);
    await _context.SaveChangesAsync();

    return newTest;
  }

  [HttpGet(Name = "GetTest")]
  public async Task<IActionResult> GetAll() {
    var allTests = await _context.Tests.ToListAsync();
    return Ok(allTests);
  }
}
