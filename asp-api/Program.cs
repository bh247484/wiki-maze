using asp_net_app.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var connection = builder.Configuration.GetConnectionString("Default");

builder.Services.AddDbContext<ApiDbContext>(options => options.UseNpgsql(connection));

builder.Services.AddCors(options =>
{

  options.AddPolicy("CorsPolicy", policy =>
    {
      policy
        .WithOrigins("http://localhost:5173")
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Used for Docker port forwarding.
builder.WebHost.UseUrls("http://*:5000");

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapGet("/", () => "Hello World, change!");

System.Diagnostics.Debug.WriteLine("test from docker");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
