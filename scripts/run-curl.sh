#!/bin/bash

arg_name=$0
arg_action=$1
arg_url=$2

if [ $# -lt 2 ]; then
  echo "Usage: $arg_name <get|create|update|delete|go> <url> [options]"
  echo ""
  echo "Example:"
  echo "$arg_name get http://127.0.0.1:3000 1"
  echo "$arg_name create http://127.0.0.1:3000 http://example.com"
  echo "$arg_name update http://127.0.0.1:3000 1 http://example.com"
  echo "$arg_name delete http://127.0.0.1:3000 1"
  echo "$arg_name go http://127.0.0.1:3000/wcovFW"
  echo ""

  exit 1
fi

case $arg_action in

  get)
    curl \
      -X POST \
      -H "Content-Type: application/json" \
      -d "{ \"id\": $3 }" \
      "$arg_url/api/get"
    ;;

  create)
    curl \
      -X POST \
      -H "Content-Type: application/json" \
      -d "{ \"url\": \"$3\" }" \
      "$arg_url/api/create"
    ;;

  update)
    curl \
      -X PUT \
      -H "Content-Type: application/json" \
      -d "{ \"id\": $3, \"url\": \"$4\" }" \
      "$arg_url/api/update"
    ;;

  delete)
    curl \
      -X DELETE \
      -H "Content-Type: application/json" \
      -d "{ \"id\": $3 }" \
      "$arg_url/api/delete"
    ;;

  go)
    curl \
      -v \
      "$arg_url"
    ;;

esac
