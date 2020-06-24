#!/usr/bin/python

import time
import sys
import os

sys.path.insert(0, os.path.dirname(os.path.realpath(__file__)) + '/energenie-switches/v1')

from switch import on, off

if len(sys.argv) == 3:
    if sys.argv[1] == 'on':
        print("switch " + sys.argv[2] + " on")
        on(socket=int(sys.argv[2]))
        print("ON!")
    elif sys.argv[1] == 'off':
        print("switch " + sys.argv[2] + " off")
        off(socket=int(sys.argv[2]))
        print("OFF!")
else:
    print("invalid number of arguments")
