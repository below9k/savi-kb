#!/bin/bash

set -e

if [ "$LIMIT" == "" ]; then
    echo '$LIMIT must be specified'
    exit 1
fi

if [ "$MAIL_URL" == "" ]; then
    echo '$MAIL_URL must be specified'
    exit 1
fi


# pushd to the folder containing this script
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
pushd ${DIR} > /dev/null
    KB_TAG=${KB_TAG:-$(echo ${CIRCLE_BRANCH} | sed 's/release\///' | sed 's/feature\///')}
    AWS_ACCESS_KEY_ID=$(crudini --get ~/.aws/credentials default aws_access_key_id)
    AWS_SECRET_ACCESS_KEY=$(crudini --get ~/.aws/credentials default aws_secret_access_key)

    ansible-playbook -i ../deployment/ansible/inventory/ec2.py --limit=$LIMIT \
        --extra-vars="KB_TAG=$KB_TAG MAIL_URL=$MAIL_URL AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY" \
        ../deployment/ansible/update_savi_kb.yml
popd
