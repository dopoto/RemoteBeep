using Microsoft.AspNetCore.SignalR;

var builder = WebApplication.CreateBuilder(args);



// Add services to the container.

builder.Services.AddSignalR();
builder.Services.AddCors();

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
