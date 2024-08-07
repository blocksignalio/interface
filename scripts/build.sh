#!/bin/sh

git branch -D deployment
git checkout -b deployment
rm -rf dist docs
yarn build
mv dist docs
cp CNAME docs/
git add --force -- docs
git commit -m deploy
git push origin deployment --force
git checkout master
rm -rf docs
