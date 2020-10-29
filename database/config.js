const mongoose = require('mongoose');

const dbConnect = async () => {

try {
    await mongoose.connect(process.env.DB_CNN, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });

    console.log('DB online');

} catch(error){
    console.log(error);
    throw new error('Error al conectar a la BD');
}

};

module.exports = {
    dbConnect
}
