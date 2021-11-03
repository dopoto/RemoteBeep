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

builder.Services.AddSignalR();
builder.Services.AddCors();
builder.Services.AddApplicationInsightsTelemetry(environmentSettings.ApplicationInsightsInstrumentationKey);

var app = builder.Build();

// TODO
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
    public async Task NewMessage(string freqInKhz, string durationInSeconds, string channelName)
    {
        Console.WriteLine("NewMessage -  freqInKhz=" + freqInKhz + ", durationInSeconds:" + durationInSeconds + ", channel:" + channelName);
        await Clients.Group(channelName).SendAsync("messageReceived", freqInKhz, durationInSeconds);
    }

    public async Task AddToChannel(string channelName)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, channelName);
        await Clients.Group(channelName)
            .SendAsync("addedToChannel", $"{Context.ConnectionId} has joined the channel {channelName}.");
    }

    public async Task RemoveFromChannel(string channelName)
    {
        await Groups.RemoveFromGroupAsync(Context.ConnectionId, channelName);
        await Clients.Group(channelName)
            .SendAsync("removedFromChannel", $"{Context.ConnectionId} has left the channel {channelName}.");
    }
}


