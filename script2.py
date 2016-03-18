# !/usr/bin/python
import os
from os import listdir, system
from os.path import isfile, join, exists
import subprocess

PATH = "JSON/"

for f in listdir(PATH):
    if not isfile(f) and f.isdigit():
        USER_ID = f
        INPUT_PATH = join(PATH, f)
        OUTPUT_PATH = f
	command = "node script.js " + INPUT_PATH + " " + OUTPUT_PATH
	"""
	print "command: %s" % command
	print "INPUT_PATH: %s" %INPUT_PATH
	print "OUTPUT_PATH: %s" %OUTPUT_PATH	
	"""

	os.system(command)
