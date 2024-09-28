# flake8: noqa: E402
from flask import Blueprint

main_bp = Blueprint("main", __name__)
from . import views  # noqa: F401
