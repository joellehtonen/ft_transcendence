#!/bin/sh

echo -e "\033[32mStarting frontend...\033[0m"
export NODE_ENV=production
exec npm run dev