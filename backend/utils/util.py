"""CORS pre-flight decorator.
A simple decorator to add the options method to a Request Class.
"""
from flask import request, g
from functools import wraps

def cors_preflight(methods):
    """Render an option method on the class."""

    def wrapper(f):
        def options(self, *args, **kwargs):  # pylint: disable=unused-argument
            return {'Allow': 'GET'}, 200, \
                   {'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': methods,
                    'Access-Control-Allow-Headers': 'Authorization, Content-Type'}

        setattr(f, 'options', options)
        return f
    return wrapper

def reviewer(f):
    @wraps(f)
    def check_authorization(*args, **kwargs):
        print(g.oidc_token_info['realm_access']['roles'])
        exists = 'reviewer_role' in g.oidc_token_info['realm_access']['roles']
        if exists:            
            return f()
        else:
            return "Unauthorized" , 401
    
    return check_authorization

def approver(f):
    @wraps(f)
    def check_authorization(*args, **kwargs):
        print(g.oidc_token_info['realm_access']['roles'])
        exists = 'approver_role' in g.oidc_token_info['realm_access']['roles']
        if exists:            
            return f()
        else:
            return "Unauthorized" , 401
    
    return check_authorization

def hasrole(role):
    def role_check(function):
        @wraps(function)
        def wrapper(*args, **kwargs):
            exists = role in g.oidc_token_info['realm_access']['roles']
            retval = "Unauthorized" , 401
            if exists == True:            
                return function()
            return retval
        return wrapper
    return role_check