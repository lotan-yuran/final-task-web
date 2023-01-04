import { useState } from "react";
import { LockOutlined } from "@mui/icons-material";
import { Grid, TextField, Link, Box, Typography } from "@mui/material";
import { StyledAlert, StyledAvatar, StyledBoxRoot, StyledButtom } from "./Register.style";

const nameTextFields = [
  {
    required: true,
    fullWidth: true,
    name: "firstName",
    id: "firstName",
    label: "First Name",
    autoComplete: "given-name"
  },
  {
    required: true,
    fullWidth: true,
    id: "lastName",
    label: "Last Name",
    name: "lastName",
    autoComplete: "family-name"
  }
];

const textFields = [
  {
    required: true,
    fullWidth: true,
    name: "phone",
    label: "phone",
    type: "phone",
    id: "phone"
  },
  {
    required: true,
    fullWidth: true,
    id: "email",
    label: "Email Address",
    name: "email",
    autoComplete: "email",
    autoFocus: true
  },
  {
    required: true,
    fullWidth: true,
    name: "password",
    label: "Password",
    type: "password",
    id: "password"
  }
];

export const Register = () => {
  const [error, setError] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    // TODO : register
    console.log({
      phone: data.get("phone"),
      email: data.get("email"),
      password: data.get("password"),
      lastName: data.get("lastName"),
      firstName: data.get("firstName")
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
        Register
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <Grid container spacing={2}>
          {nameTextFields.map(({ id, required, name, label, type, fullWidth, autoComplete }) => (
            <Grid item xs={12} sm={6} key={`gridItem- + ${id}`}>
              <TextField
                key={id}
                name={name}
                type={type}
                label={label}
                required={required}
                autoComplete={autoComplete}
                fullWidth={fullWidth}
              />
            </Grid>
          ))}
          {textFields.map(({ id, required, name, label, type, fullWidth }) => (
            <Grid item xs={12} key={`gridItem- + ${id}`}>
              <TextField
                key={id}
                name={name}
                type={type}
                label={label}
                required={required}
                fullWidth={fullWidth}
              />
            </Grid>
          ))}
        </Grid>
        <StyledButtom type="submit" fullWidth variant="contained">
          Register
        </StyledButtom>
        <Grid container>
          <Grid item>
            <Link href="/login" variant="body2">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </Box>
      {error && <StyledAlert severity="error">A problem occurred in registration process! :( </StyledAlert>}
    </StyledBoxRoot>
  );
};
