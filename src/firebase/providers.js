import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const singInWithGoogle = async() => {
    try {
        const result = await signInWithPopup(FirebaseAuth, googleProvider ); //devuelto por config
        //const credentials = GoogleAuthProvider.credentialFromResult(result);
        //console.log({credentials});
        const user = result.user;
        //console.log(user);
        const {email, uid, displayName, photoURL} = user;

        return{
            ok: true,
            email, uid, displayName, photoURL,
        }
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        return{
            ok:false,
            errorMessage, errorCode, 
        }
    }
}

export const registerUserWithEmailPassword = async({email, password, displayName}) => {
    try {
        const resp = await createUserWithEmailAndPassword( FirebaseAuth, email, password );
        const { uid, photoURL } = resp.user;

        await updateProfile( FirebaseAuth.currentUser, { displayName });

        return {
            ok: true,
            uid, photoURL, email, displayName
        }
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        return{
            ok:false,
            errorMessage, errorCode, 
        }
    }
}

export const loginWithEmailAndPassword = async({email, password}) => {
    try {
        const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password);
        const {uid, displayName, photoURL} = resp.user;
        return{
            ok:true,
            email, uid, displayName, photoURL,
        }
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        return{
            ok:false,
            errorMessage, errorCode, 
        }
    }
}


export const logoutFirebase = async() => {
    return await FirebaseAuth.signOut();
}