using LibAppApi.Controllers;
using LibAppApi.Repositories;
using Microsoft.EntityFrameworkCore;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<BooksContext>(options => options.UseNpgsql(@"Server=PostgreSQL 16;Host=localhost;Port=5432;Username=postgres;Password=admin;Database=libraryApp"));
builder.Services.AddControllers().AddNewtonsoftJson();
builder.Services.AddScoped<IGoogleBooksService, GoogleBooksService>();
builder.Services.AddHttpClient();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();

app.MapControllers();

app.Run();
