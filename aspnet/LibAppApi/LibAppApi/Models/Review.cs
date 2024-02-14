using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace LibAppApi.Models
{
    public class Review
    {
        [Key]
        public string reviewID { get; set; }
        public string UserName { get; set; }
        public string UserID { get; set; }
        public string Finna_ID { get; set; }
        public string Text { get; set; }
        public double Score { get; set; }
        [AllowNull]
        public ICollection<Report>? Reports { get; set; }

        public Boolean IsPrivate { get; set; }
        public DateTime DateTime { get; set; }
    }

    public class Report
    {
        [Key]
        public string ID { get; set; }
        public string Reason { get; set; }
        public string Info { get; set; }
    }
}
