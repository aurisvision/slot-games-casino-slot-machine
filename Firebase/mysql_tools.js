
exports.sendQuery = async (pool, query, params = []) => {    
    return new Promise((resolve, reject) => {       
         pool.getConnection((err, connection) => {
            connection.query(query, params, (a, b, c) => {
                if (a) {
                    reject(a);
                } else {
                    resolve(b);
                }
                connection.release();
            });
        });         
    });
}