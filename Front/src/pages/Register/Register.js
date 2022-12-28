import { useState } from "react";
import { LockOutlined } from "@mui/icons-material";
import { Grid, TextField, Link, Box, Typography } from "@mui/material";
import { StyledAlert, StyledAvatar, StyledBoxRoot, StyledButtom } from "./Register.style";

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

export const Register = () => {
  const [error, setError] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    // TODO : log in
    console.log({
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      phone: data.get("phone"),
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
        Register
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
            //   margin="normal"
              autoComplete="given-name"
              name="firstName"
              required
              fullWidth
              id="firstName"
              label="First Name"
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
            //   margin="normal"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="family-name"
            />
          </Grid>
          {textFields.map(({ id, margin, required, name, label, type, fullWidth }) => (
            <Grid item xs={12}>
              <TextField
                key={id}
                name={name}
                type={type}
                label={label}
                // margin={margin}
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
