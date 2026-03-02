#!/bin/sh

echo -e "\033[32mStarting frontend...\033[0m"
exec npm run dev
# exec serve -s dist -l 9000