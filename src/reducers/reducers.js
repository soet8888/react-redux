import { combineReducers } from 'redux'
import * as CONSTANT from 'constants/constants';
import { sqlQueryColumns, sqlQueryRows, PROJECTLIST, ObjList, MetaDataList } from './data'
import {
    OBJECT_LIST,
    PROJECT_LIST,
    ADD_METADATA,
    CURRENT_METADATA,
    SIGN_IN, ADD_TOKEN,
    ADD_USER,
    ADD_LOG,
    ADD_CURRENT_PORJECT,
    SQL_QUERY,
    REMOVE_LOG,
    ADD_PROJECT
} from '../actions/actionType'

const SEE_ALL_PROJECT = { id: CONSTANT.ALL_PROJECT_ID, name: CONSTANT.ALL_PROJECT }
const configInit = {
    url: "http://192.168.1.166:8080",
    currentProject: { id: null, name: null, serviceData: "test update", configData: "test config update", logData: "log data" },
    objectList: [...ObjList],
    projectList: [...PROJECTLIST, SEE_ALL_PROJECT],
    firesbaseUser: null,
    user: null,
    token: null,
    path: "/",
    metaData: [...MetaDataList],
    currentMetaData: [],
    sqlQueryData: { rows: sqlQueryRows, columns: sqlQueryColumns, type: null, message: "invalid query execute" }
}

const config = (state = configInit, action) => {
    switch (action.type) {
        case ADD_CURRENT_PORJECT:
            return { ...state, currentProject: action.payload }
        case ADD_PROJECT:
            return { ...state, projectList: [...state.projectList, action.payload] }
        case OBJECT_LIST:

            const objList = [...state.objectList]
            objList.push(
                {
                    name: action.payload.name,
                    type: action.payload.type
                }
            )
            return {
                ...state, objectList: objList
            }
        case PROJECT_LIST:
            const newList = [...action.payload.projectList]
            newList.push(SEE_ALL_PROJECT)
            return {
                ...state, projectList: newList
            }
        case ADD_METADATA:
            const metaList = [...state.metaData]
            metaList.push({
                id: action.payload.id,
                cid: action.payload.cid,
                type: action.payload.type,
                name: action.payload.name,
                notNull: action.payload.not_null,
                dftValue: action.payload.dft_value,
            })
            return {
                ...state, metaData: metaList
            }
        case CURRENT_METADATA:
            const metaData = [...state.metaData]
            const m = metaData.filter((meta) => {
                return meta.id === action.payload
            })
            const newState = { ...state, currentMetaData: m }
            return newState
        case SIGN_IN:
            return {
                ...state, firesbaseUser: action.payload.firesbaseUser,
                path: action.payload.path
            }
        case ADD_TOKEN:
            return {
                ...state, firesbaseUser: action.payload.firesbaseUser,
                token: action.payload.token
            }
        case ADD_USER:
            return {
                ...state, user: action.payload.user,
            }
        case SQL_QUERY:
            const data = {
                columns: action.payload.columns,
                rows: action.payload.rows,
                type: action.payload.type,
                message: action.payload.message
            }
            return {
                ...state, sqlQueryData: data
            }
        case ADD_LOG:
            return { ...state, currentProject: { ...state.currentProject, logData: action.payload.logData } }
        case REMOVE_LOG:
            return { ...state, currentProject: { ...state.currentProject, logData: action.payload.logData } }
        default:
            return state;
    }
}
const allReducers = combineReducers({
    config: config
})
export default allReducers;