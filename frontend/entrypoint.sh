#!/bin/sh

echo -e "\033[32mStarting frontend...\033[0m"
NODE_OPTIONS=--max-old-space-size=512
npm run build
exec npm serve -s dist -l 9000