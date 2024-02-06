using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace LibAppApi.Models
{
    public class userBook
    {
        [Key]
        public string ID { get; set; }
        public string finna_ID { get; set; }
        public DateTime dueDate { get; set; }
        public DateTime startDate { get; set; }
        public DateTime endDate { get; set; }

        public int pagesRead { get; set; }
        public string status { get; set; }
        [AllowNull]
        public bool isAvailable { get; set; }

        [ForeignKey("finna_ID")]
        public Book book { get; set; }

    }
}
