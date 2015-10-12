# savi-kb

### Deploying to http://dev.savicontrols.com ###
Any change to the develop branch kicks off a circleci build which will:

* Update http://dev.savicontrols.com to the latest develop commit
* Update the docker image tgz at ```s3://savi-docker-images/savi-kb/savi-kb_develop.tgz```

### Deploying to http://staging.savicontrols.com ###
Any change to a release branch kicks off a circleci build which will:

* Update http://staging.savicontrols.com to the most recently built release branch (i.e. release/v1.0.1)
* Update the docker release image tgz at ```s3://savi-docker-images/savi-kb/```

### Deploying to http://savicontrols.com ###
Perform the following steps:

1. Update the KB_RELEASE value in /circle.yml
```yaml
    machine:
      environment:
        KB_RELEASE: v1.0.2
```

2. Push the change into the master branch
