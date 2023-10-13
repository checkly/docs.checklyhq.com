#!/bin/bash
# Fail when any task exits with a non-zero error
set -e

NC='\033[0m' # No Color
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
PURPLE='\033[0;34m'

# Install the broken-link-checker module globally on the docker instance
npm i -g broken-link-checker -s

echo -e "$PURPLE=== BROKEN LINK CHECKER ===$NC"
echo -e "Running broken link checker on URL: $GREEN $1 $NC"

# Create exclude and settings strings based on configuration
EXCLUDE="" 
SET_FOLLOW=""
SET_RECURSIVE=""

if [ -z "$1" ] || [ "$1" == 'https://github.com/celinekurpershoek/link-checker' ]
then
    echo -e "$YELLOW Warning: Running test on default URL, please provide a URL in your action.yml.$NC"
fi

# Set arguments for blc
[ "$2" == false ] && SET_FOLLOW="--follow"

[ "$4" == true ] && SET_RECURSIVE="-ro"

for PATTERN in ${3//,/ }; do
    EXCLUDE+="--exclude $PATTERN "
done

# Echo settings if any are set
echo -e "Configuration: \n Honor robot exclusions: $GREEN$2$NC, \n Exclude URLs that match: $GREEN$3$NC, \n Resursive URLs: $GREEN$4$NC"

# Create command and remove extra quotes
# Put result in variable to be able to iterate on it later
OUTPUT="$(blc "$1" $EXCLUDE $SET_FOLLOW $SET_RECURSIVE -v | sed 's/"//g')"

# Count lines of output
TOTAL_COUNT="$(wc -l <<< "$OUTPUT")"

# Count 'BROKEN' lines of result or return 0
if grep -q 'BROKEN' <<< "$OUTPUT" 
then
    BROKEN="$(grep -q 'BROKEN' <<< "$OUTPUT")"
    BROKEN_COUNT="$(wc -l <<< "$BROKEN")"
else 
    BROKEN_COUNT=0
fi

# Return results
if [ "$BROKEN_COUNT" -gt 0 ] 
then 
    RESULT="$BROKEN_COUNT broken link(s) found (out of $TOTAL_COUNT total)"
    echo -e "$RED Failed $RESULT: $NC"
    LINKS=$(grep -E 'BROKEN' <<< "$OUTPUT" | awk '{print "[✗] " $2 "\n" }' | sort -u)
    echo "$LINKS"
    echo -e "$PURPLE ============================== $NC"
    echo "result<<EOF" >> "$GITHUB_OUTPUT"
    echo "$RESULT" >> "$GITHUB_OUTPUT"
    echo "" >> "$GITHUB_OUTPUT"
    echo "" >> "$GITHUB_OUTPUT"
    echo "$LINKS" >> "$GITHUB_OUTPUT"
    echo "EOF" >> "$GITHUB_OUTPUT"
    exit 1
elif [ "$TOTAL_COUNT" == 0 ]
then
    echo -e "Didn't find any links to check"
else 
    RESULT="✓ Checked $TOTAL_COUNT link(s), no broken links found!"
    echo -e "$GREEN $RESULT $NC"
    echo "result=$RESULT" >> "$GITHUB_OUTPUT"
    echo -e "$PURPLE ============================== $NC"
fi
exit 0
