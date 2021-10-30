using Microsoft.AspNetCore.SignalR;
using RemoteBeep.BackEnd.Models;

var builder = WebApplication.CreateBuilder(args);


var environmentSettings = builder.Configuration.Get<EnvironmentSpecificSettings>();
var environmentSettingsEntries = typeof(EnvironmentSpecificSettings).GetProperties();

builder.Configuration
    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
    .AddUserSecrets<EnvironmentSpecificSettings>(optional: true)
    .AddEnvironmentVariables();

// Add services to the container.

builder.Services
    .AddSignalR()
    .AddAzureSignalR();

builder.Services.AddCors();
builder.Services.AddApplicationInsightsTelemetry(environmentSettings.ApplicationInsightsInstrumentationKey);

var app = builder.Build();

app.UseCors(p =>
{
    p.AllowAnyOrigin();
    p.WithMethods("GET");
    p.AllowAnyHeader();
});

// Configure the HTTP request pipeline.

//app.UseCors(builder =>
//{
//    builder.WithOrigins("http://localhost:4220")
//        .AllowAnyHeader()
//        .WithMethods("GET", "POST")
//        .AllowCredentials();
//});

app.UseHttpsRedirection();
app.UseRouting();

app.UseEndpoints(endpoints =>
{
    endpoints.MapHub<BeepHub>("/hub");
});


app.Run();


public class BeepHub : Hub
{
    public async Task NewMessage(string freqInKhz, string durationInSeconds)
    {
        Console.WriteLine("NewMessage -  freqInKhz=" + freqInKhz + ", durationInSeconds:" + durationInSeconds);
        await Clients.All.SendAsync("messageReceived", freqInKhz, durationInSeconds);
    }
}
