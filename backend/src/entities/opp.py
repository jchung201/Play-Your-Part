# coding=utf-8

from marshmallow import Schema, fields
from sqlalchemy import Column, String, Text

from .entity import Entity, Base


class Opp(Entity, Base):
    __tablename__ = 'opps'

    organization = Column(String)
    location = Column(String)
    contact = Column(String)
    description = Column(String)
    title = Column(String)

    def __init__(self, organization, location, contact, title, description,  created_by):
        Entity.__init__(self, created_by)
        self.organization = organization
        self.location = location
        self.contact = contact
        self.title = title
        self.description = description


class OppSchema(Schema):
    id = fields.Number()
    organization = fields.Str()
    location = fields.Str()
    contact = fields.Str()
    title = fields.Str()
    description = fields.Str()
    created_at = fields.DateTime()
    updated_at = fields.DateTime()
    last_updated_by = fields.Str()
