import uuid

testuser = 'unittest user'

TEST_JWT_HEADER = {
    "alg": "RS256",
    "typ": "JWT",
    "kid": "foiclientapp"
}

TEST_JWT_CLAIMS = {
    "iss": "https://iam.aot-technologies.com/auth/realms/foirealm",
    "sub": "3559e79c-7115-41c1-bb26-1a3dc54bbf5e",
    "aud": ["foiclientapp"],
    "firstname": "Test",
    "lastname": "User",
    "realm_access": {
        "roles": [
            "approver"
        ]
    },
    "preferred_username": "user"
}


def factory_auth_header(jwt, claims):
    """Produce JWT tokens for use in tests."""
    return {'Authorization': 'Bearer ' + jwt.create_jwt(claims=claims, header=TEST_JWT_HEADER)}


REQUEST_OBJECT = {
    'name': 'unit test1',
    'description': 'Unit test the post request status',
    'status': 'submitted',
    'createdby': testuser,
    'updated': False,
    'transactionid': str(uuid.uuid4())
}


def test_ping(app, client):
    response = client.get('/')
    assert response.status_code == 200


def test_secure(app, client, jwt):
    headers = factory_auth_header(jwt=jwt, claims=TEST_JWT_CLAIMS)
    response = client.get('requests/test', headers=headers)
    assert response.status_code == 200

def test_get_requests(app, client, jwt):
    headers = factory_auth_header(jwt=jwt, claims=TEST_JWT_CLAIMS)
    response = client.get('/requests/all', headers=headers)
    assert response.status_code == 200


def test_get_requests_text(app, client, jwt):
    headers = factory_auth_header(jwt=jwt, claims=TEST_JWT_CLAIMS)
    response = client.get('/requests/all', headers=headers)
    assert b'test' in response.data


def test_post_requests(app, client, jwt):
    headers = factory_auth_header(jwt=jwt, claims=TEST_JWT_CLAIMS)
    response = client.post('/requests/add', json=REQUEST_OBJECT, headers=headers)
    assert response.status_code == 200


def test_post_requests_text(app, client, jwt):
    headers = factory_auth_header(jwt=jwt, claims=TEST_JWT_CLAIMS)
    data = {'name': 'unit test2', 'description': 'Unit test the POST request text', 'status': 'submitted',
            'createdby': testuser, 'updated': False, 'transactionid': str(uuid.uuid4())}
    response = client.post('/requests/add', json=data, headers=headers)
    assert b'true' in response.data


def test_update_requests(app, client, jwt):
    headers = factory_auth_header(jwt=jwt, claims=TEST_JWT_CLAIMS)
    data = {'name': 'unit test3', 'description': 'Unit test the PUT request text', 'status': 'submitted',
            'createdby': testuser, 'updated': False, 'transactionid': str(uuid.uuid4())}
    response = client.put('/requests/10', json=data, headers=headers)
    assert response.status_code == 200


def test_delete_requests(app, client, jwt):
    headers = factory_auth_header(jwt=jwt, claims=TEST_JWT_CLAIMS)
    response = client.delete('/requests/12', headers=headers)
    assert response.status_code == 200
