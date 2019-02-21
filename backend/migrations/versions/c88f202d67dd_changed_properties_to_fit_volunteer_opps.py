"""Changed properties to fit volunteer opps

Revision ID: c88f202d67dd
Revises: 719a4e19e4c7
Create Date: 2019-02-20 20:25:35.955410

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c88f202d67dd'
down_revision = '719a4e19e4c7'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('exams', sa.Column(
        'long_description',
        sa.Text,
        nullable=False,
        server_default='Default exam description'))
    op.add_column('exams', sa.Column(
        'long_description',
        sa.Text,
        nullable=False,
        server_default='Default exam description'))
    op.add_column('exams', sa.Column(
        'long_description',
        sa.Text,
        nullable=False,
        server_default='Default exam description'))


def downgrade():
    pass
