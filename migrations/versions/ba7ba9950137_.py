"""empty message

Revision ID: ba7ba9950137
Revises: 1f0ad83393f0
Create Date: 2018-09-07 22:31:29.606007

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = 'ba7ba9950137'
down_revision = '1f0ad83393f0'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('inventory', 'date_updated',
               existing_type=postgresql.TIMESTAMP(),
               nullable=False)
    op.alter_column('inventory_history', 'date_updated',
               existing_type=postgresql.TIMESTAMP(),
               nullable=False)
    op.alter_column('inventory_history', 'inventory_id',
               existing_type=sa.INTEGER(),
               nullable=False)
    op.alter_column('user', 'hash',
               existing_type=sa.VARCHAR(),
               nullable=False)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('user', 'hash',
               existing_type=sa.VARCHAR(),
               nullable=True)
    op.alter_column('inventory_history', 'inventory_id',
               existing_type=sa.INTEGER(),
               nullable=True)
    op.alter_column('inventory_history', 'date_updated',
               existing_type=postgresql.TIMESTAMP(),
               nullable=True)
    op.alter_column('inventory', 'date_updated',
               existing_type=postgresql.TIMESTAMP(),
               nullable=True)
    # ### end Alembic commands ###
