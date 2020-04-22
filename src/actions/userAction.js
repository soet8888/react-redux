import {
    ADD_USER,
    ADD_TOKEN,
    SIGN_IN,
} from './actionType'
import firebase from '../firebase'
export const loginWithUser = (userInfo) => (dispatch, getState) => {
    console.log("userinfo", userInfo)
    dispatch({
        type: ADD_USER,
        payload: {
            user: userInfo
        }
    })
    firebase.firestore().collection('user').where('email', '==', "test@gmail.com")
        .where('password', '==', 'test')
        .get().then(function (querySnapshot) {
            var reports = []
            console.log("Query length", querySnapshot.length)
            querySnapshot.forEach((doc) => {
                const report = doc.data();
                report.id = doc.id;
                // console.log("report==> ", report);
                reports.push(report);
            });
            // console.log("get reports ==>", reports);
            dispatch({
                type: ADD_USER,
                payload: {
                    user: userInfo
                }
            });

        });
}

export const SignIn = (user) => (dispatch) => {
    dispatch({
        type: SIGN_IN,
        payload: {
            firebaseUser: user,
            path: "/"
        }
    })
}
export const addToken = (token, firebaseUser) => (dispatch) => {
    dispatch({
        type: ADD_TOKEN,
        payload: {
            token: token,
            firebaseUser: firebaseUser
        }
    })
}


export const addUser = (user) => (dispatch) => {
    dispatch({
        type: ADD_USER,
        payload: {
            user: user,
        }
    })
}