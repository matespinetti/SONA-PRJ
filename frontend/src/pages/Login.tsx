import React from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useAuthServiceContext } from "../context/AuthContext.tsx";
import {
    Avatar,
    Box,
    Container,
    CssBaseline,
    FormControlLabel,
    Grid,
    Link,
    TextField,
    ThemeProvider,
    Typography,
    useTheme,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import { LockOutlined as LockOutlinedIcon } from "@mui/icons-material";

const Login = () => {
    const { login } = useAuthServiceContext();
    const navigate = useNavigate();
    const defaultTheme = useTheme();
    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validate: (values) => {
            const errors: Partial<typeof values> = {}
            if (!values.username){
                errors.username="Required"
            }
            if (!values.password){
                errors.password="Required"
            }

            return errors
    },
        onSubmit: async (values) => {
            const { username, password } = values;
            const status = await login(username, password);
            if (status === 401){
                console.log("Unathorized")
                formik.setErrors(
                    {
                        username: "Invalid username or password",
                        password: "Invalid username or password"
                    }
                )
            } else {
                navigate("/")
            }

        },
    });

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={!!formik.touched.username && !!formik.errors.username}
                            helperText = {formik.touched.username && formik.errors.username}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={!!formik.touched.password && !!formik.errors.password}
                            helperText = {formik.touched.password && formik.errors.password}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Box sx={{ mt: 8, mb: 4 }}>
                    <Typography variant="body2" color="textSecondary" align="center">
                        {/* Copyright information */}
                    </Typography>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default Login;
