"""Manage the database and some other items required to run the API
"""
import logging

from flask_migrate import Migrate, MigrateCommand
from flask_script import Manager  # class for handling a set of commands

# models included so that migrate can build the database migrations
from models.db import db
from resources.config import init_app

APP = init_app()
MIGRATE = Migrate(APP, db)
MANAGER = Manager(APP)

MANAGER.add_command('db', MigrateCommand)

if __name__ == '__main__':
    logging.log(logging.INFO, 'Running the Manager')
    MANAGER.run()
