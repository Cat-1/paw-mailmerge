from flask import Flask, send_from_directory

app = Flask(__name__, static_url_path='/', static_folder='.\\..\\react-paw-mailmerge\\build')


# Referenced this blog
# https://blog.miguelgrinberg.com/post/how-to-deploy-a-react--flask-project
@app.route('/')
def serve_page():
    return send_from_directory(app.static_folder, 'index.html')



