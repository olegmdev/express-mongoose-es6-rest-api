#!/usr/bin/env bash

# --build: Build images before starting containers.
# --abort-on-container-exit: Stops all containers if any container is stopped
# -d: Runs docker in detached mod
docker-compose up -d --build --abort-on-container-exit
