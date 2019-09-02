using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace preserv.Migrations
{
    public partial class MySQLMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Categoria",
                columns: table => new
                {
                    IdCategoria = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Descricao = table.Column<string>(maxLength: 255, nullable: false),
                    DataCriacao = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categoria", x => x.IdCategoria);
                });

            migrationBuilder.CreateTable(
                name: "Perfil",
                columns: table => new
                {
                    IdPerfil = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Descricao = table.Column<string>(maxLength: 255, nullable: false),
                    DataCriacao = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Perfil", x => x.IdPerfil);
                });

            migrationBuilder.CreateTable(
                name: "UnidadeTempo",
                columns: table => new
                {
                    IdUnidadeTempo = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Descricao = table.Column<string>(maxLength: 255, nullable: false),
                    DataCriacao = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UnidadeTempo", x => x.IdUnidadeTempo);
                });

            migrationBuilder.CreateTable(
                name: "Usuario",
                columns: table => new
                {
                    IdUsuario = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Login = table.Column<string>(maxLength: 16, nullable: false),
                    Senha = table.Column<string>(maxLength: 32, nullable: false),
                    Email = table.Column<string>(maxLength: 255, nullable: false),
                    DataCriacao = table.Column<DateTime>(nullable: false),
                    IdPerfil = table.Column<int>(nullable: false),
                    Discriminator = table.Column<string>(nullable: false),
                    IdContratado = table.Column<int>(nullable: true),
                    IdContratante = table.Column<int>(nullable: true),
                    DataVigencia = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Usuario", x => x.IdUsuario);
                    table.ForeignKey(
                        name: "FK_Usuario_Perfil_IdPerfil",
                        column: x => x.IdPerfil,
                        principalTable: "Perfil",
                        principalColumn: "IdPerfil",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Projeto",
                columns: table => new
                {
                    IdProjeto = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Descricao = table.Column<string>(maxLength: 255, nullable: false),
                    PrazoPrevistoMinimo = table.Column<int>(nullable: false),
                    PrazoPrevistoMaximo = table.Column<int>(nullable: false),
                    ValorPrevisto = table.Column<decimal>(nullable: false),
                    DataCriacao = table.Column<DateTime>(nullable: false),
                    IdUnidadeTempo = table.Column<int>(nullable: false),
                    IdCategoria = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Projeto", x => x.IdProjeto);
                    table.ForeignKey(
                        name: "FK_Projeto_Categoria_IdCategoria",
                        column: x => x.IdCategoria,
                        principalTable: "Categoria",
                        principalColumn: "IdCategoria",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Projeto_UnidadeTempo_IdUnidadeTempo",
                        column: x => x.IdUnidadeTempo,
                        principalTable: "UnidadeTempo",
                        principalColumn: "IdUnidadeTempo",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Log",
                columns: table => new
                {
                    IdLog = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    IdUsuario = table.Column<int>(nullable: false),
                    NomeUsuario = table.Column<string>(nullable: true),
                    Acao = table.Column<string>(maxLength: 255, nullable: false),
                    Pagina = table.Column<string>(maxLength: 255, nullable: false),
                    DataCriacao = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Log", x => x.IdLog);
                    table.ForeignKey(
                        name: "FK_Log_Usuario_IdUsuario",
                        column: x => x.IdUsuario,
                        principalTable: "Usuario",
                        principalColumn: "IdUsuario",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Contrato",
                columns: table => new
                {
                    IdContrato = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Descricao = table.Column<string>(maxLength: 255, nullable: false),
                    ValorContratado = table.Column<decimal>(maxLength: 16, nullable: false),
                    DataCriacao = table.Column<DateTime>(nullable: false),
                    DataEncerramento = table.Column<DateTime>(nullable: false),
                    IdProjeto = table.Column<int>(nullable: false),
                    IdContratante = table.Column<int>(nullable: false),
                    IdContratado = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Contrato", x => x.IdContrato);
                    table.ForeignKey(
                        name: "FK_Contrato_Usuario_IdContratado",
                        column: x => x.IdContratado,
                        principalTable: "Usuario",
                        principalColumn: "IdUsuario",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Contrato_Usuario_IdContratante",
                        column: x => x.IdContratante,
                        principalTable: "Usuario",
                        principalColumn: "IdUsuario",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Contrato_Projeto_IdProjeto",
                        column: x => x.IdProjeto,
                        principalTable: "Projeto",
                        principalColumn: "IdProjeto",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Tarefa",
                columns: table => new
                {
                    IdTarefa = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Descricao = table.Column<string>(maxLength: 255, nullable: false),
                    DataInicio = table.Column<DateTime>(nullable: false),
                    DataEncerramento = table.Column<DateTime>(nullable: false),
                    DataCriacao = table.Column<DateTime>(nullable: false),
                    PrazoPrevisto = table.Column<int>(nullable: false),
                    IdUnidadeTempo = table.Column<int>(nullable: false),
                    IdProjeto = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tarefa", x => x.IdTarefa);
                    table.ForeignKey(
                        name: "FK_Tarefa_Projeto_IdProjeto",
                        column: x => x.IdProjeto,
                        principalTable: "Projeto",
                        principalColumn: "IdProjeto",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Tarefa_UnidadeTempo_IdUnidadeTempo",
                        column: x => x.IdUnidadeTempo,
                        principalTable: "UnidadeTempo",
                        principalColumn: "IdUnidadeTempo",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Contrato_IdContratado",
                table: "Contrato",
                column: "IdContratado");

            migrationBuilder.CreateIndex(
                name: "IX_Contrato_IdContratante",
                table: "Contrato",
                column: "IdContratante");

            migrationBuilder.CreateIndex(
                name: "IX_Contrato_IdProjeto",
                table: "Contrato",
                column: "IdProjeto");

            migrationBuilder.CreateIndex(
                name: "IX_Log_IdUsuario",
                table: "Log",
                column: "IdUsuario");

            migrationBuilder.CreateIndex(
                name: "IX_Projeto_IdCategoria",
                table: "Projeto",
                column: "IdCategoria");

            migrationBuilder.CreateIndex(
                name: "IX_Projeto_IdUnidadeTempo",
                table: "Projeto",
                column: "IdUnidadeTempo");

            migrationBuilder.CreateIndex(
                name: "IX_Tarefa_IdProjeto",
                table: "Tarefa",
                column: "IdProjeto");

            migrationBuilder.CreateIndex(
                name: "IX_Tarefa_IdUnidadeTempo",
                table: "Tarefa",
                column: "IdUnidadeTempo");

            migrationBuilder.CreateIndex(
                name: "IX_Usuario_IdPerfil",
                table: "Usuario",
                column: "IdPerfil");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Contrato");

            migrationBuilder.DropTable(
                name: "Log");

            migrationBuilder.DropTable(
                name: "Tarefa");

            migrationBuilder.DropTable(
                name: "Usuario");

            migrationBuilder.DropTable(
                name: "Projeto");

            migrationBuilder.DropTable(
                name: "Perfil");

            migrationBuilder.DropTable(
                name: "Categoria");

            migrationBuilder.DropTable(
                name: "UnidadeTempo");
        }
    }
}
