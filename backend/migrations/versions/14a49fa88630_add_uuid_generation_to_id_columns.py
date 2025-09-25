"""Add UUID generation to id columns

Revision ID: 14a49fa88630
Revises: ebe6098b0863
Create Date: 2025-09-24 21:43:38.843505

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '14a49fa88630'
down_revision: Union[str, Sequence[str], None] = 'ebe6098b0863'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # Adicionar geração automática de UUID para a coluna id da tabela users
    op.alter_column('users', 'id',
                    existing_type=sa.UUID(),
                    server_default=sa.text('gen_random_uuid()'),
                    nullable=False)
    
    # Adicionar geração automática de UUID para a coluna id da tabela tasks
    op.alter_column('tasks', 'id',
                    existing_type=sa.UUID(),
                    server_default=sa.text('gen_random_uuid()'),
                    nullable=False)


def downgrade() -> None:
    """Downgrade schema."""
    # Remover geração automática de UUID da tabela users
    op.alter_column('users', 'id',
                    existing_type=sa.UUID(),
                    server_default=None,
                    nullable=False)
    
    # Remover geração automática de UUID da tabela tasks
    op.alter_column('tasks', 'id',
                    existing_type=sa.UUID(),
                    server_default=None,
                    nullable=False)
