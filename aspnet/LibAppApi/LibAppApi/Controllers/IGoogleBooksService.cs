namespace LibAppApi.Controllers
{
    public interface IGoogleBooksService
    {
        Task<string> GetCoverLink(string titleAndAuthor);
    }
}
