from logging.config import fileConfig
import os
from sqlalchemy import engine_from_config
from sqlalchemy import pool
from alembic import context

from dotenv import load_dotenv
from app.database import Base
from app import models

# Cargar las variables de entorno
load_dotenv()

# Configuración de Alembic
config = context.config

# Inyectar la URL de la BD desde el .env
config.set_main_option("sqlalchemy.url", os.getenv("DATABASE_URL"))

# Configuración de logs (no toques esto)
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# Aquí se conecta a los modelos de SQLAlchemy
target_metadata = Base.metadata

# MIGRACIONES OFFLINE
def run_migrations_offline() -> None:
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()

# MIGRACIONES ONLINE
def run_migrations_online() -> None:
    connectable = engine_from_config(
        config.get_section(config.config_ini_section),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(connection=connection, target_metadata=target_metadata)

        with context.begin_transaction():
            context.run_migrations()

# DECIDIR MODO
if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
