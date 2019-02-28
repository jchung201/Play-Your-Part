# coding=utf-8

from marshmallow import Schema, fields
from sqlalchemy import Column, String, Text

from .entity import Entity, Base


class Opp(Entity, Base):
    __tablename__ = 'opps'

    searchType = Column(String)
    category = Column(String)
    title = Column(String)
    description = Column(String)
    location = Column(String)
    contact = Column(String)
    author = Column(String)

    def __init__(self, searchType, category, title, description, location, contact, author, created_by):
        Entity.__init__(self, created_by)
        self.searchType = searchType
        self.category = category
        self.title = title
        self.description = description
        self.location = location
        self.contact = contact
        self.author = author


class OppSchema(Schema):
    id = fields.Number()
    searchType = fields.Str()
    category = fields.Str()
    title = fields.Str()
    description = fields.Str()
    location = fields.Str()
    contact = fields.Str()
    author = fields.Str()
    created_at = fields.DateTime()
    updated_at = fields.DateTime()
    last_updated_by = fields.Str()
