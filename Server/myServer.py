from flask import Flask, send_from_directory
from os import path

# Referenced this blog
# https://blog.miguelgrinberg.com/post/how-to-deploy-a-react--flask-project

react_build_folder = path.join('.', '..', 'react-paw-mailmerge', 'build')
app = Flask(__name__, static_url_path='/', static_folder=react_build_folder)


@app.route('/')
def serve_page():
    return send_from_directory(app.static_folder, 'index.html')



