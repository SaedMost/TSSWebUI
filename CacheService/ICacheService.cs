namespace market.sencard.com.tr.Cache
{
    public interface ICacheService
    {
        T GetItem<T>(string key);
        void SetItem<T>(string key, T item, int? minutes);
        void Remove(string key);
    }
}