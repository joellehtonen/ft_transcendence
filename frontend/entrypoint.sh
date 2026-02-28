#!/bin/sh

echo -e "\033[32mStarting frontend...\033[0m"
npm run build
exec npm serve -s dist -l 9000