using System.ComponentModel.DataAnnotations;

namespace LibAppApi.Models
{
    public class Book
    {
        [Key]
        public string finna_ID { get; set; }
        public string title { get; set; }
        public string image { get; set; }
        public string author {  get; set; }
        public int pages { get; set; }
        public string ISBN { get; set; }

        public Book()
        {

        }
    }
}
