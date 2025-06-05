#!/bin/bash

# Create a backup of the original file
cp index.html index.html.bak

# Replace all instances of the placeholder URL with the new SVG data URL
sed -i '' 's|https://via.placeholder.com/200x40?text=ThoughtWorks|data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'200\' height=\'40\'%3E%3Crect width=\'100%\' height=\'100%\' fill=\'%23f0f0f0\'/%3E%3Ctext x=\'50%\' y=\'50%\' dominant-baseline=\'middle\' text-anchor=\'middle\' font-family=\'Arial,sans-serif\' font-size=\'14\' fill=\'%23666\'%3EThoughtWorks%3C/text%3E%3C/svg%3E|g' index.html

echo "Logos have been updated. A backup was created as index.html.bak"
