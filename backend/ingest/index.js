const { Client, Pool } = require('pg')

const pool = new Pool({
    user: 'trashbiniot',
    host: 'trash-bin-iot-test.celdux0k7g1r.eu-central-1.rds.amazonaws.com',
    database: 'trashbiniot',
    password: 'futurice',
    port: 5432,
  })

module.exports.handler = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    let client;
    pool.connect().then(c => {
        client = c;
        return client.query("SELECT NOW()");
    }).then(res => {
        client.release();
        const response =  {
            "isBase64Encoded": false,
            "statusCode": 200,
            "body": JSON.stringify(res.rows)
        }
        callback(null, response);
    }).catch(error => {
        console.log("ERROR", error);
        const response =  {
            "isBase64Encoded": false,
            "statusCode": 500,
            "body": JSON.stringify(error)
        }

        callback(null, response);
    });
};