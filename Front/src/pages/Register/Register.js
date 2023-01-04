import { useState } from "react";
import { LockOutlined } from "@mui/icons-material";
import { emailRegex, mobilePhoneRegex } from "../../constants";
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
    label: "Mobile Phone",
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

  const validateValues = data => {
    if (!data["firstName"].length || !data["lastName"].length) {
      setError("Missing name information!");
      return false;
    }

    if (!data["phone"].match(mobilePhoneRegex)) {
      setError("Invalid phone number!");
      return false;
    }

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
      phone: form.get("phone"),
      email: form.get("email"),
      password: form.get("password"),
      lastName: form.get("lastName"),
      firstName: form.get("firstName")
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
      {error && <StyledAlert severity="error">{error} </StyledAlert>}
    </StyledBoxRoot>
  );
};
