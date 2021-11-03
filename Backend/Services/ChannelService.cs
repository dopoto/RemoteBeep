using Microsoft.Extensions.Caching.Memory;

namespace Backend.Services
{
    

    public class ChannelService
    {
        //private Dictionary<string, List<string>> _groupMembers;

        //public ChannelService()
        //{
        //    _groupMembers = new Dictionary<string, List<string>>();
        //}

        //public int AddConnectionToChannel(string channelName, string connectionId)
        //{
        //    var devicesInCurrentChannel = GetDevicesInChannel(channelName);
        //    if (!devicesInCurrentChannel.Contains(connectionId))
        //    {
        //        devicesInCurrentChannel.Add(connectionId);
        //    }
        //    return devicesInCurrentChannel.Count;
        //}

        //private List<string> GetDevicesInChannel(string channelName)
        //{
        //    var devicesInCurrentChannel = _groupMembers.ContainsKey(channelName) ?
        //        _groupMembers[channelName] : new List<string>();

        //    return devicesInCurrentChannel;
        //}


        private IMemoryCache _cache;

        public ChannelService(IMemoryCache memoryCache)
        {
            _cache = memoryCache;
        }

        public int AddConnectionToChannel(string channelName, string connectionId)
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

            return devicesInCurrentChannel.Count;
        }

        public int RemoveConnectionFromChannel(string channelName, string connectionId)
        {
            // Set cache options.
            var cacheEntryOptions = new MemoryCacheEntryOptions()
                // Keep in cache for this time, reset time if accessed.
                .SetSlidingExpiration(TimeSpan.FromDays(1));

            List<string> devicesInCurrentChannel;

            _cache.TryGetValue(channelName, out devicesInCurrentChannel);

            if (devicesInCurrentChannel == null)
            {
                return 0;
            }

            if(devicesInCurrentChannel.Any(d => d == connectionId)){ 
                devicesInCurrentChannel.Remove(connectionId);
            }

            // Save data in cache.
            _cache.Set(channelName, devicesInCurrentChannel, cacheEntryOptions);

            return devicesInCurrentChannel.Count;
        }
    }
}
