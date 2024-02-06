using Microsoft.EntityFrameworkCore;
using LibAppApi.Models;

namespace LibAppApi.Repositories
{
    public class BooksContext : DbContext
    {
        public DbSet<Book> Books { get; set; }
        public DbSet<User> Users { get; set; }

        public DbSet<SessionToken> SessionTokens { get; set; }

        public BooksContext(DbContextOptions<BooksContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Book>().ToTable("Books");
            modelBuilder.Entity<User>().ToTable("Users")
                .HasMany(u => u.userBooks)
                .WithOne()
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<SessionToken>().ToTable("SessionTokens");
        }
    }
}
