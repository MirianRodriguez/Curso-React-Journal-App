import { Google } from "@mui/icons-material";
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import React, { useMemo, useState } from "react";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks";
import { startCreatingUserWithEmailPassword } from "../../store/auth";
import { useDispatch, useSelector } from "react-redux";

//campos que va a tener mi formulario
const formData = {
  email: '',
  password: '',
  displayName: '',
}


//validaciones para mis campos del formulario (función de validación, mensaje)
const formValidations = {
  email: [(value) => value.includes('@'), 'El correo debe incluir @'],
  password: [(value) => value.length >=6, 'El password debe tener al menos 6 caracteres'],
  displayName: [(value) => value.length >= 1, 'El nombre es obligatorio'],
}

export const RegisterPage = () => {

  const [formPostted, setFormPostted] = useState(false);

  const dispatch = useDispatch();

  const {status, errorMessage} = useSelector(state => state.auth);

  const isCheckingAuthentication = useMemo(() => status === 'checking', [status]);

  const {email, password, displayName, formState, onInputChange,
  emailValid, passwordValid, displayNameValid, isFormValid} = useForm(formData,formValidations);

  const onSubmitForm = (event) => {
    event.preventDefault();
    setFormPostted(true);
    if (!isFormValid) return;
    dispatch( startCreatingUserWithEmailPassword(formState) );
  }

  return (
    <AuthLayout tittle="Registro de usuario">
      <form onSubmit={onSubmitForm}>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Nombre"
              type="text"
              placeholder="Nombre completo"
              fullWidth
              name="displayName"
              value={displayName}
              onChange={onInputChange}
              error={!!displayNameValid && formPostted}
              helperText={displayNameValid}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@google.com"
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
              error={!!emailValid && formPostted}
              helperText={emailValid}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              fullWidth
              name="password"
              value={password}
              onChange={onInputChange}
              error={!!passwordValid && formPostted}
              helperText={passwordValid}
            />
          </Grid>
          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} display={!!errorMessage ? '':'none'}>
              <Alert severity='error'>{errorMessage}</Alert>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" fullWidth disabled={isCheckingAuthentication}>
                Registrarme
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Typography sx={{mr:1}}>¿Ya tienes una cuenta?</Typography>
            <Link component={RouterLink} color="inherit" to="/auth/login">
              Ingresar
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
