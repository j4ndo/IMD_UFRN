using Domain.Entities;
using Domain.Enums;
using Microsoft.EntityFrameworkCore;

namespace Infra.Contexts
{
    public class AppContext : DbContext
    {
        public virtual DbSet<Cargo> Cargos { get; set; }
        public virtual DbSet<Rubrica> Rubricas { get; set; }
        public virtual DbSet<Funcionario> Funcionarios { get; set; }
        public virtual DbSet<Pessoa> Pessoas { get; set; }
        public virtual DbSet<Escolaridade> Escolaridades { get; set; }
        public virtual DbSet<RubricaESocial> RubricasESocial { get; set; }
        public virtual DbSet<FonteRecurso> FonteRecurso { get; set; }
        public virtual DbSet<FormaIngresso> FormaIngresso { get; set; }
        public virtual DbSet<GrupoFonteRecurso> GrupoFonteRecurso { get; set; }
        public virtual DbSet<MotivoDesligamento> MotivoDesligamento { get; set; }
        public virtual DbSet<RegimeJuridico> RegimeJuridico { get; set; }
        public virtual DbSet<TipoAfastamento> TipoAfastamento { get; set; }
        public virtual DbSet<TipoVinculo> TipoVinculo { get; set; }
        public virtual DbSet<TipoFolhaPagamento> TipoFolhaPagamento { get; set; }
        public virtual DbSet<TipoPensao> TipoPensao { get; set; }
        public virtual DbSet<DispensaEnvioRemessa> DispensaEnvioRemessa { get; set; }
        public virtual DbSet<CBO> CBOs { get; set; }
        public virtual DbSet<Carreira> Carreiras { get; set; }
        public virtual DbSet<EnvioRemessa> EnvioRemessa { get; set; }
        public virtual DbSet<TipoAto> TipoAto { get; set; }
        public virtual DbSet<SituacaoAtoBeneficio> SituacaoAtoBeneficio { get; set; }
        public virtual DbSet<AtoBeneficio> AtoBeneficio { get; set; }
        public virtual DbSet<SalarioMinimo> SalarioMinimo { get; set; }
        public virtual DbSet<CargaHoraria> CargaHoraria { get; set; }
        public virtual DbSet<TetoBeneficio> TetoBeneficio { get; set; }
        public virtual DbSet<CategoriaAbaCadastroAto> CategoriaAbaCadastroAto { get; set; }
        public virtual DbSet<CampoRegra> CampoRegra { get; set; }
        public virtual DbSet<OperadorAritmetico> OperadorAritmetico { get; set; }
        public virtual DbSet<OperadorLogico> OperadorLogico { get; set; }
        public virtual DbSet<ConstanteTempo> ConstanteTempo { get; set; }
        public virtual DbSet<FundamentacaoJuridicaConcessaoTipoAto> FundamentacaoJuridicaConcessaoTipoAto { get; set; }
        public virtual DbSet<FundamentacaoJuridicaConcessao> FundamentacaoJuridicaConcessao { get; set; }
        public virtual DbSet<FolhaPagamento> FolhaPagamento { get; set; }
        public virtual DbSet<RemessaFolhaPagamento> RemessaFolhaPagamento { get; set; }
        public virtual DbSet<RemessaQuadroFuncional> RemessaQuadroFuncional { get; set; }
        
        public AppContext(DbContextOptions<AppContext> options) : base(options)
        {
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TipoTempoPonderado>(entity =>
            {
                entity.ToTable("Concessoes_TipoTempoPonderado");
                entity.HasKey(r => r.IdTipoTempoPonderado);
                entity.Property(r => r.NomeTipoTempoPonderado);
            });
            modelBuilder.Entity<TipoTempoAverbado>(entity =>
            {
                entity.ToTable("Concessoes_TipoTempoAverbado");
                entity.HasKey(r => r.IdTipoTempoAverbado);
                entity.Property(r => r.NomeTipoTempoAverbado);
            });
            modelBuilder.Entity<IncidenciaConcessao>(entity =>
            {
                entity.ToTable("Concessoes_IncidenciaAfastamento");
                entity.HasKey(r => r.IdIncidenciaAfastamento);
                entity.Property(r => r.NomeIncidenciaAfastamento);
            });
            modelBuilder.Entity<MapeamentoControleInterno>(entity =>
            {
                entity.ToTable("Concessoes_InstitutoPrevidenciaControleInterno");
                entity.HasKey(r => new { r.IdOrgaoIP, r.IdOrgaoCI });
            });
            modelBuilder.Entity<TipoAfastamentoOrgao>(entity =>
            {
                entity.ToTable("Comum_TipoAfastamentoOrgao");
                entity.HasKey(r => new { r.IdOrgao, r.IdTipoAfastamento });
            });
            modelBuilder.Entity<Cargo>(entity =>
            {
                entity.ToTable("SiaiDp_Cargo");
                entity.HasKey(r => r.IdCargo);
                entity.Property(r => r.CodigoCargo);
                entity.Property(r => r.IdOrgao);
                entity.Property(r => r.AtribuicoesCargo);
                entity.Property(r => r.CargaHoraria).HasColumnType("tinyint");
                entity.Property(r => r.CargaHorariaVariavel).HasColumnType("tinyint");
                entity.Property(r => r.IdLegislacao);
                entity.Property(r => r.IdCarreira).HasColumnType("smallint");
                entity.Property(r => r.Ativo);
                entity.HasOne(x => x.Carreira).WithMany(x => x.Cargos).HasForeignKey(x => x.IdCarreira);
            });

            modelBuilder.Entity<Carreira>(entity =>
            {
                entity.ToTable("Comum_Carreira");
                entity.HasKey(r => r.IdCarreira);
                entity.Property(r => r.NomeCarreira);
                entity.Property(r => r.Ativo);

            });
            modelBuilder.Entity<Subnivel>(entity =>
            {
                entity.ToTable("Comum_Subnivel");
                entity.HasKey(r => r.IdSubnivel);
                entity.Property(r => r.NomeSubnivel);
                entity.Property(r => r.IdCargo);
                entity.Property(r => r.Ativo);
                entity.Property(r => r.Ordem);
                entity.HasOne(x => x.Cargo).WithMany(x => x.Subnivel).HasForeignKey(x => x.IdCargo);

            });
            modelBuilder.Entity<RegraNegocioAtoFundamentacaoJuridicaConcessao>(entity =>
            {
                entity.ToTable("Concessoes_RegraNegocioAtoFundamentacaoJuridicaConcessao");
                entity.HasKey(r => new { r.IdRegraNegocioAto, r.IdFundamentacaoJuridicaConcessao })
                    .HasName("PK_Concessoes_FundamentacaoJuridicaConcessaoRegraNegocioAto");
                entity.HasOne(fj => fj.FundamentacaoJuridicaConcessao).WithMany(r => r.RegraNegocioAtoFundamentacaoJuridicaConcessao)
                    .HasForeignKey(fj => fj.IdFundamentacaoJuridicaConcessao);
                entity.HasOne(rn => rn.RegraNegocioAto).WithMany(r => r.RegraNegocioAtoFundamentacaoJuridicaConcessao)
                    .HasForeignKey(rn => rn.IdRegraNegocioAto);

            });
            modelBuilder.Entity<FundamentacaoJuridicaConcessao>(entity =>
            {
                entity.ToTable("Concessoes_FundamentacaoJuridicaConcessao");
                entity.HasKey(r => r.IdFundamentacaoJuridicaConcessao);
                entity.Property(r => r.DescricaoFundamentacaoJuridicaConcessao);
                entity.Property(r => r.Ementa);
                entity.Property(r => r.DataInicioVigencia);
                entity.Property(r => r.DataFimVigencia);
                entity.Property(r => r.TemIntegralidade);
                entity.Property(r => r.Ativo);

            });
            modelBuilder.Entity<RegraNegocioAto>(entity =>
            {
                entity.ToTable("Concessoes_RegraNegocioAto");
                entity.HasKey(r => r.IdRegraNegocioAto);
                entity.Property(r => r.IdTipoAto);
                entity.Property(r => r.IdOperadorLogico);
                entity.Property(r => r.Sexo);
                entity.Property(r => r.DescricaoRegraNegocioAto);
                entity.Property(r => r.DescricaoMensagem);
                entity.Property(r => r.Ativo);
                entity.HasOne(r => r.TipoAto).WithMany().HasForeignKey(r => r.IdTipoAto);
                entity.HasOne(r => r.OperadorLogico).WithMany().HasForeignKey(r => r.IdOperadorLogico);

            });

            modelBuilder.Entity<RegraAtoRegraNegocioAto>(entity =>
            {
                entity.ToTable("Concessoes_RegraAtoRegraNegocioAto");
                entity.HasKey(r => new { r.IdRegraNegocioAto, r.IdRegraAto });
                entity.HasOne(r => r.RegraAto).WithMany(a => a.RegraAtoRegraNegocioAto).HasForeignKey(p => p.IdRegraAto);
                entity.HasOne(r => r.RegraNegocioAto).WithMany(a => a.RegraAtoRegraNegocioAto).HasForeignKey(p => p.IdRegraNegocioAto);
            });

            modelBuilder.Entity<TipoAto>(entity =>
            {
                entity.ToTable("Concessoes_TipoAto");
                entity.HasKey(r => r.IdTipoAto);
                entity.Property(r => r.NomeTipoAto);
                entity.Property(r => r.IdAreaAtuacao);
                entity.Property(r => r.CamposPensao);
                entity.Property(r => r.Ativo);
            });

            modelBuilder.Entity<FundamentacaoJuridicaConcessaoTipoAto>(entity =>
            {
                entity.ToTable("Concessoes_FundamentacaoJuridicaConcessaoTipoAto");
                entity.HasKey(r => new { r.IdFundamentacaoJuridicaConcessao, r.IdTipoAto });
                entity.HasOne(r => r.FundamentacaoJuridicaConcessao).WithMany(r => r.FundamentacaoJuridicaConcessaoTipoAto).HasForeignKey(s => s.IdFundamentacaoJuridicaConcessao);
                entity.HasOne(r => r.TipoAto).WithMany(r => r.FundamentacaoJuridicaConcessaoTipoAto).HasForeignKey(s => s.IdTipoAto);
            });

            modelBuilder.Entity<RegraAto>(entity =>
            {
                entity.ToTable("Concessoes_RegraAto");
                entity.HasKey(r => r.IdRegraAto);
                entity.Property(r => r.IdCampoRegraPre);
                entity.Property(r => r.IdOperadorAritmetico);
                entity.Property(r => r.IdCampoRegraPos);
                entity.Property(r => r.IdConstanteTempo);
                entity.Property(r => r.DescricaoRegraAto);
                entity.Property(r => r.DescricaoRegraAtoUsuario);
                entity.Property(r => r.Valor);
                entity.Property(r => r.Ativo);

                entity.HasOne(r => r.CampoRegraPre).WithMany().HasForeignKey(r => r.IdCampoRegraPre);
                entity.HasOne(r => r.CampoRegraPos).WithMany().HasForeignKey(r => r.IdCampoRegraPos);
                entity.HasOne(r => r.OperadorAritmetico).WithMany().HasForeignKey(r => r.IdOperadorAritmetico);
                entity.HasOne(r => r.ConstanteTempo).WithMany().HasForeignKey(r => r.IdConstanteTempo);

            });
            modelBuilder.Entity<ConstanteTempo>(entity =>
            {
                entity.ToTable("Concessoes_ConstanteTempo");
                entity.HasKey(r => r.IdConstanteTempo);
                entity.Property(r => r.DescricaoConstanteTempo);
                entity.Property(r => r.DataConstanteTempo).HasColumnType("datetime2");
                entity.Property(r => r.Ativo);

            });
            modelBuilder.Entity<OperadorLogico>(entity =>
            {
                entity.ToTable("Concessoes_OperadorLogico");
                entity.HasKey(r => r.IdOperadorLogico);
                entity.Property(r => r.SimboloOperadorLogico);
                entity.Property(r => r.NomeOperadorLogico);

            });
            modelBuilder.Entity<OperadorAritmetico>(entity =>
            {
                entity.ToTable("Concessoes_OperadorAritmetico");
                entity.HasKey(r => r.IdOperadorAritmetico);
                entity.Property(r => r.SimboloOperadorAritmetico);
                entity.Property(r => r.NomeOperadorAritmetico);

            });
            modelBuilder.Entity<CampoRegra>(entity =>
            {
                entity.ToTable("Concessoes_CampoRegra");
                entity.HasKey(r => r.IdCampoRegra);
                entity.Property(r => r.NomeCampoRegra);
                entity.HasOne(r => r.CategoriaAbaCadastroAto).WithMany().HasForeignKey(r => r.IdCategoriaAbaCadastroAto);
                entity.Property(r => r.NomeCampoRegra);
                entity.Property(r => r.DescricaoCampoRegra);
                entity.Property(r => r.TipoCampoRegra);
                entity.Property(r => r.Ativo);
            });
            modelBuilder.Entity<CategoriaAbaCadastroAto>(entity =>
            {
                entity.ToTable("Concessoes_CategoriaAbaCadastroAto");
                entity.HasKey(r => r.IdCategoriaAbaCadastroAto);
                entity.Property(r => r.NomeCategoriaAbaCadastroAto);
            });
            modelBuilder.Entity<TetoBeneficio>(entity =>
            {
                entity.ToTable("Concessoes_TetoBeneficio");
                entity.HasKey(r => r.IdTetoBeneficio);
                entity.Property(r => r.IdLegislacao);
                entity.Property(r => r.dataInicioVigencia).HasColumnType("datetime2");
                entity.Property(r => r.Valor);
                entity.Property(r => r.Ativo);
            });
            modelBuilder.Entity<CargaHoraria>(entity =>
            {
                entity.ToTable("Comum_CargaHoraria");
                entity.HasKey(r => r.IdCargaHoraria);
                entity.Property(r => r.CargaHorariaMinima).HasColumnType("tinyint");
                entity.Property(r => r.CargaHorariaMaxima).HasColumnType("tinyint");
                entity.Property(r => r.Ativo);
            });
            modelBuilder.Entity<SalarioMinimo>(entity =>
            {
                entity.ToTable("Comum_SalarioMinimo");
                entity.HasKey(r => r.IdSalarioMinimo);
                entity.Property(r => r.MesReferencia).HasColumnType("tinyint");
                entity.Property(r => r.AnoReferencia);
                entity.Property(r => r.ValorSalarioMinimo);
                entity.Property(r => r.Ativo);
            });
            modelBuilder.Entity<SituacaoAtoBeneficio>(entity =>
            {
                entity.ToTable("Concessoes_SituacaoAtoBeneficio");
                entity.HasKey(r => r.IdSituacaoAtoBeneficio);
                entity.Property(r => r.NomeSituacao);
            });

            modelBuilder.Entity<AtoBeneficio>(entity =>
            {
                entity.ToTable("Concessoes_AtoBeneficio");
                entity.HasKey(r => r.IdAtoBeneficio);
                entity.Property(r => r.CodigoAtoBeneficio);
                entity.Property(r => r.IdFuncionarioBeneficiario);
                entity.Property(r => r.IdTipoAto).HasColumnType("tinyint");
                entity.Property(r => r.IdAreaAtuacao).HasColumnType("tinyint");
                entity.Property(r => r.NumeroProcessoOrigem);
                entity.Property(r => r.IdAtoBeneficioDadosConcessao);
                entity.Property(r => r.IdSituacaoAtoBeneficio).HasColumnType("tinyint");
                entity.Property(r => r.DataFalecimento).HasColumnType("datetime2");
                entity.Property(r => r.FalecimentoNaAtividade);
                entity.Property(r => r.Ativo);

            });

            modelBuilder.Entity<Funcionario>(entity =>
            {
                entity.ToTable("SiaiDp_Funcionario");
                entity.HasKey(r => r.IdFuncionario);
                entity.Property(r => r.Matricula);
                entity.Property(r => r.Lotacao);
                entity.Property(r => r.DedicacaoExclusiva);
                entity.Property(r => r.DataNomeacao);
                entity.Property(r => r.DataPosse);
                entity.Property(r => r.DataExercicio);
                entity.Property(r => r.DataDesligamento);
                entity.Property(r => r.DataDesligamento);
                entity.Property(r => r.IdCargaHoraria).HasColumnType("tinyint");
                entity.Property(r => r.QuantidadeMesesContratoTemporario).HasColumnType("tinyint");
                entity.Property(r => r.NomeCargo);
                entity.HasOne(r => r.Cargo).WithMany().HasForeignKey(r => r.IdCargo);
                entity.HasOne(r => r.RegimeJuridico).WithMany().HasForeignKey(r => r.IdRegimeJuridico);
                entity.HasOne(r => r.TipoVinculo).WithMany().HasForeignKey(r => r.IdTipoVinculo);
                entity.HasOne(r => r.FormaIngresso).WithMany().HasForeignKey(r => r.IdFormaIngresso);
                entity.HasOne(r => r.Pessoa).WithMany().HasForeignKey(r => r.IdPessoa);
            });

            modelBuilder.Entity<Pessoa>(entity =>
            {
                entity.ToTable("Comum_Pessoa");
                entity.HasKey(r => r.IdPessoa);
                entity.Property(r => r.Cpf);
                entity.Property(r => r.Nome);
                entity.Property(r => r.DataNascimento);
                entity.Property(r => r.Sexo);
                entity.Property(r => r.NomePai);
                entity.Property(r => r.NomeMae);
                entity.Property(r => r.PNE);
                entity.Property(r => r.Identidade);
                entity.Property(r => r.UfIdentidade);
                entity.Property(r => r.OrgaoExpeditorIdentidade);
                entity.Property(r => r.TituloEleitor);
                entity.Property(r => r.PisPasep);
                entity.Property(r => r.Agencia);
                entity.Property(r => r.Conta);
                entity.Property(r => r.IdBanco);
                entity.Property(r => r.IdEscolaridade);
                entity.Property(r => r.IdEndereco);
            });

            modelBuilder.Entity<Rubrica>(entity =>
            {
                entity.ToTable("SiaiDp_Rubrica");
                entity.HasKey(r => r.IdRubrica);
                entity.Property(r => r.IdOrgao);
                entity.Property(r => r.IdRubricaESocial);
                entity.Property(r => r.Codigo);
                entity.Property(r => r.Descricao);
                entity.Property(r => r.Tipo);
                entity.HasOne(rs => rs.RubricasESocial).WithMany(r => r.Rubricas).HasForeignKey(rs => rs.IdRubricaESocial);
                //entity.HasOne(o => o.Orgao).WithMany(r => r.RubricasOrgao).HasForeignKey(o => o.IdOrgao);


            });

            modelBuilder.Entity<Escolaridade>(entity =>
            {
                entity.ToTable("Comum_Escolaridade_Movida_Bdc");
                entity.HasKey(r => r.IdEscolaridade);
                entity.Property(r => r.CodigoEscolaridade);
                entity.Property(r => r.NomeEscolaridade);
                entity.Property(r => r.Ativo);

            });

            modelBuilder.Entity<RubricaESocial>(entity =>
            {
                entity.ToTable("SiaiDp_RubricasESocial");
                entity.HasKey(r => r.Codigo);
                entity.Property(r => r.DescricaoNatureza);
                entity.Property(r => r.NomeNatureza);

            });
            modelBuilder.Entity<FonteRecurso>(entity =>
            {
                entity.ToTable("Comum_FonteRecurso");
                entity.HasKey(r => r.IdFonteRecurso);
                entity.Property(r => r.CodigoClassificacao);
                entity.Property(r => r.CodigoDetalhamento);
                entity.Property(r => r.NomeFonteRecurso);
            });
            modelBuilder.Entity<FormaIngresso>(entity =>
            {
                entity.ToTable("Comum_FormaIngresso");
                entity.HasKey(r => r.IdFormaIngresso);
                entity.Property(r => r.CodigoFormaIngresso);
                entity.Property(r => r.NomeFormaIngresso);
                entity.Property(r => r.Ativo);
            });
            modelBuilder.Entity<GrupoFonteRecurso>(entity =>
            {
                entity.ToTable("Comum_GrupoFonteRecurso");
                entity.HasKey(r => r.IdGrupoFonteRecurso);
                entity.Property(r => r.CodigoGrupoFonteRecurso);
                entity.Property(r => r.NomeGrupoFonteRecurso);
            });
            modelBuilder.Entity<MotivoDesligamento>(entity =>
            {
                entity.ToTable("Comum_MotivoDesligamento");
                entity.HasKey(r => r.IdMotivoDesligamento);
                entity.Property(r => r.CodigoMotivoDesligamento);
                entity.Property(r => r.NomeMotivoDesligamento);
                entity.Property(r => r.Ativo);
            });
            modelBuilder.Entity<RegimeJuridico>(entity =>
            {
                entity.ToTable("Comum_RegimeJuridico");
                entity.HasKey(r => r.IdRegimeJuridico);
                entity.Property(r => r.CodigoRegimeJuridico);
                entity.Property(r => r.NomeRegimeJuridico);
                entity.Property(r => r.Ativo);
            });
            modelBuilder.Entity<TipoAfastamento>(entity =>
            {
                entity.ToTable("Comum_TipoAfastamento");
                entity.HasKey(r => r.IdTipoAfastamento);
                entity.Property(r => r.CodigoTipoAfastamento);
                entity.Property(r => r.NomeTipoAfastamento);
                entity.Property(r => r.FundamentoLegal);
                entity.Property(r => r.IdLegislacao);
                entity.Property(r => r.IdEsferaGovernamental).HasColumnType("tinyint"); ;
                entity.Property(r => r.IdCidade);
                entity.Property(r => r.IdIncidencia).HasColumnType("tinyint"); ;
                entity.Property(r => r.IsSiaiDp);
                entity.Property(r => r.Ativo);
            });
            modelBuilder.Entity<TipoVinculo>(entity =>
            {
                entity.ToTable("Comum_TipoVinculo");
                entity.HasKey(r => r.IdTipoVinculo);
                entity.Property(r => r.CodigoTipoVinculo);
                entity.Property(r => r.NomeTipoVinculo);
                entity.Property(r => r.Ativo);
            });
            modelBuilder.Entity<TipoFolhaPagamento>(entity =>
            {
                entity.ToTable("SiaiDp_TipoFolhaPagamento");
                entity.HasKey(r => r.IdTipoFolhaPagamento);
                entity.Property(r => r.Codigo);
                entity.Property(r => r.Descricao);

            });
            modelBuilder.Entity<TipoPensao>(entity =>
            {
                entity.ToTable("SiaiDp_TipoPensao");
                entity.HasKey(r => r.IdTipoPensao);
                entity.Property(r => r.Codigo);
                entity.Property(r => r.Descricao);
            });
            modelBuilder.Entity<DispensaEnvioRemessa>(entity =>
            {
                entity.ToTable("Envio_DispensaEnvioRemessa");
                entity.HasKey(r => r.IdDispensaEnvioRemessa);
                entity.Property(r => r.IdOrgaoDispensado);
                entity.Property(r => r.IdOrgaoResponsavelEnvio);
                entity.Property(r => r.DataInicioVigencia).HasColumnType("datetime2"); ;
                entity.Property(r => r.DataFimVigencia).HasColumnType("datetime2"); ;
                entity.Property(r => r.DescricaoMotivoDispensa);
                entity.Property(r => r.DescricaoMotivoFimDispensa);
                entity.Property(r => r.UsuarioInclusao);
                entity.Property(r => r.DataInclusao).HasColumnType("datetime2"); ;
            });

            modelBuilder.Entity<CBO>(entity =>
            {
                entity.ToTable("Comum_CBO");
                entity.HasKey(r => r.Codigo);
                entity.Property(r => r.Nome);
            });

            modelBuilder.Entity<Carreira>(entity =>
          {
              entity.ToTable("Comum_Carreira");
              entity.Property(r => r.IdCarreira).HasColumnType("smallint");
              entity.Property(r => r.NomeCarreira);
              entity.Property(r => r.Ativo);
          });

            modelBuilder.Entity<EnvioRemessa>(entity =>
            {
                entity.ToTable("Envio_Remessa");
                entity.HasKey(r => r.IdEnvioRemessa);
                entity.Property(r => r.IdOrgao);
                entity.Property(r => r.Ano);
                entity.Property(r => r.Mes);
                entity.Property(r => r.IdSituacaoRemessa);
                entity.Property(r => r.TotalVantagens);
                entity.Property(r => r.TotalDescontos);
                entity.Property(r => r.IdEnvioRemessaRetificacao);
                entity.Property(r => r.IdResponsavelEnvio);
                entity.Property(r => r.CPFResponsavelEnvio);
                entity.Property(r => r.NomeResponsavelEnvio);
                entity.Property(r => r.IdResponsavelInformacao);
                entity.Property(r => r.CPFResponsavelInformacao);
                entity.Property(r => r.NomeResponsavelInformacao);
                entity.Property(r => r.IdProcesso);
                entity.Property(r => r.NumeroProcesso);
                entity.Property(r => r.AnoProcesso);
                entity.Property(r => r.NomeSistemaGerador);
                entity.Property(r => r.Observacoes);
                entity.Property(r => r.DataInclusao).HasColumnType("datetime2"); ;
                entity.Property(r => r.DataInicioProcessamento).HasColumnType("datetime2"); ;
                entity.Property(r => r.DataFimProcessamento).HasColumnType("datetime2"); ;
                entity.Property(r => r.HashMD5Arquivo);
            });
            modelBuilder.Entity<FolhaPagamento>(entity =>
            {
                entity.ToTable("SiaiDp_FolhaPagamento");
                entity.HasKey(r => r.IdFolhaPagamento);
                entity.Property(r => r.IdRemessaQuadroFuncional);
                entity.Property(r => r.IdRemessaFolhaPagamento);
                entity.Property(r => r.IdTipoFolhaPagamento);
                entity.Property(r => r.Mes);
                entity.Property(r => r.Ano);
                entity.Property(r => r.DataInclusao);
            });
            modelBuilder.Entity<RemessaFolhaPagamento>(entity =>
            {
                entity.ToTable("SiaiDp_RemessaFolhaPagamento");
                entity.HasKey(r => r.IdRemessaFolhaPagamento);
                entity.Property(r => r.IdEnvioRemessa);
                entity.Property(r => r.Retificacao);
                entity.HasOne(e => e.EnvioRemessa).WithMany(r => r.RemessaFolhaPagamento)
                    .HasForeignKey(r => r.IdEnvioRemessa);
            });
            modelBuilder.Entity<RemessaQuadroFuncional>(entity =>
            {
                entity.ToTable("SiaiDp_RemessaQuadroFuncional");
                entity.HasKey(r => r.IdRemessaQuadroFuncional);
                entity.Property(r => r.IdEnvioRemessa);
                entity.Property(r => r.Retificacao);
                entity.HasOne(e => e.EnvioRemessa).WithMany(r => r.RemessaQuadroFuncional)
                    .HasForeignKey(r => r.IdEnvioRemessa);
            });
        }
    }
}
