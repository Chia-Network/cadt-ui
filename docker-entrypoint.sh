#!/bin/bash

# Create config.json if API_HOST environment variable is set (excluding whitespace-only values)
if [ ! -z "${API_HOST// }" ]; then
  echo "{\"apiHost\": \"$API_HOST\"}" > /usr/share/nginx/html/config.json
fi

# Create colors.json if any color environment variables are set (excluding whitespace-only values)
if [ ! -z "${LEFTNAVBG// }" ] || [ ! -z "${LEFTNAVTEXT// }" ] || [ ! -z "${LEFTNAVITEMACTIVE// }" ]; then
  echo "{" > /usr/share/nginx/html/colors.json

  # Track if we need a comma before the next property
  first_property=true

  # Add leftNavBg if set (and not whitespace-only)
  if [ ! -z "${LEFTNAVBG// }" ]; then
    if [ "$first_property" = false ]; then
      echo "," >> /usr/share/nginx/html/colors.json
    fi
    echo "  \"leftNavBg\": \"$LEFTNAVBG\"" >> /usr/share/nginx/html/colors.json
    first_property=false
  fi

  # Add leftNavText if set (and not whitespace-only)
  if [ ! -z "${LEFTNAVTEXT// }" ]; then
    if [ "$first_property" = false ]; then
      echo "," >> /usr/share/nginx/html/colors.json
    fi
    echo "  \"leftNavText\": \"$LEFTNAVTEXT\"" >> /usr/share/nginx/html/colors.json
    first_property=false
  fi

  # Add leftNavItemActive if set (and not whitespace-only)
  if [ ! -z "${LEFTNAVITEMACTIVE// }" ]; then
    if [ "$first_property" = false ]; then
      echo "," >> /usr/share/nginx/html/colors.json
    fi
    echo "  \"leftNavItemActive\": \"$LEFTNAVITEMACTIVE\"" >> /usr/share/nginx/html/colors.json
    first_property=false
  fi

  echo "}" >> /usr/share/nginx/html/colors.json
fi

exec "$@"
