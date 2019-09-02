using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Principal;
using Microsoft.IdentityModel.Tokens;
using PreservWebApi.Models;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Web.Http;

namespace PreservWebApi.Controllers
{
    [Route("/api/[controller]")]
    public class LoginController : ControllerBase
    {
        //private DBViagemContext _context;
        private readonly AppDbContext _context;
        public LoginController(AppDbContext _context)
        {
            this._context = _context;
        }
        [AllowAnonymous]
        [HttpPost]
        public object Post(
        [FromBody]Usuario usuario,
        [FromBody]SigningConfigurations signingConfigurations,
        [FromBody]TokenConfiguration tokenConfigurations)
        {
            bool credenciaisValidas = false;
            if (usuario != null && !String.IsNullOrWhiteSpace(usuario.Email))
            {
                var usuarioBase = _context.Usuarios.Where(u => u.Email == usuario.Email).First();
                credenciaisValidas = (usuarioBase != null && usuario.Email == usuarioBase.Email && usuario.ChaveAcesso == usuarioBase.ChaveAcesso);
            }
            if (credenciaisValidas)
            {
                ClaimsIdentity identity = new ClaimsIdentity(
                    new GenericIdentity(usuario.Email, "Login"),
                    new[] {
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString("N")),
                        new Claim(JwtRegisteredClaimNames.UniqueName, usuario.Email)
                    }
                );
                DateTime dataCriacao = DateTime.Now;
                DateTime dataExpiracao = dataCriacao + TimeSpan.FromSeconds(tokenConfigurations.Seconds);
                var handler = new JwtSecurityTokenHandler();
                var securityToken = handler.CreateToken(new SecurityTokenDescriptor
                {
                    Issuer = tokenConfigurations.Issuer,
                    Audience = tokenConfigurations.Audience,
                    SigningCredentials = signingConfigurations.SigningCredentials,
                    Subject = identity,
                    NotBefore = dataCriacao,
                    Expires = dataExpiracao
                });
                var token = handler.WriteToken(securityToken);
                return new
                {
                    authenticated = true,
                    created = dataCriacao.ToString("yyyy-MM-dd HH:mm:ss"),
                    expiration = dataExpiracao.ToString("yyyy-MM-dd HH:mm:ss"),
                    accessToken = token,
                    message = "Seja Bem-vindo!"
                };
            }
            else
            {
                //return Unauthorized(new UnAuthorizedError("Usuario e/ou senha inválidos!"));
                return new
                {
                    authenticated = false,
                    created = "",
                    expiration = "",
                    accessToken = "",
                    message = "Usuario e/ou senha inválidos!"
                };
            }
        }
    }
}