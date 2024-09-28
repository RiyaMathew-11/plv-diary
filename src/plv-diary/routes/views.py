from flask import render_template

from . import main_bp


@main_bp.route("/")
def index():
    return render_template("index.html")


@main_bp.route("/form")
def form():
    return render_template("form.html")


@main_bp.route("/entry_view")
def entry_view():
    return render_template("entry_view.html")
