using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace LibAppApi.Models
{
    public class User
    {
        [Key]
        public string userID { get; set; }
        public Boolean isAdmin { get; set; }
        public string userName { get; set; }
        public string salt { get; set; }
        public string hash { get; set; }

        [AllowNull]
        public ICollection<userBook> userBooks { get; set; }

        public User()
        {

        }
    }
}
