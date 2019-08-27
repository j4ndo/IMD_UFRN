using Microsoft.EntityFrameworkCore;

namespace PreservWebApi.Models
{
    public class AppDbContext : DbContext
    {
        public DbSet<Perfil> Perfis { get; set; }
        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<UnidadeTempo> UnidadesTempo { get; set; }
        public DbSet<Projeto> Projetos { get; set; }
        public DbSet<Contrato> Contratos { get; set; }
        public DbSet<Tarefa> Tarefas { get; set; }
        public DbSet<Categoria> Categorias { get; set; }
        
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            
            builder.Entity<Perfil>().ToTable("Perfil");
            builder.Entity<Perfil>().HasKey(p => p.IdPerfil);
            builder.Entity<Perfil>().Property(p => p.IdPerfil).IsRequired().ValueGeneratedOnAdd();
            builder.Entity<Perfil>().Property(p => p.Descricao).IsRequired().HasMaxLength(255);
            builder.Entity<Perfil>().Property(p => p.DataCriacao);
            builder.Entity<Perfil>().HasMany(p => p.Usuarios).WithOne(p => p.Perfil).HasForeignKey(p => p.IdPerfil);

            builder.Entity<Perfil>().HasData
            (
                new Perfil { IdPerfil = 100, Descricao = "Contratante" }, // Id set manually due to in-memory provider
                new Perfil { IdPerfil = 101, Descricao = "Contratado" }
            );

            builder.Entity<Usuario>().ToTable("Usuario");
            builder.Entity<Usuario>().HasKey(p => p.IdUsuario);
            builder.Entity<Usuario>().Property(p => p.IdUsuario).IsRequired().ValueGeneratedOnAdd();
            builder.Entity<Usuario>().Property(p => p.Login).IsRequired().HasMaxLength(16);
            builder.Entity<Usuario>().Property(p => p.Senha).IsRequired().HasMaxLength(32);
            builder.Entity<Usuario>().Property(p => p.Email).IsRequired().HasMaxLength(255);
        }
    }
}