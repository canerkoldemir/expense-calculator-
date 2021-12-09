from flask import Flask,request,redirect,url_for,render_template,session
import sqlite3
from flask import flash

def register_user_to_db(username,password):
    con = sqlite3.connect('database.db')
    cur = con.cursor()
    cur.execute('INSERT INTO users(username,password) values (?,?)',(username,password))
    con.commit()
    con.close()
    #the function above is help us to store username and password in database

def check_user(username,password):
    con = sqlite3.connect('database.db')
    cur = con.cursor()
    cur.execute('SELECT username,password FROM users WHERE username=? and password=?',(username,password))

    result = cur.fetchone()
    if result:
        return True
    else:
        return False


app = Flask(__name__)
app.secret_key="canerkoldemir"

@app.route("/")
def index():
    return render_template("login.html")


@app.route("/register" , methods=["POST","GET"])
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        if username == '' or password == '':
           flash('Invalid password provided', 'error')
           return redirect('/home')

        else:
            register_user_to_db(username,password)
            return redirect(url_for('index'))
    else:
        return render_template('register.html')



@app.route("/login" , methods=["POST","GET"])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        if username == '' or password == '':
            return redirect(url_for('index'))

        if check_user(username,password):
            session['username'] = username
        
        return redirect(url_for('home'))
    else:
        return redirect(url_for('index'))



@app.route('/home' , methods=['POST','GET'])
def home():
    if 'username' in session:
        return render_template('home.html', username=session['username'])
    else:
        return "Username or Password is wrong or Username or Password empty"
        



@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('index'))


if __name__ == '__main__':
    app.run(debug=True)
