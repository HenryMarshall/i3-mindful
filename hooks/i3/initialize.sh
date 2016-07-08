#!/bin/bash

# The existance of the `initialize` script is purely convention. It is *not*
# run from anywhere within `mindful-prompt`. It exists in the eventuality you
# want to execute other commands *in conjuction* with launching
# `mindful-prompt`. I personally run this script from within my `.i3/config`.

# TODO: project should be started with `mindful` global
rxvt -title mindful_prompt -hold -e node ~/proj/mindful_prompt/index.js &
sleep 0.1
i3-msg '[title="mindful_prompt"] move scratchpad' &
