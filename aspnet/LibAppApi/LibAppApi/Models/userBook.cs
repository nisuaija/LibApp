using System.ComponentModel.DataAnnotations;

namespace LibAppApi.Models
{
    public class userBook
    {
        [Key]
        public string finna_ID { get; set; }
        public DateTime dueDate { get; set; }
        public DateTime startDate { get; set; }
        public DateTime endDate { get; set; }

        public int pagesRead { get; set; }
        public string status { get; set; }
    }
}
