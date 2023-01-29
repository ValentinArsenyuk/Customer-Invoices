using Microsoft.EntityFrameworkCore;

namespace AppReact.Models
{
    public partial class DBTestContext : DbContext
    {
        public DBTestContext()
        {
        }

        public DBTestContext(DbContextOptions<DBTestContext> options)
            : base(options)
        {
        }

        public virtual DbSet<CustomerInvoice> CustomerInvoices { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Server=(local); DataBase=DBTEST;Integrated Security=true");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CustomerInvoice>(entity =>
            {
                entity.HasKey(e => e.Id)
                    .HasName("PK__CustomerInvoice__51C8DD7AD319A96C");

                entity.ToTable("CustomerInvoices");

                entity.Property(e => e.Date)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Status)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Amount)
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
