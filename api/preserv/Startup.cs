using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using PreservWebApi.Models;
using Microsoft.OpenApi.Models;
using PreservWebApi.Services;
using Microsoft.EntityFrameworkCore;
using Swashbuckle.AspNetCore.Swagger;
using Pomelo.EntityFrameworkCore.MySql;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace preserv
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors();

            services.AddEntityFrameworkMySql()
            .AddDbContext<AppDbContext>(
                opt => opt.UseMySql(
                    Configuration.GetConnectionString("BaseDB")));

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            // Register the Swagger generator, defining 1 or more Swagger documents
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { 
                    Title = "PRESERV API", 
                    Version = "v1" });
            });

            services.AddScoped<UsuarioService>();
            var SigningConfig = new SigningConfigurations();
            services.AddSingleton (SigningConfig);                  

            var tokenConfigurations = new TokenConfiguration ();
            new ConfigureFromConfigurationOptions<TokenConfiguration> (
                Configuration.GetSection("TokenConfigurations")
            ).Configure (tokenConfigurations);

            services.AddSingleton(tokenConfigurations);

            services.AddAuthentication (authOptions => {
                authOptions.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                authOptions.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer (bearerOptions => {
                var paramsValidation = bearerOptions.TokenValidationParameters;
                paramsValidation.IssuerSigningKey = SigningConfig.Key;
                paramsValidation.ValidAudience = tokenConfigurations.Audience;
                paramsValidation.ValidIssuer = tokenConfigurations.Issuer;
                paramsValidation.ValidateIssuerSigningKey = true;
                paramsValidation.ValidateLifetime = true;
                paramsValidation.ClockSkew = TimeSpan.Zero;
            });
            services.AddAuthorization (auth => {
                auth.AddPolicy (
                    "Bearer", new Microsoft.AspNetCore.Authorization.AuthorizationPolicyBuilder ()
                    .AddAuthenticationSchemes (JwtBearerDefaults.AuthenticationScheme)
                    .RequireAuthenticatedUser ().Build ()
                );
            });            
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            //if (env.IsDevelopment())
            //{
            //    app.UseDeveloperExceptionPage();
            //}
            //else
            //{
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
            //    app.UseHsts();
            //}
            // Enable middleware to serve generated Swagger as a JSON endpoint.
            app.UseSwagger();

            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.),
            // specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "PRESERV API");
                c.RoutePrefix = string.Empty;
            });

            /* HABILITANDO CORS */
            /*app.UseCors(builder => builder
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials()); */
            app.UseCors(option => option.WithOrigins ("http://localhost:4200").AllowAnyHeader().AllowAnyMethod());
            
            //app.UseHttpsRedirection();
            app.UseMvc();
        }
    }
}
