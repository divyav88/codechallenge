"""Error definitions."""
from enum import Enum
from http import HTTPStatus


class Error(Enum):
    """Error Codes."""

    SERVICE_UNAVAILABLE = 'Service Unavailable', HTTPStatus.BAD_REQUEST

    def __new__(cls, message, status):
        """Attributes for the enum."""
        obj = object.__new__(cls)
        obj.message = message
        obj.status = status
        return obj
