import { useState } from "react";
import { emailRegex } from "../../constants";
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

  const validateValues = data => {
    if (!data["email"].match(emailRegex)) {
      setError("Invalid email address!");
      return false;
    }

    if (!data["password"].length) {
      setError("Missing password!");
      return false;
    }

    return true;
  };

  const handleSubmit = e => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = {
      email: form.get("email"),
      password: form.get("password")
    };

    console.log(data);

    if (validateValues(data)) {
      // TODO:  register user

      // TODO : use error
      setError("A problem occurred in registration process! :(");
    }

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
              Don't have an account? Register
            </Link>
          </Grid>
        </Grid>
      </Box>
      {error && <StyledAlert severity="error">{error} </StyledAlert>}
    </StyledBoxRoot>
  );
};
