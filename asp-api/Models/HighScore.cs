namespace asp_net_app.Models;

public class HighScore 
{
  public int Id { get; set; } = default!;
  public string Name { get; set; } = default!;
  public List<string> Path { get; set; } = default!;
  public int Seconds { get; set; } = default!;
  public int Strokes { get; set; } = default!;

}