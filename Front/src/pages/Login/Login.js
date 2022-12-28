import { useState } from "react";
import { LockOutlined } from "@mui/icons-material";
import { Grid, TextField, Link, Box, Typography } from "@mui/material";
import { StyledAlert, StyledAvatar, StyledBoxRoot, StyledButtom } from "./Login.style";

const textFields = [
  {
    margin: "normal",
    required: true,
    fullWidth: true,
    id: "email",
    label: "Email Address",
    name: "email",
    autoComplete: "email",
    autoFocus: true
  },
  {
    margin: "normal",
    required: true,
    fullWidth: true,
    name: "password",
    label: "Password",
    type: "password",
    id: "password"
  }
];

export const Login = () => {
  const [error, setError] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    // TODO : log in
    console.log({
      email: data.get("email"),
      password: data.get("password")
    });

    // TODO : use error
    setError(true);

    setTimeout(() => {
      setError(false);
    }, 7000);
  };

  return (
    <StyledBoxRoot>
      <StyledAvatar>
        <LockOutlined />
      </StyledAvatar>
      <Typography component="h1" variant="h5">
        Log in
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        {textFields.map(({ id, margin, required, name, label, type, fullWidth }) => (
          <TextField
            key={id}
            name={name}
            type={type}
            label={label}
            margin={margin}
            required={required}
            fullWidth={fullWidth}
          />
        ))}
        <StyledButtom type="submit" fullWidth variant="contained">
          Log In
        </StyledButtom>
        <Grid container>
          <Grid item>
            <Link href="/register" variant="body2">
              Don't have an account? Sign Up
            </Link>
          </Grid>
        </Grid>
      </Box>
      {error && <StyledAlert severity="error">A problem occurred in login process! :( </StyledAlert>}
    </StyledBoxRoot>
  );
};
