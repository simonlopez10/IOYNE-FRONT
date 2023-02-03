import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import { Formik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#C7E2FF",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#C7E2FF",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#C7E2FF",
    },
    "&:hover fieldset": {
      borderColor: "#C7E2FF",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#C7E2FF",
    },
  },
  "& p": {
    color: "red",
  },
});
export default function Formulario({ titulo, inputs, selects = false }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [ruta, setRuta] = useState(null);
  
  const peticion = async () => {
    if (location.pathname === "/crearproducto") {
      setRuta("productos");
    } else if (location.pathname === "/crearusuario") {
      setRuta("usuarios");
    } else if (location.pathname === "/crearcliente") {
      setRuta("clientes");
    }
  };
  useEffect(() => {
    return () => {
      peticion();
    };
  }, []);
  return (
    <Container component="main" maxWidth="xs" className="contenedorFormulario">
      <Typography className="tituloFormulario">{titulo}</Typography>
      <Formik
        initialValues={{  
          us_name:"",
          us_lastname:"",
          us_email:"",
          us_password:"",
          us_admin:"",
          cl_name:"",
          cl_lastname:"",
          cl_email:"",
          cl_ident:"",
          cl_address:"",
          pd_name:"",
          pd_description:"",
          pd_image:"",
          pd_price:""
        }}
        onSubmit={async (valores) => {
          if (ruta === "productos") {
            await fetch(`${process.env.REACT_APP_SERVER_URL}/products`, {
              method: "POST",
              body: JSON.stringify(valores),
              headers: { "Content-type": "application/json" },
            }
            )
            navigate("/"+ruta);
          } else if (ruta === "clientes") {
            await fetch(`${process.env.REACT_APP_SERVER_URL}/clients`, {
              method: "POST",
              body: JSON.stringify(valores),
              headers: { "Content-type": "application/json" },
            })
            navigate("/"+ruta)
          } else if (ruta === "usuarios") {
            
            await fetch(`${process.env.REACT_APP_SERVER_URL}/users`, {
              method: "POST",
              body: JSON.stringify(valores),
              headers: { "Content-type": "application/json" },
            })
            navigate("/"+ruta);
          }
        }}
      >
        {({ handleSubmit, values, handleChange }) => (
          <>
            <CssBaseline />
            <Box
              sx={{
                marginTop: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                {inputs.map((input, index) => (
                  <CssTextField
                    key={index}
                    fullWidth
                    label={input.label}
                    margin="normal"
                    className="textField"
                    type={input.type}
                    name={input.value}
                    focused
                    onChange={handleChange}
                  ></CssTextField>
                ))}

                {selects === false ? (
                  <></>
                ) : (
                  <select className="Select" name="us_admin" onChange={handleChange} required>
                    <option disabled selected>
                      Seleccione una opción
                    </option>
                    {selects.map((select, index) => (
                      <option key={index}>{select}</option>
                    ))}
                  </select>
                )}

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  
                >
                  Guardar
                </Button>
              </Box>
            </Box>
          </>
        )}
      </Formik>
    </Container>
  );
}