FROM mcr.microsoft.com/dotnet/aspnet:5.0-focal AS base
WORKDIR /app
EXPOSE 5000

ENV ASPNETCORE_URLS=http://+:5000

# Creates a non-root user with an explicit UID and adds permission to access the /app folder
# For more info, please refer to https://aka.ms/vscode-docker-dotnet-configure-containers
RUN adduser -u 5678 --disabled-password --gecos "" appuser && chown -R appuser /app
USER appuser

FROM mcr.microsoft.com/dotnet/sdk:5.0-focal AS build
WORKDIR /src
COPY ["WebAppIdentityServer/src/WebAppIdentityServer.Api/WebAppIdentityServer.Api.csproj", "WebAppIdentityServer/src/WebAppIdentityServer.Api/"]
RUN dotnet restore "WebAppIdentityServer/src/WebAppIdentityServer.Api/WebAppIdentityServer.Api.csproj"
COPY . .
WORKDIR "/src/WebAppIdentityServer/src/WebAppIdentityServer.Api"
RUN dotnet build "WebAppIdentityServer.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "WebAppIdentityServer.Api.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "WebAppIdentityServer.Api.dll"]


RUN dotnet publish -c Release -o out ./src/Haravan.Tasks.Workers

# RUN dotnet publish -c Release -o out ./src/WebAppIdentityServer.Api/WebAppIdentityServer.Api
# # RUN dotnet publish "./src/WebAppIdentityServer.Api/WebAppIdentityServer.Api" -c Release -o /app/publish
# FROM mcr.microsoft.com/dotnet/aspnet:5.0-focal
# WORKDIR /app
# COPY --from=publish /app/publish .
# ENTRYPOINT ["dotnet", "WebAppIdentityServer.Api.dll"]