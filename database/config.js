const mongoose = require('mongoose');

const dbConnection = async () => {

    try {
        await mongoose.connect(process.env.MONGODB_CNN);

        console.log('DB online!');
    } catch (err) {
        console.log(err);
        throw new Error('DB error:', err);
    }

}

module.exports = {
    dbConnection
}