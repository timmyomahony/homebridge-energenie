#!/usr/bin/python

import time
import sys
import os

sys.path.insert(0, os.path.dirname(os.path.realpath(__file__)) + '/energenie-switches/v1')

from switch import on, off

try:
    if len(sys.argv) == 3:
        if sys.argv[1] == 'on':
            print("switch " + sys.argv[2] + " on")
            exec('on(socket={})'.format(sys.argv[2]))
        elif sys.argv[1] == 'off':
            print("switch " + sys.argv[2] + " off")
            exec('off(socket={})'.format(sys.argv[2]))
    else:
        print("invalid number of arguments")
except:
    pass
