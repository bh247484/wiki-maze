using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using asp_net_app.Data;
using asp_net_app.Models;

namespace asp_net_app.Controllers;

[ApiController]
[Route("[controller]")]
public class HighScoreController : ControllerBase
{
  private readonly ApiDbContext _context;
  public class ScoreParams {
    public List<string> path { get; set; } = default!;
    public string name { get; set; } = default!;
    public int seconds { get; set; } = default!;
    public int strokes { get; set; } = default!;
  }

  public HighScoreController(ApiDbContext context)
  {
      _context = context;
  }

  private int CalculateStrokes(int seconds, int pathLen) {
    // Casting to int rounds down.
    int timePenalty = (int)(seconds / 30);

    return timePenalty + pathLen - 1;
  }

  [HttpPost(Name = "PostHighScore")]
  public async Task<HighScore> Create(ScoreParams scoreParams)
  {
    var newHighScore = new HighScore()
    {
      Path = scoreParams.path,
      Name = scoreParams.name,
      Seconds = scoreParams.seconds,
      Strokes = scoreParams.strokes
    };

    // If there's already 10 high scores, remove the lowest score.
    var allHighScores = await _context.HighScores.ToListAsync();
    if (allHighScores.Count == 10) {
      allHighScores.Sort((a,b) => a.Strokes - b.Strokes);
      HighScore worstScore = allHighScores[allHighScores.Count - 1];
      _context.HighScores.Remove(worstScore);
    }

    _context.HighScores.Add(newHighScore);
    await _context.SaveChangesAsync();

    return newHighScore;
  }

  [HttpGet(Name = "GetHighScore")]
  public async Task<IActionResult> GetAll() {
    var allHighScores = await _context.HighScores.ToListAsync();
    return Ok(allHighScores);
  }
}
