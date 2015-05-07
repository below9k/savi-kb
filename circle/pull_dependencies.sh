#!/bin/bash

#
# This isn't currently in use. If we start having problems with docker hub,
# this could be used to pull the base node container.
#

# set -e

# Pull the node:0.12.2 container from s3
# aws s3 cp s3://savi-docker-images/node_0_12_2.tgz /tmp/node_0_12_2.tgz
# gzip -dc /tmp/node_0_12_2.tgz | docker load
# rm -f /tmp/node_0_12_2.tgz
