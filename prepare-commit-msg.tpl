#!/bin/sh

EMOJIS=(
%%BASH_ARRAY%%
)

COMMIT_MSG_FILE=$1 # fichier temporaire contenant le message
MSG_CONTENT=$(cat $COMMIT_MSG_FILE) # get full message content with body
MSG_FL=$(head -1 $COMMIT_MSG_FILE) # get firstline of comment

REGEX=(:[[:alpha:]]+:)
if [[ $MSG_FL =~ $REGEX ]]; then
  MATCH="${BASH_REMATCH[0]}"

  # cherche la paire correspondante au match de la regex
  REPLACER=0
  for PAIR in ${EMOJIS[@]}
  do
    EMOJI=${PAIR#*/}
    KEYWORD=${PAIR%/*}
    if [[ $KEYWORD == $MATCH ]]; then
      REPLACER=$EMOJI
    fi
  done

  if [[ $REPLACER == 0 ]]; then
    exit 0
  fi

  # replace commit emoji
  # with the correct emoji keyword
  OUTPUT_FL=${MSG_FL/$MATCH/$REPLACER}
  OUTPUT_MSG=${MSG_CONTENT/$MSG_FL/$OUTPUT_FL}
  echo "$OUTPUT_MSG" > "$COMMIT_MSG_FILE"
fi

exit 0
