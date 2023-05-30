using asp_net_app.Models;
using Microsoft.EntityFrameworkCore;

namespace asp_net_app.Data;

public class ApiDbContext : DbContext {

  public ApiDbContext(DbContextOptions<ApiDbContext> options)
    : base(options)
  {

  }

  public DbSet<Test> Tests { get; set; }
  public DbSet<HighScore> HighScores { get; set; }
  
}