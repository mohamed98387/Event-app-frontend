import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "../../components@material/Grid/GridItem.js";
import GridContainer from "../../components@material/Grid/GridContainer.js";
import Button from "../../components@material/CustomButtons/Button.js";
import Card from "../../components@material/Card/Card.js";
import CardHeader from "../../components@material/Card/CardHeader.js";
import TextField from "@material-ui/core/TextField";
import CardBody from "../../components@material/Card/CardBody.js";
import CardFooter from "../../components@material/Card/CardFooter.js";
import { connect } from "react-redux";
import Image from "react-bootstrap/Image";
import { setBt, setBt1 } from "../../../../actions/modelAction";
import EditIcon from "@material-ui/icons/Edit";
import UploadImage from "./UploadImage";
import {
  getAdhrent,
  editeAdherent,
  editeUser,
  getUser,
  clearErrorUSer,
  clearErrorsAdh,
} from "../../../../actions/authActions";

const styles = {
  cardCategoryWhite: {
    color: "rgba(0,0,255,.62)",
    margin: "0",

    fontSize: "14px",
    paddingBottom: "53px",
    marginTop: "-15px",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
};

const useStyles = makeStyles(styles);

const UserProfile = (props) => {
  const classes = useStyles();
  const { user } = props.auth;
  const { adherent } = props.auth;
  const [auth, setAuth] = useState({
    _id: user.id,
    firstName: props.auth.currentUser.firstName,
    lastName: props.auth.currentUser.lastName,
    email: props.auth.currentUser.email,
    userName: props.auth.currentUser.userName,
    // password: props.auth.currentUser.password,
  });

  const [infos, setInfos] = useState({
    _id: props.auth.adherent._id,
    Gouvernorat: props.auth.adherent.Gouvernorat,
    Ville: props.auth.adherent.Ville,
    Zip_Code: props.auth.adherent.Zip_Code,
    Phone: props.auth.adherent.Phone,
    Age: props.auth.adherent.Age,
    aPropos: props.auth.adherent.aPropos,
    userImage: props.auth.adherent.userImage,
  });

  const handleChangeAuth = (e) => {
    setAuth({ ...auth, [e.target.name]: e.target.value });
  };
  const handleChange = (e) => {
    setInfos({ ...infos, [e.target.name]: e.target.value });
  };
  const [err, setErros] = useState([]);
  useEffect(() => {
    setErros(props.errors);
  }, [props.errors]);
  const [err1, setErros1] = useState([]);
  useEffect(() => {
    setErros1(props.errors1);
  }, [props.errors1]);

  const emailErr = err.filter((el) => el.email === "Email est déjà existe")[0];
  const zipErr = err1.filter((el) => el.msg === "Composé de 4 chiffre")[0];
  const phone = err1.filter((el) => el.msg === "Composé de 8 chiffre")[0];
  const emailvalid = err.filter((el) => el.param === "email")[0];
  const userNameErr = err.filter(
    (el) => el.userName === "Nom d'utilisateur est déjà existe"
  )[0];

  const [x, setX] = useState(false);
  const handleClik = () => {
    if (x === false) {
      props.setBt(true);
      props.setBt1(true);
    } else {
      props.setBt(false);
      props.setBt1(false);
    }
    setX(!x);
  };
  const passErr = err.filter((el) => el.param === "password")[0];
  const handleSubmit = (e) => {
    props.editeUser(auth);
    setTimeout(() => {
      props.clearErrorUSer();
    }, 4000);
  };
  const updateImage = (image) => {
    setInfos({ ...infos, userImage: image });
  };

  const handleSubmit1 = (e) => {
    props.editeAdherent(infos);
    setTimeout(() => {
      props.clearErrorsAdh();
    }, 4000);
  };

  const [disableInpu] = useState("");
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <div>
            {props.btModel ? (
              <Card className={classes.cardCategoryWhite}>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>Paramètres Privé</h4>
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    <GridItem style={{ marginTop: 40 }} xs={12} sm={12} md={5}>
                      <TextField
                        onChange={handleChangeAuth}
                        style={{ width: "100%" }}
                        name="firstName"
                        label="Nom:"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </GridItem>
                    <GridItem style={{ marginTop: 40 }} xs={12} sm={12} md={3}>
                      <TextField
                        onChange={handleChangeAuth}
                        style={{ width: "100%" }}
                        name="lastName"
                        label="Prénom:"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </GridItem>
                    <GridItem style={{ marginTop: 40 }} xs={12} sm={12} md={4}>
                      {emailErr && (
                        <p
                          style={{
                            position: "absolute",
                            fontWeight: 500,
                            color: "#f82249",
                            marginTop: -27,
                            fontStyle: "italic",
                          }}
                        >
                          {emailErr.email}
                        </p>
                      )}
                      {emailvalid && (
                        <p
                          style={{
                            position: "absolute",
                            fontWeight: 500,
                            color: "#f82249",
                            marginTop: -27,
                            fontStyle: "italic",
                          }}
                        >
                          {emailvalid.msg}
                        </p>
                      )}
                      <TextField
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={handleChangeAuth}
                        style={{ width: "100%" }}
                        label="Email:"
                        type="email"
                        name="email"
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem style={{ marginTop: 50 }} xs={12} sm={12} md={6}>
                      {passErr && (
                        <p
                          style={{
                            position: "absolute",
                            fontWeight: 500,
                            color: "#f82249",
                            marginTop: -27,
                            fontStyle: "italic",
                          }}
                        >
                          {passErr.msg}
                        </p>
                      )}
                      <TextField
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={handleChangeAuth}
                        style={{ width: "100%" }}
                        label="Mot De Passe:"
                        type="password"
                        name="password"
                      />
                    </GridItem>
                    <GridItem style={{ marginTop: 50 }} xs={12} sm={12} md={6}>
                      {userNameErr && (
                        <p
                          style={{
                            position: "absolute",
                            fontWeight: 500,
                            color: "#f82249",
                            marginTop: -27,
                            fontStyle: "italic",
                          }}
                        >
                          {userNameErr.userName}
                        </p>
                      )}
                      <TextField
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={handleChangeAuth}
                        style={{ width: "100%" }}
                        label="Username:"
                        type="text"
                        name="userName"
                      />
                    </GridItem>
                  </GridContainer>
                </CardBody>
                <CardFooter style={{}}>
                  {props.btModel && (
                    <Button
                      onClick={handleSubmit}
                      style={{
                        backgroundColor: "red",
                        display: "block",
                        position: "absolute",
                        marginTop: 20,
                      }}
                      color="primary"
                    >
                      Enregistrer
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ) : (
              <Card className={classes.cardCategoryWhite}>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>Paramètres Privé</h4>
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    <GridItem style={{ marginTop: 40 }} xs={12} sm={12} md={5}>
                      <TextField
                        onChange={handleChangeAuth}
                        style={{ width: "100%" }}
                        label="Nom:"
                        value={disableInpu}
                        disabled
                      />
                    </GridItem>
                    <GridItem style={{ marginTop: 40 }} xs={12} sm={12} md={3}>
                      <TextField
                        onChange={handleChangeAuth}
                        style={{ width: "100%" }}
                        label="Prénom:"
                        value={disableInpu}
                        disabled
                      />
                    </GridItem>
                    <GridItem style={{ marginTop: 40 }} xs={12} sm={12} md={4}>
                      <TextField
                        value={disableInpu}
                        disabled
                        onChange={handleChangeAuth}
                        style={{ width: "100%" }}
                        label="Email:"
                        type="email"
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem style={{ marginTop: 50 }} xs={12} sm={12} md={6}>
                      <TextField
                        value={disableInpu}
                        disabled
                        onChange={handleChangeAuth}
                        style={{ width: "100%" }}
                        label="Mot De Passe:"
                        type="password"
                      />
                    </GridItem>
                    <GridItem style={{ marginTop: 50 }} xs={12} sm={12} md={6}>
                      <TextField
                        onChange={handleChangeAuth}
                        style={{ width: "100%" }}
                        label="Username:"
                        type="text"
                        value={disableInpu}
                        disabled
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer></GridContainer>
                </CardBody>
              </Card>
            )}
            {props.btModel1 ? (
              <Card
                style={{ marginTop: 70 }}
                className={classes.cardCategoryWhite}
              >
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>
                    Paramètres généraux
                  </h4>
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    <GridItem style={{ marginTop: 50 }} xs={12} sm={12} md={4}>
                      <TextField
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={handleChange}
                        style={{ width: "100%" }}
                        label="Gouvernorat:"
                        type="text"
                        name="Gouvernorat"
                      />
                    </GridItem>
                    <GridItem style={{ marginTop: 50 }} xs={12} sm={12} md={4}>
                      <TextField
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={handleChange}
                        style={{ width: "100%" }}
                        label="Ville:"
                        type="text"
                        name="Ville"
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      {zipErr && (
                        <p
                          style={{
                            position: "absolute",
                            fontWeight: 500,
                            color: "#f82249",
                            marginTop: 20,
                            fontStyle: "italic",
                          }}
                        >
                          {zipErr.msg}
                        </p>
                      )}
                      <TextField
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={handleChange}
                        style={{ marginTop: 50, width: "100%" }}
                        label="Code Postal:"
                        type="number"
                        id="standard-basic"
                        name="Zip_Code"
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      {phone && (
                        <p
                          style={{
                            position: "absolute",
                            fontWeight: 500,
                            color: "#f82249",
                            marginTop: 20,
                            fontStyle: "italic",
                          }}
                        >
                          {phone.msg}
                        </p>
                      )}
                      <TextField
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={handleChange}
                        style={{ marginTop: 50, width: "100%" }}
                        label="Télephone:"
                        type="number"
                        id="standard-basic"
                        name="Phone"
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <TextField
                        onChange={handleChange}
                        style={{ marginTop: 50, width: "100%" }}
                        label="Date de naissance"
                        type="date"
                        name="Age"
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem
                      style={{
                        marginTop: 50,
                      }}
                      xs={12}
                      sm={12}
                      md={12}
                    >
                      <TextField
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={handleChange}
                        style={{ width: "100%" }}
                        label="À propos de vous:"
                        type="text"
                        name="aPropos"
                      />
                    </GridItem>
                  </GridContainer>
                </CardBody>
                <CardFooter style={{}}>
                  {props.btModel1 && (
                    <Button
                      onClick={handleSubmit1}
                      style={{
                        backgroundColor: "red",
                        display: "block",
                        position: "absolute",
                        marginTop: 20,
                      }}
                      color="primary"
                    >
                      Enregistrer
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ) : (
              <Card
                style={{ marginTop: 70 }}
                className={classes.cardCategoryWhite}
              >
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>
                    Paramètres généraux
                  </h4>
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    <GridItem style={{ marginTop: 50 }} xs={12} sm={12} md={4}>
                      <TextField
                        onChange={handleChangeAuth}
                        value={disableInpu}
                        disabled
                        style={{ width: "100%" }}
                        label="Gouvernorat:"
                      />
                    </GridItem>
                    <GridItem style={{ marginTop: 50 }} xs={12} sm={12} md={4}>
                      <TextField
                        onChange={handleChangeAuth}
                        value={disableInpu}
                        disabled
                        style={{ width: "100%" }}
                        label="Ville:"
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <TextField
                        onChange={handleChangeAuth}
                        value={disableInpu}
                        disabled
                        style={{ width: "100%", marginTop: 50 }}
                        label="Code Postal:"
                        type="email"
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <TextField
                        onChange={handleChangeAuth}
                        value={disableInpu}
                        disabled
                        style={{ marginTop: 50, width: "100%" }}
                        label="Télephone:"
                        type="number"
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <TextField
                        onChange={handleChangeAuth}
                        value={disableInpu}
                        style={{ marginTop: 50, width: "100%" }}
                        label="Date de naissance"
                        type="date"
                        disabled
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem
                      style={{
                        marginTop: 50,
                      }}
                      xs={12}
                      sm={12}
                      md={12}
                    >
                      <TextField
                        onChange={handleChangeAuth}
                        style={{ width: "100%" }}
                        label="À propos de vous:"
                        type="text"
                        value=""
                        disabled
                      />
                    </GridItem>
                  </GridContainer>
                </CardBody>
              </Card>
            )}
          </div>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <div
            style={{
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Card profile>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{
                    height: 200,
                    marginTop: -60,
                    width: 200,
                    textAlign: "center",
                  }}
                  src={`http://localhost:5000/${infos.userImage}`}
                  roundedCircle
                />
                <UploadImage _id={infos._id} refrechFunction={updateImage} />
              </div>
              <CardBody profile>
                <h4
                  className={classes.cardTitle}
                >{`${props.auth.currentUser.firstName} ${props.auth.currentUser.lastName}`}</h4>
                <h6 className={classes.cardCategory}>{adherent.Age}</h6>
                <h6
                  style={{
                    marginTop: "20px",
                  }}
                  className={classes.cardCategory}
                >
                  Email: {props.auth.currentUser.email}
                </h6>
                <h6
                  style={{
                    marginTop: "20px",
                  }}
                  className={classes.cardCategory}
                >
                  Habite a: {adherent.Ville}
                </h6>

                <h6
                  style={{
                    marginTop: "20px",
                  }}
                  className={classes.cardCategory}
                >
                  De: {adherent.Gouvernorat}
                </h6>
                <h6
                  style={{
                    marginTop: "20px",
                  }}
                  className={classes.cardCategory}
                >
                  Code Postale: {adherent.Zip_Code}
                </h6>
                <h6
                  style={{
                    marginTop: "20px",
                  }}
                  className={classes.cardCategory}
                >
                  Télephone: {adherent.Phone}
                </h6>

                <p
                  style={{
                    marginTop: 30,
                  }}
                  className={classes.cardCategory}
                >
                  {adherent.aPropos}
                </p>
                <Button
                  style={{ outline: "none", backgroundColor: "red" }}
                  onClick={handleClik}
                  color="primary"
                  round
                >
                  <EditIcon />
                </Button>
              </CardBody>
            </Card>
          </div>
        </GridItem>
      </GridContainer>
    </div>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors.errorUpdate,
  errors1: state.errors.adhErrors,
  errors2: state.errors,
  btModel: state.modelReducer.button1,
  btModel1: state.modelReducer.button2,
});
export default connect(mapStateToProps, {
  getAdhrent,
  getUser,
  clearErrorUSer,
  editeAdherent,
  clearErrorsAdh,
  setBt,
  setBt1,
  editeUser,
})(UserProfile);
