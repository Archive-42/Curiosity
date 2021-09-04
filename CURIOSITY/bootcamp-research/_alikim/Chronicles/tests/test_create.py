import pytest


# def test_create_chronicle(client):
#     """Does post create and return a new chronicle?"""
#     data = {
#         "title": "test chronicle",
#         "description": "test chronicle description...",
#         "color": "rgb(70,40,70)",
#         "image": "book",
#         }
#     response = client.post("/api/chronicles/create", data=data)
#     assert b"test chronicle" in response.data