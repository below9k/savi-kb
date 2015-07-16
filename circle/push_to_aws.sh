#!/bin/bash

# set -e

PROJECT_NAME=savi-kb
CONTAINER_NAME=savi/$PROJECT_NAME
TAG=$(echo ${CIRCLE_BRANCH} | sed 's/release\///' | sed 's/feature\///')

docker tag $CONTAINER_NAME:latest $CONTAINER_NAME:$TAG
docker save $CONTAINER_NAME:$TAG | gzip -c > "$PROJECT_NAME"_${TAG}.tgz
aws s3 cp "$PROJECT_NAME"_${TAG}.tgz s3://savi-docker-images/${PROJECT_NAME}/"$PROJECT_NAME"_${TAG}.tgz
