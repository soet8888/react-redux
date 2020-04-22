import {
    SQL_QUERY,
    CURRENT_METADATA,
    OBJECT_LIST,
    ADD_METADATA,
} from './actionType'
export const fetchObject = (config,projectID) => (dispatch) => {
    console.log("Fetching objects")
    const url = config.url + "/api/objs"
    console.log("request url path 3.2", url)
    fetch(url, {
        headers: {
            'Project-ID': projectID
        }
    })
        // We get the API response and receive data in JSON format...
        .then(response => response.json())
        // ...then we update the users state
        .then((data) => {
            console.log("dispacth api data", data.data)
            data.data.map((obj) => {
                return dispatch(
                    {
                        type: OBJECT_LIST,
                        payload: {
                            name: obj.name,
                            type: obj.type
                        }
                    }
                )
            })
        }
        )

        .catch(err => {
            alert(err)
        })
}
export const fetchMetadata = (config, obj) => (dispatch) => {
    const url = config.url + "/api/meta/" + obj
    console.log("meata url ", url)
    fetch(url, {
        method: "GET",
        headers: {
            'Project-ID': config.currentProject.id
        }
    })
        // We get the API response and receive data in JSON format...
        .then(response => response.json())
        // ...then we update the users state
        .then((data) => {
            data.data.map((meta) => {
                console.log("meta log", meta.not_null)
                const para = {
                    type: ADD_METADATA,
                    payload: {
                        id: obj,
                        cid: meta.cid,
                        type: meta.type,
                        not_null: meta.not_null,
                        name: meta.name,
                        dft_value: meta.deflt_value,
                    }
                }
                return dispatch(para);
            })
            //console.log("meta response", data.data.map((meta) => console.log("Meata data parse", meta)))

        }
        )
        .catch(err => {
            console.log("erroror response", err)

        })
}
export const SqlQueryExec = (config, query) => (dispatch) => {
    console.log("SQL Query ACTION")
    const url = config.url + "/api/query" + btoa(query)
    // const url = 'http://192.168.1.166:8080/api/stop';
    fetch(url, {
        method: "POST",
        headers: {
            'Project-ID': config.currentProject.id
        },
    })
        // We get the API response and receive data in JSON format...
        .then(response => response.json())
        // ...then we update the users state
        .then((data) => {
            alert("Sucess Sql query")
            console.log("stop response", data)
            dispatch({
                type: SQL_QUERY,
                payload: {
                    columns: data.data.status === "Ok" ? data.data.columns : [],
                    rows: data.data.status === "Ok" ? data.data.rows : [],
                    type: data.data.type,
                    message: data.status.status === "Error" ? data.data.message : ''
                }
            })
        }
        )
        .catch(err => {
            alert(err)
        })
}
export const sqlQuery = (config, qry) => (dispatch) => {
    const url = config.url + "/api/query/" + btoa(qry)
    console.log("meata url ", url)
    fetch(url, {
        method: "GET",
        headers: {
            'Project-ID': config.currentProject.id
        }
    })
        // We get the API response and receive data in JSON format...
        .then(response => response.json())
        // ...then we update the users state
        .then((data) => {
            data.data.map((sql) => {
                console.log("meta log", sql)
                const para = {
                    type: SQL_QUERY,
                    payload: {
                        columns: sql.columns,
                        rows: sql.rows,
                    }
                }
                return dispatch(para);
            })
            //console.log("meta response", data.data.map((meta) => console.log("Meata data parse", meta)))

        }
        )
        .catch(err => {
            console.log("erroror response", err)

        })
}
export const currentMetadata = (obj) => (dispatch) => {
    dispatch(
        {
            type: CURRENT_METADATA,
            payload: obj
        }
    )
}