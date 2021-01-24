import pafy
from flask import Flask, request, render_template, send_from_directory
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv()
root = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "build")
app = Flask(__name__, template_folder=root, static_folder=os.path.join(root, 'static'))
CORS(app)

@app.route('/<path:path>', methods=['GET'])
def static_proxy(path):
    return send_from_directory(root, path)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/send', methods=['POST'])
def get_src():
    video = pafy.new(request.json['url'])
    return video.getbestaudio().url if request.json['isMobile'] else video.getbest().url

if __name__ == '__main__':
    app.run(port=(os.getenv('PORT') if os.getenv('PORT') else 8000), debug=False)