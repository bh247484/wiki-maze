namespace asp_net_app.Models;

public class HighScore 
{
  // Id as string so that 'Name' field can be used as primary key.
  public string Id { get; set; }
  public List<string> Path { get; set; }
  public int Seconds { get; set; }
  public int Strokes { get; set; }

}