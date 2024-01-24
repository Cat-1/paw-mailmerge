# content of test_sample.py
import os.path
import sys

# Followed this tutorial: https://csatlas.com/python-import-file-module/
myScriptDir = os.path.dirname(__file__)
myDir = os.path.join(myScriptDir, '..')
sys.path.append(myDir)

import myServer


def test_hello_world():
    assert myServer.hello_world() == "<p>Hello, World!</p>"

