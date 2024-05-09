const mongoose = require('mongoose');

async function connect(connectionString) {
    try {
        const connectionResult = await mongoose.connect(connectionString);

        if (connectionResult)
        console.log('Connected to MongoDB');

    } catch (err) {
        console.error('Connection failed', err)
    }
}

module.exports = connect;

