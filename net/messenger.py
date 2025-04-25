from flask import Flask, request

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def handle_request():
    if request.method == 'POST':
        data = request.form.get('data')  # for form data
        return f"Received POST data: {data}"
    else:
        return "Send a POST request with some data."

if __name__ == '__main__':
    app.run(debug=True)
