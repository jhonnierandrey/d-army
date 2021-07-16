import os
from threading import current_thread

from cs50 import SQL
from flask import Flask, flash, redirect, render_template, request, session, sessions
from flask_session import Session
from tempfile import mkdtemp
from werkzeug.exceptions import default_exceptions, HTTPException, InternalServerError
from werkzeug.security import check_password_hash, generate_password_hash

from helpers import apology, login_required, lookup, usd

# Configure application
app = Flask(__name__)

# Ensure templates are auto-reloaded
app.config["TEMPLATES_AUTO_RELOAD"] = True


# Ensure responses aren't cached
@app.after_request
def after_request(response):
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response


# Custom filter
app.jinja_env.filters["usd"] = usd

# Configure session to use filesystem (instead of signed cookies)
app.config["SESSION_FILE_DIR"] = mkdtemp()
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# Configure CS50 Library to use SQLite database
db = SQL("sqlite:///finance.db")

# Make sure API key is set
if not os.environ.get("API_KEY"):
    raise RuntimeError("API_KEY not set")


@app.route("/")
@login_required
def index():
    """Show portfolio of stocks"""
    # get current user data
    current_user = db.execute('SELECT * FROM users WHERE id = ?', session["user_id"])
    # get current user stock
    current_user_stocks = db.execute(
        'SELECT symbol, name, SUM(shares) as shares, price, SUM(total) as total FROM trades WHERE user_id = ? GROUP BY name', session["user_id"])

    portfolio_total = 0

    # get updated prices + format prices to usd values
    for row in current_user_stocks:
        # get current price for each stock
        updated_price = lookup(row['symbol'])

        portfolio_total += updated_price['price'] * row['shares']

        row['price'] = usd(updated_price['price'])
        row['total'] = usd(updated_price['price'] * row['shares'])

    grand_total = usd(portfolio_total + current_user[0]['cash'])

    current_user[0]['cash'] = usd(current_user[0]['cash'])

    # return apology("TODO")
    return render_template('index.html', symbol=current_user_stocks, cash=current_user[0]['cash'], grand_total=grand_total)


@app.route("/buy", methods=["GET", "POST"])
@login_required
def buy():
    """Buy shares of stock"""
    if request.method == 'POST':
        # check user input for symbol
        if not request.form.get('symbol'):
            return apology('missing symbol', 400)

        if not lookup(request.form.get('symbol')):
            return apology('invalid symbol', 400)

        # check user input for shares
        if not request.form.get('shares'):
            return apology('missing shares', 400)

        # checks shares = positive int
        elif not request.form.get('shares').isdigit() or int(request.form.get('shares')) < 0:
            return apology('invalid shares', 400)

        # get stock current price:
        symbol = lookup(request.form.get('symbol'))
        shares = int(request.form.get('shares'))

        # get user's current cash available
        current_user = db.execute('SELECT * FROM users WHERE id = ?', session["user_id"])

        # calculate price for all shares to purchase and check if balance is available
        price_all_shares = float("{:.2f}".format(symbol['price'] * shares))

        if current_user[0]['cash'] >= price_all_shares:
            # create a new table inside finance.db
            # db.execute('CREATE TABLE IF NOT EXISTS trades (id INTEGER, user_id INTEGER NOT NULL, symbol TEXT NOT NULL, name TEXT NOT NULL, shares NUMERIC NOT NULL, price NUMERIC NOT NULL, total NUMERIC NOT NULL, type TEXT NOT NULL, time TIMESTAMP PRIMARY KEY(id)); CREATE UNIQUE INDEX  ON trades (id);')
            # update current user cash
            db.execute('UPDATE users SET cash = ? WHERE id = ?', current_user[0]['cash'] - price_all_shares, current_user[0]['id'])

            # create the new transaction
            db.execute('INSERT INTO trades (user_id, symbol, name, shares, price, total, type) VALUES (?, ?, ?, ?, ?, ?, ?)',
                       current_user[0]['id'], symbol['symbol'], symbol['name'], shares, symbol['price'], price_all_shares, 'buy')
            return redirect('/')
        else:
            print('Not enough money')
            return redirect('/')

    else:
        return render_template('buy.html')


@app.route("/history")
@login_required
def history():
    """Show history of transactions"""
    # get current user trades' history
    current_user_trades = db.execute('SELECT * FROM trades WHERE user_id = ?', session["user_id"])

    # format prices to usd values
    for row in current_user_trades:
        row['price'] = usd(row['price'])

    # return apology("TODO")
    return render_template('history.html', symbol=current_user_trades,)


@app.route("/login", methods=["GET", "POST"])
def login():
    """Log user in"""

    # Forget any user_id
    session.clear()

    # User reached route via POST (as by submitting a form via POST)
    if request.method == "POST":

        # Ensure username was submitted
        if not request.form.get("username"):
            return apology("must provide username", 403)

        # Ensure password was submitted
        elif not request.form.get("password"):
            return apology("must provide password", 403)

        # Query database for username
        rows = db.execute("SELECT * FROM users WHERE username = ?", request.form.get("username"))

        # Ensure username exists and password is correct
        if len(rows) != 1 or not check_password_hash(rows[0]["hash"], request.form.get("password")):
            return apology("invalid username and/or password", 403)

        # Remember which user has logged in
        session["user_id"] = rows[0]["id"]

        # Redirect user to home page
        return redirect("/")

    # User reached route via GET (as by clicking a link or via redirect)
    else:
        return render_template("login.html")


@app.route("/update", methods=["GET", "POST"])
@login_required
def update():
    """Log user in"""

    # Forget any user_id
    # session.clear()

    # User reached route via POST (as by submitting a form via POST)
    if request.method == "POST":

        # Ensure username was submitted
        if not request.form.get("username"):
            return apology("must provide username", 403)

        # Ensure password was submitted
        elif not request.form.get("password-old"):
            return apology("must provide current password", 403)

        # Ensure new password was submitted
        elif not request.form.get("password-new"):
            return apology("must provide a new password", 403)

        # check for new password match
        if request.form.get('password-new') != request.form.get('password-new-check'):
            return apology("passwords do not match", 403)

        # Query database for user data
        rows = db.execute("SELECT * FROM users WHERE username = ?", request.form.get("username"))

        # Ensure username exists and password is correct
        if len(rows) != 1 or not check_password_hash(rows[0]["hash"], request.form.get("password-old")):
            return apology("invalid username and/or password", 403)

        # Remember which user has logged in
        # session["user_id"] = rows[0]["id"]
        # update user password
        db.execute('UPDATE users SET hash = ? WHERE username = ?', generate_password_hash(
            request.form.get('password-new')), request.form.get("username"))

        # Logout user + redirect to home page
        return redirect("/logout")

    # User reached route via GET (as by clicking a link or via redirect)
    else:
        # get current username to personalize the update password form
        username = db.execute('SELECT username FROM users WHERE id = ?', session["user_id"])
        return render_template("update.html", username=username[0]['username'])


@app.route("/logout")
def logout():
    """Log user out"""

    # Forget any user_id
    session.clear()

    # Redirect user to login form
    return redirect("/")


@app.route("/quote", methods=["GET", "POST"])
@login_required
def quote():
    """Get stock quote."""
    if request.method == 'POST':
        if request.form.get('symbol'):
            # checks if is a valid symbol
            if not lookup(request.form.get('symbol')):
                return apology('invalid symbol', 400)
            else:
                symbol = lookup(request.form.get('symbol'))

                symbol['price'] = usd(symbol['price'])
                return render_template('quoted.html', symbol=symbol)
        else:
            return apology('missing symbol', 400)
    else:
        return render_template('quote.html')


@app.route("/register", methods=["GET", "POST"])
def register():
    """Register user"""
    if request.method == 'POST':
        # check for username input
        if not request.form.get('username'):
            return apology("must provide username", 400)

        # check for username input
        if not request.form.get('password'):
            return apology("must provide password", 400)

        # check for password match
        if request.form.get('password') != request.form.get('confirmation'):
            return apology("passwords do not match", 400)

        # checks username in the db
        new_username = request.form.get('username')
        new_password = request.form.get('password')

        rows = db.execute('SELECT * FROM users WHERE username = ?', new_username)

        if len(rows) != 0:
            return apology("username already exists", 400)
        else:
            db.execute('INSERT INTO users(username, hash) VALUES (?,?)', new_username, generate_password_hash(new_password))
            return redirect('/login')

    else:
        return render_template('register.html')


@app.route("/sell", methods=["GET", "POST"])
@login_required
def sell():
    """Sell shares of stock"""
    # get current user data
    current_user = db.execute('SELECT * FROM users WHERE id = ?', session["user_id"])
    # get current user stock
    current_user_stocks = db.execute(
        'SELECT symbol, name, SUM(shares) as shares, price, SUM(total) as total FROM trades WHERE user_id = ? GROUP BY name', session["user_id"])

    if request.method == 'POST':
        # Ensure stock was choosed
        if not request.form.get("symbol"):
            return apology("missing symbol", 400)
        # check user input for shares
        if not request.form.get('shares'):
            return apology('missing shares', 400)

        # get current price for choosed stock
        updated_price = lookup(request.form.get("symbol"))
        total_shares_to_sell = int(request.form.get('shares'))

        # check if shares are available to sell
        for row in current_user_stocks:
            if row['symbol'] == request.form.get("symbol"):
                if row['shares'] >= total_shares_to_sell:
                    total_price_sale = updated_price['price'] * total_shares_to_sell

                    # update user data cash & available shares
                    db.execute('UPDATE users SET cash = ? WHERE id = ?',
                               current_user[0]['cash'] + total_price_sale, current_user[0]['id'])

                    # create the new transaction
                    db.execute('INSERT INTO trades (user_id, symbol, name, shares, price, total, type) VALUES (?, ?, ?, ?, ?, ?, ?)',
                               current_user[0]['id'], row['symbol'], row['name'], -total_shares_to_sell, row['price'], total_price_sale, 'sell')
                    # db.execute('UPDATE trades SET shares = ? WHERE user_id = ? AND symbol = ?', symbol['shares'] - total_shares_to_sell, current_user[0]['id'])

                    return redirect('/')
                else:
                    return apology('Not enough shares')

            # update current user cash
            # db.execute('UPDATE users SET cash = ? WHERE id = ?', current_user[0]['cash'] - price_all_shares, current_user[0]['id'])

            # create the new transaction
            # db.execute('INSERT INTO trades (user_id, symbol, name, shares, price, total, type) VALUES (?, ?, ?, ?, ?, ?, ?)', current_user[0]['id'], symbol['symbol'], symbol['name'], shares, symbol['price'], price_all_shares, 'buy')

        return apology('symbol not owned')

    else:
        return render_template('sell.html', symbols=current_user_stocks)


def errorhandler(e):
    """Handle error"""
    if not isinstance(e, HTTPException):
        e = InternalServerError()
    return apology(e.name, e.code)


# Listen for errors
for code in default_exceptions:
    app.errorhandler(code)(errorhandler)