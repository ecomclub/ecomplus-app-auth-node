'use strict'

const setupStores = (client, options) => {
  const { db, table } = client
  const { procedures, callback } = options
  const saveProcedures = require('./../methods/save-procedures')(client)

  const task = () => {
    // get one store waiting for setup process
    const query = 'SELECT application_id, authentication_id, store_id FROM ' + table +
    ' WHERE setted_up = 0 AND access_token IS NOT NULL ORDER BY created_at ASC LIMIT 1'

    // run query and get row object
    db.get(query, (err, row) => {
      if (!err) {
        if (!row) {
          // no store to setup
          // schedule next table reading
          setTimeout(task, 1000)
        } else {
          const storeId = row.store_id

          ;(async function loop () {
            // save procedures
            let error
            try {
              await saveProcedures(storeId, procedures)
            } catch (err) {
              error = err
            }

            // after procedures saved
            // run callback function if any
            if (typeof callback === 'function') {
              await callback(error, { storeId })
            }
            // all async process done
            // schedule next store to setup
            setTimeout(task, 200)

            if (!error) {
              // all done with success
              // remove from queue
              const query = 'UPDATE ' + table + ' SET setted_up = 1 WHERE store_id = ?'
              db.run(query, [storeId], err => {
                if (err) {
                  throw err
                }
              })
            } else {
              // TODO: try to save error on app hidden data
            }
          }())
        }
      } else {
        // SQL error ?
        throw err
      }
    })
  }

  // start task loop
  task()
}

module.exports = setupStores
