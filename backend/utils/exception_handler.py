"""Function to handle all exceptions."""
from flask import jsonify
from flask_jwt_oidc import AuthError
from sqlalchemy.exc import SQLAlchemyError
from werkzeug.exceptions import HTTPException, default_exceptions


class ExceptionHandler():
    """Class to handle exceptions."""

    def __init__(self, app=None):
        """Private constructor."""
        if app:
            self.init_app(app)

    def auth_handler(self, error):  # pylint: disable=no-self-use
        """Handle AuthError."""
        response = jsonify(error.error)
        response.status_code = error.status_code
        return response

    def db_handler(self, error):  # pylint: disable=no-self-use
        """Handle Database error."""
        response = {'error': '{}'.format(error.__dict__['code']),
                    'message': '{}'.format(str(error.__dict__['orig']))}, 500
        return response

    def default_handler(self, error):  # pylint: disable=no-self-use
        """Handle standard exception."""
        message = error.message if hasattr(error, 'message') else error.description
        response = jsonify(message=message)
        response.status_code = error.code if isinstance(error, HTTPException) else 500
        return response

    def init_app(self, app):
        """Register common exceptons or errors."""
        self.app = app
        self.register(AuthError, self.auth_handler)
        self.register(HTTPException)
        self.register(SQLAlchemyError, self.db_handler)
        for exception in default_exceptions:
            self.register(self._get_exc_class_and_code(exception))

    def register(self, exception_or_code, handler=None):
        """Register exception with handler."""
        self.app.errorhandler(exception_or_code)(handler or self.default_handler)

    @staticmethod
    def _get_exc_class_and_code(exc_class_or_code):
        """Get the exception class being handled.
        For HTTP status codes or ``HTTPException`` subclasses,
        return both the exception and status code.
        :param exc_class_or_code: Any exception class, or an HTTP status code as an integer.
        """
        if isinstance(exc_class_or_code, int):
            exc_class = default_exceptions[exc_class_or_code]
        else:
            exc_class = exc_class_or_code

        assert issubclass(exc_class, Exception)

        return exc_class
