import {
    ADD_LOG,
    REMOVE_LOG
} from './actionType'
export const StartReplicator = (config) => {
    console.log("START ACTION")
    const url = config.url + "/api/start"
    // const url = 'http://192.168.1.166:8080/api/stop';
    fetch(url, {
        method: "POST",
        headers: {
            'Project-ID': config.projectID
        }
    })
        // We get the API response and receive data in JSON format...
        .then(response => response.json())
        // ...then we update the users state
        .then((data) => {
            alert("OK STOP")
            console.log("stop response", data)
        }
        )
        .catch(err => {
            alert(err)
        })
}
export const StopReplicator = (config) => {
    console.log("STOP ACTION")
    const url = config.url + "/api/stop"
    // const url = 'http://192.168.1.166:8080/api/stop';
    fetch(url, {
        method: "POST",
        headers: {
            'Project-ID': config.projectID
        }
    })
        // We get the API response and receive data in JSON format...
        .then(response => response.json())
        // ...then we update the users state
        .then((data) => {
            alert("OK STOP")
            console.log("stop response", data)
        }
        )
        .catch(err => {
            alert(err)
        })
}

export const fetchLog = (config) => (dispatch) => {
    const url = config.url + "/api/log"
    fetch(url, {
        method: "GET",
    })
        // We get the API response and receive data in JSON format...
        .then(response => response.json())
        // ...then we update the users state
        .then((data) => {
            if (data.data.status==="Ok"){
                dispatch(
                    {
                        type: ADD_LOG,
                        payload: {
                            logData: data.data
                        }
                    }
                )
            }else{
                alert(data.data.message)
            }
        }
        )
        .catch(err => {
            alert(err)
        })
}
export const clearLog = (config) => (dispatch) => {
    const url = config.url + "/api/log"
    fetch(url, {
        method: "POST",
    })
        // We get the API response and receive data in JSON format...
        .then(response => response.json())
        // ...then we update the users state
        .then((data) => {
            if (data.data.status === "Ok") {
                dispatch(
                    {
                        type: REMOVE_LOG,
                        payload: {
                            logData: ""
                        }
                    }
                )
            }else{
                alert(data.data.message)
            }
        }
        )
        .catch(err => {
            alert(err)
        })
}