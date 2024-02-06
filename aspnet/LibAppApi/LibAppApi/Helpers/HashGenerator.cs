using System;
using System.Security.Cryptography;
using System.Text;

namespace HashGenerator
{
    public class HashGenerator
    {
        public static string GenerateHash(string input, string salt)
        {
            using (var sha256 = SHA256.Create())
            {
                byte[] inputBytes = Encoding.UTF8.GetBytes(input + salt);
                byte[] hashBytes = sha256.ComputeHash(inputBytes);

                StringBuilder sb = new StringBuilder();
                foreach (byte b in hashBytes)
                {
                    sb.Append(b.ToString("x2"));
                }
                return sb.ToString();
            }
        }
    }
}
