'use strict'

const getAuth = ({ dbFilename, db, table }) => {
  return (storeId, authenticationId) => {
    return new Promise((resolve, reject) => {
      // select authentication for specified store from database

      //if have sqlite File
      if(dbFilename){
        let query = 'SELECT * FROM ' + table + ' WHERE store_id = ? '
        let params = [ storeId ]
        if (authenticationId) {
          // also filter by authentication ID
          query += 'AND authentication_id = ? '
          params.push(authenticationId)
        }
        // get one row only
        query += 'LIMIT 1'

        // run query and get row object
        db.get(query, params, (err, row) => {
          if (err) {
            reject(err)
          } else if (row) {
            resolve({
              row,
              // for Store API authentication headers
              myId: row.authentication_id,
              accessToken: row.access_token
            })
          } else {
            let err = new Error('No authentication found')
            err.appWithoutAuth = true
            reject(err)
          }
        })
        //if dont have sqlite file, but have a firestore connection
      }else{
        let ref = db.collection(table)
        let query = authenticationId ? ref.where('store_id', '==', storeId)
                                          .where('authentication_id', '==', authenticationId).limit(1) :
                                      ref.where('store_id', '==', storeId).limit(1)
        query.get()
          .then(row => {
            if (row.empty) {
              let err = new Error('No authentication found')
              err.appWithoutAuth = true
              reject(err)
            }else{
              resolve({
                row: row.docs[0].data(),
                // for Store API authentication headers
                myId: row.docs[0].data().authentication_id,
                accessToken: row.docs[0].data().access_token
              })
            }
          })
          .catch(err => {
            reject(err)
          });
      }      
    })
  }
}

module.exports = getAuth
