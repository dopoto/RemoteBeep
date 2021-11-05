using Microsoft.Extensions.Caching.Memory;

namespace Backend.Services;




public class ChannelService
{

    private IMemoryCache _cache;

    public ChannelService(IMemoryCache memoryCache)
    {
        _cache = memoryCache;
    }

    public void AddConnectionToChannel(string channelName, string connectionId)
    {
        // Set cache options.
        var cacheEntryOptions = new MemoryCacheEntryOptions()
            // Keep in cache for this time, reset time if accessed.
            .SetSlidingExpiration(TimeSpan.FromDays(1));

        List<string> devicesInCurrentChannel;

        _cache.TryGetValue(channelName, out devicesInCurrentChannel);
            
        if(devicesInCurrentChannel == null)
        {
            devicesInCurrentChannel = new List<string>();
        }

        devicesInCurrentChannel.Add(connectionId);

        // Save data in cache.
        _cache.Set(channelName, devicesInCurrentChannel, cacheEntryOptions);
    }

    public void RemoveConnectionFromChannel(string channelName, string connectionId)
    {
        // Set cache options.
        var cacheEntryOptions = new MemoryCacheEntryOptions()
            // Keep in cache for this time, reset time if accessed.
            .SetSlidingExpiration(TimeSpan.FromDays(1));

        List<string> devicesInCurrentChannel;

        _cache.TryGetValue(channelName, out devicesInCurrentChannel);

        if (devicesInCurrentChannel == null)
        {
            return;
        }

        if(devicesInCurrentChannel.Any(d => d == connectionId)){ 
            devicesInCurrentChannel.Remove(connectionId);
        }

        // Save data in cache.
        _cache.Set(channelName, devicesInCurrentChannel, cacheEntryOptions);
    }

    public List<string> GetConnectionsByChannel(string channelName) {
        List<string> devicesInCurrentChannel;
        _cache.TryGetValue(channelName, out devicesInCurrentChannel);
        return devicesInCurrentChannel ?? new List<string>();
    }
}
