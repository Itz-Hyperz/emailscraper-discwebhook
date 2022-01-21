#!/bin/sh

echo "1. INSTALL"
echo "2. START"
echo "Choose an option"
read INPUT

case $INPUT in
  1) 
    echo "Installing... "
    npm install
    ;;
  2)
    echo "Starting..."
    node main.js
    ;;
  *)
    echo "Error."
    ;;
esac
done
