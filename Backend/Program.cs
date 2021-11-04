using Backend.Services;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Caching.Memory;
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
//builder.Services.AddCors(options =>
//{
//    var frontEndUrl = environmentSettings.FrontEndUrl ?? "";
//    var allowedOrigins = new[] { frontEndUrl };
//    options.AddDefaultPolicy(builder =>
//    {
//        builder.WithOrigins(allowedOrigins).AllowAnyHeader().AllowAnyMethod();
//    });
//});
builder.Services.AddApplicationInsightsTelemetry(environmentSettings.ApplicationInsightsInstrumentationKey);
builder.Services.Add(ServiceDescriptor.Singleton<IMemoryCache, MemoryCache>());

builder.Services.AddSingleton<ChannelService>();

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseCors(builder =>
{
    builder.WithOrigins(environmentSettings.FrontEndUrl ?? "");
    builder.AllowAnyHeader();
    builder.AllowAnyMethod();
});

app.UseHttpsRedirection();
app.UseRouting();
app.UseEndpoints(endpoints =>
{
    endpoints.MapHub<BeepHub>("/hub");
});

app.Run();


public class BeepHub : Hub
{
    private readonly ChannelService _channelService;

    public BeepHub(ChannelService channelService)
    {
        _channelService = channelService;
    }
 

    public async Task NewMessage(string freqInKhz, string durationInSeconds, string channelName)
    {
        Console.WriteLine("NewMessage -  freqInKhz=" + freqInKhz + ", durationInSeconds:" + durationInSeconds + ", channel:" + channelName);
        await Clients.Group(channelName).SendAsync("messageReceived", freqInKhz, durationInSeconds);
    }

    public async Task AddToChannel(string channelName)
    {
        var devicesInCurrentChannel = _channelService.AddConnectionToChannel(channelName, Context.ConnectionId);        
        await Clients.Group(channelName)
            .SendAsync("addedToChannel", devicesInCurrentChannel);
        await Groups.AddToGroupAsync(Context.ConnectionId, channelName);
    }

    public async Task RemoveFromChannel(string channelName)
    {
        var devicesInCurrentChannel = _channelService.RemoveConnectionFromChannel(channelName, Context.ConnectionId);
        await Clients.Group(channelName)
            .SendAsync("removedFromChannel", devicesInCurrentChannel);
        await Groups.RemoveFromGroupAsync(Context.ConnectionId, channelName);
    }

}


