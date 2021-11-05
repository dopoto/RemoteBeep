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
app.MapGet("/devices-in-channel", 
    (HttpContext context, ChannelService channelService) => 
        channelService.GetConnectionsByChannel(context.Request.Query["channelName"])
);


app.Run();


public class BeepHub : Hub
{
    private readonly ChannelService _channelService;

    public BeepHub(ChannelService channelService)
    {
        _channelService = channelService;
    }
 

    public async Task Play(string freqInKhz, string durationInSeconds, string channelName)
    {
        Console.WriteLine("Play -  freqInKhz=" + freqInKhz + ", durationInSeconds:" + durationInSeconds + ", channel:" + channelName);
        await Clients
            .Group(channelName)
            .SendAsync("playCommandReceived", freqInKhz, durationInSeconds);
    }

    public async Task Stop(string channelName)
    {
        Console.WriteLine("Stop, channel:" + channelName);
        await Clients
            .Group(channelName)
            .SendAsync("stopCommandReceived");
    }

    public async Task AddToChannel(string channelName)
    {
        _channelService.AddConnectionToChannel(channelName, Context.ConnectionId);
        await Groups.AddToGroupAsync(Context.ConnectionId, channelName);

        var devicesInCurrentChannel =_channelService.GetConnectionsByChannel(channelName);
        await Clients
            .Group(channelName)
            .SendAsync("addedToChannel", devicesInCurrentChannel);
    }

    public async Task RemoveFromChannel(string channelName)
    {
        _channelService.RemoveConnectionFromChannel(channelName, Context.ConnectionId);
        await Groups.RemoveFromGroupAsync(Context.ConnectionId, channelName);

        var devicesInCurrentChannel = _channelService.GetConnectionsByChannel(channelName);
        await Clients
            .Group(channelName)
            .SendAsync("removedFromChannel", devicesInCurrentChannel);        
    }

}


