import { Google } from "@mui/icons-material";
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import React, { useMemo } from "react";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks";
import { useDispatch, useSelector } from "react-redux";
import { checkingAuthentication, startGoogleSingIn, startSingInWithEmailAndPassword } from "../../store/auth";

const formData = {
  email: '',
  password: '',
};

export const LoginPage = () => {

  const dispatch = useDispatch();

  //para saber si se está autenticando y deshabilitar los botones
  const {status, errorMessage} = useSelector((state) => state.auth);
  const isAuthenticating = useMemo( () => status === 'checking', [status]);

  const {email, password, onInputChange, formState} = useForm(formData);

  const onSubmit = (event) => {
    event.preventDefault();
    //dispatch(checkingAuthentication(email, password));
    dispatch(startSingInWithEmailAndPassword(formState));
  }

  const onGoogleSingIn = () => {
    dispatch(startGoogleSingIn());
  }


  return (
    <AuthLayout tittle="Login">
      <form onSubmit={onSubmit}>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@google.com"
              fullWidth
              value={email}
              name='email'
              onChange={onInputChange}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              fullWidth
              value={password}
              name='password'
              onChange={onInputChange}
            />
          </Grid>
          <Grid item xs={12} sx={{ mb: 2, mt: 1 }} display={!!errorMessage?'':'none'}>
            <Alert severity='error'>{errorMessage}</Alert>
          </Grid>
          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <Button disabled={isAuthenticating} type= "submit" variant="contained" fullWidth>
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button disabled={isAuthenticating} onClick={onGoogleSingIn} variant="contained" fullWidth>
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Link component={RouterLink} color="inherit" to="/auth/register">
              Crear una cuenta
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
