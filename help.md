# Run PostgreSQL docker container

# docker run --name container-name -p port:port -e ENVIRONMENT_VARIABLES -d DockerHubPackage

docker run --name postgres-nest -p 5432:5432 -e POSTGRES_PASSWORD=postgres -d postgres

docker run --name postgres-nest -p 80:80 -e PGADMIN_DEFAULT_EMAIL="admin@admin.com" -e PGADMIN_DEFAULT_PASSWORD="admin" -d dpage/pgadmin4
