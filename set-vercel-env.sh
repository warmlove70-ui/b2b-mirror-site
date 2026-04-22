#!/bin/bash
# Set Vercel environment variable

cd /Users/abc/.openclaw/workspace/projects/b2b-mirror-site

# Create env file for vercel env pull
echo 'ADMIN_PASSWORD=ZekSmart2026!' > .env.local

# Use vercel CLI to add environment variable
# Format: vercel env add <name> <value> <target>
npx vercel env add ADMIN_PASSWORD ZekSmart2026! production <<< $'y\n'
