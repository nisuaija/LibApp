using System;
using System.Security.Cryptography;

namespace SaltGenerator
{
    public class SaltGenerator
    {
        public static byte[] GenerateSalt(int length)
        {
            byte[] salt = new byte[length];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(salt);
            }
            return salt;
        }

        public static string GenerateSaltBase64(int length)
        {
            byte[] salt = GenerateSalt(length);
            return Convert.ToBase64String(salt);
        }
    }
}