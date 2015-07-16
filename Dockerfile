FROM       node:0.10.36
MAINTAINER SAVI Controls, LLC <support@savicontrols.com>

# Update apt-get and install nano
RUN        apt-get update -y && \
           DEBIAN_FRONTEND=noninteractive apt-get install -y nano

# Update apt-get
RUN        apt-get update -y # Change this string to rerun update: 1

# Add the meteor bundle and install npm dependencies
ADD        build/bundle/ /opt/savi-kb/
RUN        cd /opt/savi-kb/programs/server && \
           npm install

# Setup the environment
ENV        PORT 80
ENV        ROOT_URL http://127.0.0.1
ENV        MONGO_URL mongodb://mongo:27017/savi-kb
ENV        MONGO_OPLOG_URL mongodb://mongo:27017/local

# Expose the web port and set the folder/command to run
EXPOSE     80
WORKDIR    /opt/savi-kb
ENTRYPOINT ["node"]
CMD        ["main.js"]

