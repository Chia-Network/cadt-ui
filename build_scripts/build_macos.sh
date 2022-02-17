#!/bin/bash

set -euo pipefail

NVM_SH=$(brew --prefix nvm)/nvm.sh
if [ ! -f "$NVM_SH" ]; then
	echo "Installing nvm"
	brew install nvm
	NVM_SH=$(brew --prefix nvm)/nvm.sh
fi
source $NVM_SH

NVM_VERSION=$(nvm --version 2> /dev/null)
echo "nvm version is: $NVM_VERSION"

nvm install 16.0.0
nvm use 16.0.0

echo "Installing npm and packaging dependencies"
pushd npm_macos
npm install
PATH=$(npm bin):$PATH
popd

echo "Installing dependencies"
pushd ..
npm install
LAST_EXIT_CODE=$?
if [ "$LAST_EXIT_CODE" -ne 0 ]; then
	echo >&2 "npm install failed!"
	exit $LAST_EXIT_CODE
fi

echo "Building package for distribution"
npm run electron:package:mac
LAST_EXIT_CODE=$?
if [ "$LAST_EXIT_CODE" -ne 0 ]; then
	echo >&2 "npm run electron:package:mac failed!"
	exit $LAST_EXIT_CODE
fi

echo "Packages"
ls -lh dist

popd
echo "Done!"
