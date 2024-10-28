#!/bin/sh

echo "\n >>>>>> SETUP START <<<<<< \n"

git config --global --add safe.directory /workspaces/dxcli
echo "\n >> Configured git \n"

 . /home/vscode/.bashrc
 echo "\n >> Appended pnpm global-bin-dir setting lines to /home/vscode/.bashrc"


if [ ! -d "node_modules" ] && [ -f "package.json" ]; then
  echo "\n >> node_modules folder not found and package.json exists. Running pnpm install...\n"
  pnpm install --frozen-lockfile
elif [ ! -f "package.json" ]; then
  echo "\n >> package.json not found. Cannot run pnpm install."
else
  echo "\n >> node_modules folder already exists. Skipping pnpm install."
fi


echo "\n >>>>> SETUP DONE <<<<<<"