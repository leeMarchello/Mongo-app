# To start the mongodb server you will need to setup a log directory and a data directory
# For this app we have created the data directory at : /usr/loca/var/mongodb
# & the log directory was created at /usr/local/var/log/mongodb/

# Starts the mongo database server
mongod --dbpath /usr/local/var/mongodb --logpath /usr/local/var/log/mongodb/mongo.log

# Starts the Node JS application
npm run start