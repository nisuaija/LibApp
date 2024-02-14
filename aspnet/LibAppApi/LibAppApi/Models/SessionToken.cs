using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace LibAppApi.Models
{
    public class SessionToken
    {
        [Key]
        public required string SessionID {  get; set; }
        public required string UserID { get; set; }
        public User User { get; set; }

        public SessionToken()
        { }
    }
}
