# kleingers-capital-amp
Kleingers Capital AMP Website

# POSTGRES 
Default user / pwd -> postgres / password (to be reset)

# Sequelize Migrations
node_modules/.bin/sequelize migration:generate --name <migration-name> --debug # Generate new migration. 
node_modules/.bin/sequelize db:migrate --debug # Run all pending migrations.
node_modules/.bin/sequelize db:migrate:undo --debug # Revert the last migration run. 
node_modules/.bin/sequelize db:migrate:undo:all --debug # Revert all migrations. 

# Sequelize Seeders
node_modules/.bin/sequelize seed:generate --name <seed-name> --debug # Generate new seeder. 
node_modules/.bin/sequelize db:seed:all --debug # Run all seeders. 
node_modules/.bin/sequelize db:seed:undo:all --debug # Revert all seeders. 

# Sequelize Misc
node_modules/.bin/sequelize help --debug # Display this help text. 
node_modules/.bin/sequelize db:migrate:status
node_modules/.bin/sequelize version # Prints the version number.

# Getting started new project:
`yarn global add pm2 tslint`
`yarn`
`pm2 install typescript`
`node_modules/.bin/sequelize db:migrate:all --debug` # Run all migrations.  
`node_modules/.bin/sequelize db:seed:all --debug` # Run all seeders. 
