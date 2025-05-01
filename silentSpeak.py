from flask import Flask, render_template, request, redirect
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///silent.db"

db= SQLAlchemy(app)

class Silent(db.Model):
    sno = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(200), nullable = False)
    username = db.Column(db.String(200), unique=True,nullable = False)
    emailid = db.Column(db.String(500), unique=True,nullable = False)
    password = db.Column(db.String(500), nullable = False)
    date_time = db.Column(db.DateTime, default = datetime.utcnow)

    def __repr__(self) -> str:
        return f"{self.sno} - {self.username}"

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/login',methods=['GET','POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        user = Silent.query.filter_by(username=username).first()
        if user and check_password_hash(user.password, password):
            # Successful login
            return 'Login successful'
        else:
            # Invalid username or password
            return 'Invalid username or password'
    return render_template('login.html')

@app.route('/signup',methods=['GET','POST'])
def signup1():
    if request.method=='POST':
        name = request.form['name']
        username = request.form['username']
        emailid = request.form['emailid']
        password =request.form['password']
        sil = Silent(name=name,username=username,emailid=emailid,password=password)
        db.session.add(sil)
        db.session.commit()
    return render_template('signup1.html')

@app.route('/learning')
def learning():
    return render_template('learning.html')

@app.route('/dictionary')
def dictionary():
    return render_template('dictionary.html')

@app.route('/history')
def history():
    return render_template('history.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/beg')
def beg():
    return render_template('beg.html')

@app.route('/inter')
def inter():
    return render_template('inter.html')

@app.route('/advan')
def advan():
    return render_template('advan.html')

@app.route('/quiz_beg')
def quiz_beg():
    return render_template('quiz_beg.html')

@app.route('/quiz_inter')
def quiz_inter():
    return render_template('quiz_inter.html')

@app.route('/quiz_advan')
def quiz_advan():
    return render_template('quiz_advan.html')

if __name__=="__main__":
    app.run(debug=True, port=8000)