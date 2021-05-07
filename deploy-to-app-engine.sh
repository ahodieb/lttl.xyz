#!/usr/bin/env bash
# -*- coding: utf-8 -*-

DEPLOYMENT_DIR="app-engine"

if [[ -d "$DEPLOYMENT_DIR" ]]; then
    rm -rf "${DEPLOYMENT_DIR}"
fi

npm --prefix ui run build
mkdir "${DEPLOYMENT_DIR}"
cp -r backend-go/* "${DEPLOYMENT_DIR}"
cp -r ui/build "${DEPLOYMENT_DIR}/ui"


cd "$DEPLOYMENT_DIR"
gcloud app deploy
