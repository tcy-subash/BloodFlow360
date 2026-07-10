# ── Stage 1: Build ──────────────────────────────────────────────────────────
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Copy solution and project files first (layer-cache friendly)
COPY BloodFlow360.sln ./
COPY BloodFlow360.API/BloodFlow360.API.csproj           BloodFlow360.API/
COPY BloodFlow360.Application/BloodFlow360.Application.csproj   BloodFlow360.Application/
COPY BloodFlow360.Domain/BloodFlow360.Domain.csproj             BloodFlow360.Domain/
COPY BloodFlow360.Infrastructure/BloodFlow360.Infrastructure.csproj BloodFlow360.Infrastructure/
COPY BloodFlow360.Shared/BloodFlow360.Shared.csproj             BloodFlow360.Shared/

RUN dotnet restore BloodFlow360.API/BloodFlow360.API.csproj

# Copy all source
COPY . .

# Publish release build
RUN dotnet publish BloodFlow360.API/BloodFlow360.API.csproj \
    -c Release \
    -o /app/publish \
    --no-restore

# ── Stage 2: Runtime ─────────────────────────────────────────────────────────
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app

# Railway exposes port 8080 by default
ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080

COPY --from=build /app/publish .

ENTRYPOINT ["dotnet", "BloodFlow360.API.dll"]
