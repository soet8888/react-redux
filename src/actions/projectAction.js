import {
    PROJECT_LIST,
    CONFIG_SERVICE,
    ADD_CURRENT_PORJECT,
    ADD_PROJECT,
} from './actionType'
export const fetchProject = (config) => (dispatch) => {
    const url = config.url + "/api/project"
    fetch(url, {
        method: "GET",
    })
        // We get the API response and receive data in JSON format...
        .then(response => response.json())
        // ...then we update the users state
        .then((data) => {
            const pList = data.data.map((p) => { return p.id });
            console.log("root response", pList)
            dispatch(
                {
                    type: PROJECT_LIST,
                    payload: {
                        projectList: pList
                    }
                }
            )
        }
        )
        .catch(err => {
            alert(err)
        })
}
export const addCurrentProject = (config, projectID) => (dispatch) => {
    dispatch({
        type: ADD_CURRENT_PORJECT,
        payload: {
            configData: "add config data",
            serviceData: "add service data",
            id: "id2",
            name: "Red Monster2",
        }
    })
    const url = config.url + "/api/project"
    console.log("request url path", url)
    fetch(url, {
        headers: {
            'Project-ID': projectID
        }
    })
        // We get the API response and receive data in JSON format...
        .then(response => response.json())
        // ...then we update the users state
        .then((data) => {
            dispatch(
                {
                    type: ADD_CURRENT_PORJECT,
                    payload: {
                        configData: data.data.configData,
                        serviceData: data.data.serviceData,
                        id: data.data.projectID,
                        name: data.data.projectName,
                    }
                }
            )
        }
        )
        .catch(err => {
            alert(err)
        })
}
export const updateProject = (config, data, projectID) => (dispatch) => {
    const url = config.url + "/api/project"
    console.log("request url path", url)
    fetch(url, {
        method: "PUT",
        headers: {
            'Project-ID': projectID
        },
        body: JSON.stringify(data)
    })
        // We get the API response and receive data in JSON format...
        .then(response => response.json())
        // ...then we update the users state
        .then((data) => {
            if (data.status === "Ok") {
                dispatch(
                    {
                        type: CONFIG_SERVICE,
                        payload: {
                            configData: data.configData,
                            serviceData: data.serviceData,
                        }
                    }
                )
            } else {
                alert(data.message)
            }

        }
        )
        .catch(err => {
            alert(err)
        })
}
export const deleteProject = (config, projectID) => (dispatch) => {
    const url = config.url + "/api/config"
    console.log("request url path", url)
    fetch(url, {
        method: "DELTE",
        headers: {
            'Project-ID': projectID
        },
    })
        // We get the API response and receive data in JSON format...
        .then(response => response.json())
        // ...then we update the users state
        .then((data) => {
            if (data.status === "Ok") {
                alert("delete success");
            } else {
                alert(data.message)
            }

        }
        )
        .catch(err => {
            alert(err)
        })
}
export const createProject = (config, data) => (dispatch) => {
    dispatch({
        type: ADD_PROJECT,
        payload: {
            id: Date(),
            name: Date("2015-03-25"),
            description: "add desc",
            updateTime: Date(),
        }
    })
    console.log("create data", data, "\n Config", config)
    const url = config.url + "/api/project"
    fetch(url, {
        method: "POST",
        headers: {
            'Project-ID': config.currentProject.id
        },
        body: JSON.stringify(data)
    })
        // We get the API response and receive data in JSON format...
        .then(response => response.json())
        // ...then we update the users state
        .then((data) => {
            if (data.data.status === "Ok") {
                alert("create success")
            } else {
                alert("failed project creation.")
            }

        }).catch(err => {
            alert(err)
        })
}