docker compose -f src/main/sm-docker/app.yml down
git pull
npm run java:docker
npm run app:up
