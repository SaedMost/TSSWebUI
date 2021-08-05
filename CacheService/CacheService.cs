using System;
using System.Text;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;

namespace market.sencard.com.tr.Cache
{
    public class CacheService : ICacheService
    {
        private readonly IDistributedCache cache;
        private readonly IOptions<JsonSerializerSettings> options;

        public CacheService(IDistributedCache cache, IOptions<JsonSerializerSettings> options)
        {
            this.cache = cache;
            this.options = options;
            this.options.Value.MaxDepth = 100;
        }

        public T GetItem<T>(string key)
        {
            var cacheData = default(byte[]);
            try
            {
                cacheData = cache.Get(key);
            }
            catch
            {
                // ignored
            }

            return cacheData == null
                ? default
                : JsonConvert.DeserializeObject<T>(Encoding.UTF8.GetString(cacheData), options.Value);
        }

        public void SetItem<T>(string key, T item, int? minutes = null)
        {
            cache.SetAsync(key,
                Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(item, options.Value)),
                new DistributedCacheEntryOptions
                    {AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(minutes.HasValue ? minutes.Value : 14)});
        }

        public void Remove(string key)
        {
            cache.Remove(key);
        }
    }
}