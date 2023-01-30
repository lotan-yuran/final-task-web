import { useState } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../../Recoil";
import { Navigate } from "react-router-dom";
import { emailRegex } from "../../constants";
import { LockOutlined } from "@mui/icons-material";
import adminService from "../../services/adminService";
import firebaseService from "../../services/firebaseService";
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
  const [user, setUser] = useRecoilState(userState);

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

  const handleSubmit = async e => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = {
      email: form.get("email"),
      password: form.get("password")
    };

    console.log(data);

    if (validateValues(data)) {
      try {
        const loggedInUser = await firebaseService.loginUser(data.email, data.password);
        console.log("loggedInUser");
        console.log(loggedInUser);
        const isAdmin = await adminService.isAdmin(loggedInUser?.email);

        const user = {
          name: loggedInUser?.displayName,
          email: loggedInUser?.email,
          isAdmin
        };

        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
      } catch (error) {
        switch (error.response.data.error.message) {
          case "INVALID_PASSWORD":
            setError("Password is incorrect!");
            break;
          case "EMAIL_NOT_FOUND":
            setError("Email not found!");
            break;
          default:
            setError("A problem occurred in login process! :(");
            break;
        }
      }
    }

    setTimeout(() => {
      setError(false);
    }, 7000);
  };

  return (
    <>
      {user?.email ? (
        <Navigate to={"/store"} />
      ) : (
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
                  {"Don't have an account? Register"}
                </Link>
              </Grid>
            </Grid>
          </Box>
          {error && <StyledAlert severity="error">{error} </StyledAlert>}
        </StyledBoxRoot>
      )}
    </>
  );
};
