#!/bin/sh

rm -rf dist docs
yarn build
mv dist docs
cp CNAME docs/
