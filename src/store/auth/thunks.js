import { loginWithEmailAndPassword, logoutFirebase, registerUserWithEmailPassword, singInWithGoogle } from "../../firebase/providers";
import { checkingCredentials, login, logout } from "./authSlice";

export const checkingAuthentication = () => {
    return async(dispatch) => {
      dispatch(checkingCredentials());
    }
}

export const startGoogleSingIn = () => {
    return async(dispatch) => {
        dispatch(checkingCredentials());

        //result viene del provider
        const result = await singInWithGoogle();

        //si ok es falso, entonces disparo el logout definido en el slice
        if (!result.ok) return dispatch(logout(result));
        
        //si ok es true, significa que la autenticacion salio bien, entonces disparo el login
        dispatch(login(result));
    }
    
}

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {
    return async( dispatch ) => {

        dispatch( checkingCredentials() );

        const result = await registerUserWithEmailPassword({email, password, displayName});
        if ( !result.ok ) return dispatch(logout( result ));

        dispatch( login(result));

    }

}

export const startSingInWithEmailAndPassword = ({email, password}) => {
    return async(dispatch) => {
        dispatch(checkingCredentials()); //para que el estado se ponga en 'checking'
        const result = await loginWithEmailAndPassword({email, password}); //llamada a la función del provider
        if (!result.ok) return dispatch(logout(result)); //si algo salió mal, hacer logout
        dispatch(login(result)); //si salió bien, hacer login
    }
}

export const startLogout = () => {
    return async(dispatch) => {
        await logoutFirebase();//en el provider

        dispatch( logout() );
    }
}