import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import { Button, Form } from "antd";
import GridItem from "../../components@material/Grid/GridItem.js";
import GridContainer from "../../components@material/Grid/GridContainer.js";
import Card from "../../components@material/Card/Card.js";
import CardHeader from "../../components@material/Card/CardHeader.js";
import TextField from "@material-ui/core/TextField";
import FileUpload from "./FileUpload";

import { Select } from "antd";

import {
  addEvent,
  clearErrorEvent,
  getUserEvents,
} from "../../../../actions/actions";
import { connect } from "react-redux";
import Axios from "axios";
const { Option } = Select;
const Type_event = [
  { key: 1, value: "Sportif" },
  { key: 2, value: "Educatif" },
  { key: 3, value: "Scientifique" },
  { key: 4, value: "Culturel" },
  { key: 5, value: "Artisanat" },
  { key: 6, value: "Festivale" },
];
const City = [
  { _id: 1, value: "Ariana" },
  { _id: 2, value: "Beja" },
  { _id: 3, value: "Ben Arous" },
  { _id: 4, value: "Bizerte" },
  { _id: 5, value: "Gabes" },
  { _id: 6, value: "Gafsa" },
  { _id: 7, value: "Jendouba" },
  { _id: 8, value: "Kairouan" },
  { _id: 9, value: "Kasserine" },
  { _id: 10, value: "Kebili" },
  { _id: 11, value: "Kef" },
  { _id: 12, value: "Mahdia" },
  { _id: 13, value: "Manouba" },
  { _id: 14, value: "Medenine" },
  { _id: 15, value: "Monastir" },
  { _id: 16, value: "Nabeul" },
  { _id: 17, value: "Sfax" },
  { _id: 18, value: "Sidi Bouzid" },
  { _id: 19, value: "Siliana" },
  { _id: 20, value: "Sousse" },
  { _id: 21, value: "Tataouine" },
  { _id: 22, value: "Tozeur" },
  { _id: 23, value: "Tunis" },
  { _id: 24, value: "Zaghouan" },
];
const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
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
function TableList(props) {
  const classes = useStyles();
  const [Titre, setTitre] = useState({ Titre: "" });
  const [Images, setImages] = useState([]);
  const [infos, setInfos] = useState({
    Type_event: null,
    City: "",
    Country: "",
    Titre: "",
    Description: "",
    Zip_Code: "",
    Start_date: "",
    End_date: "",
    Validation: true,
    user: {
      _id: props.auth.adherent._id,
      nbr_events: props.auth.adherent.nbr_events + 1,
    },
    userId: props.auth.user.id,
    text: `${props.auth.user.userName} à ajouter un nouveau événement`,
  });
  const handleChange = (e) => {
    setInfos({
      ...infos,
      [e.target.name]: e.target.value,
    });
    setTitre({ ...Titre, [e.target.Titre]: e.target.value });
  };
  const handleChangeDate = (e) => {
    setInfos({
      ...infos,
      [e.target.name]: new Date(e.target.value.replace(/-0+/g, "-")).getTime(),
    });
  };
  function handleChangeType(value) {
    setInfos({ ...infos, Type_event: value });
  }
  const onSubmit = (event) => {
    Axios.post("/api/event", infos).then((res) => {
      alert("votre événement est ajouté");
      window.location.reload(false);
    });

    props.getUserEvents();
    setTimeout(() => {
      props.clearErrorEvent();
    }, 5000);
  };
  function handleChangeCity(value) {
    setInfos({ ...infos, City: value });
  }
  const updateImages = (newImages) => {
    setImages(newImages);
    setInfos({ ...infos, EventImage: newImages });
  };
  const [err, setErros] = useState([]);
  useEffect(() => {
    setErros(props.error.errors);
  }, [props.error.errors]);

  const TitreErr = err.filter((el) => el.msg === "veuillez saisir le titre")[0];
  const TitreErr2 = err.filter(
    (el) => el.message === "L'événement titre ne doit plus avoir 25 caractères"
  )[0];

  const TypeErr = err.filter(
    (el) => el.msg === "veuillez saisir votre Type_évènement"
  )[0];

  const Start_DateErr = err.filter(
    (el) => el.msg === "veuillez entrer la date de début"
  )[0];

  const End_DateErr = err.filter(
    (el) => el.msg === "veuillez entrer la date de fin"
  )[0];

  const CityErr = err.filter(
    (el) => el.msg === "veuillez entrer le nom de votre ville"
  )[0];
  const CityErr2 = err.filter(
    (el) => el.message === "la ville ne doit contenir plus 25 caractères"
  )[0];

  const CountryErr = err.filter(
    (el) => el.msg === "veuillez entrer le nom de votre pays"
  )[0];
  const CountryErr2 = err.filter(
    (el) => el.message === "Le pays ne doit pas contenir plus de 25 caractères"
  )[0];

  const Zip_CodeErr = err.filter(
    (el) => el.msg === "S'il vous plait, entrer votre code postal"
  )[0];
  const Zip_CodeErr2 = err.filter(
    (el) =>
      el.message === "Veuillez entrer un code postal valide = 4 chiffres //"
  )[0];

  const DescriptionErr = err.filter(
    (el) => el.msg === "veuillez saisir la description"
  )[0];
  const DescriptionErr2 = err.filter(
    (el) => el.message === "La description ne doit pas plus de 5000"
  )[0];

  const ImagesErr = err.filter(
    (el) => el.msg === "veuillez entrer les images"
  )[0];

  return (
    <GridContainer styles={{ BackgroundColor: "blue !important" }}>
      <GridItem xs={12} sm={12} md={12}>
        <Card images={Images}>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Ajouter évènement</h4>
          </CardHeader>
          <div className="container">
            <Form onSubmit={onSubmit}>
              <div style={{ justifyContent: "space-around" }}>
                <h3
                  className="align-self-center "
                  style={{
                    marginLeft: "50px",
                    fontFamily: "permanent Marker, cursive",
                    letterSpacing: "0.1rem",
                    fontSize: 18,
                    textTransform: "uppercase",
                    color: "rgb(109, 9, 109)",
                    marginTop: "10px",
                  }}
                >
                  photos de l'événement :
                </h3>
                {ImagesErr && (
                  <p
                    style={{
                      position: "absolute",
                      fontWeight: 500,
                      color: "#f82249",
                      marginTop: -27,
                      fontStyle: "italic",
                      marginLeft: "250px",
                    }}
                  >
                    {ImagesErr.msg}
                  </p>
                )}

                <FileUpload refreshfunction={updateImages} />
                <br />
              </div>
              <div className="row" style={{ marginTop: "10px" }}>
                {TitreErr && (
                  <p
                    style={{
                      position: "absolute",
                      fontWeight: 500,
                      color: "#f82249",
                      marginTop: -27,
                      fontStyle: "italic",
                      marginLeft: "250px",
                    }}
                  >
                    {TitreErr.msg}
                  </p>
                )}
                {TitreErr2 && (
                  <p
                    style={{
                      position: "absolute",
                      fontWeight: 500,
                      color: "#f82249",
                      marginTop: -27,
                      fontStyle: "italic",
                      marginLeft: "160px",
                    }}
                  >
                    {TitreErr2.message}
                  </p>
                )}
                <h3
                  className="align-self-center "
                  style={{
                    marginLeft: "50px",
                    fontFamily: "permanent Marker, cursive",
                    letterSpacing: "0.1rem",
                    fontSize: 18,
                    textTransform: "uppercase",
                    color: "rgb(109, 9, 109)",
                  }}
                >
                  Titre :
                </h3>

                <TextField
                  onChange={handleChange}
                  name="Titre"
                  style={{
                    width: "20%",
                    marginLeft: "20px",
                    marginTop: "10px",
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />

                <br />
                <br />
                {TypeErr && (
                  <p
                    style={{
                      position: "absolute",
                      fontWeight: 500,
                      color: "#f82249",
                      marginTop: -27,
                      fontStyle: "italic",
                      marginLeft: "600px",
                    }}
                  >
                    {TypeErr.msg}
                  </p>
                )}
                <h3
                  className="align-self-center"
                  style={{
                    marginLeft: "50px",
                    fontFamily: "permanent Marker, cursive",
                    letterSpacing: "0.1rem",
                    fontSize: 18,
                    textTransform: "uppercase",
                    color: "rgb(109, 9, 109)",
                  }}
                >
                  Type :
                </h3>
                <Select
                  defaultValue="None"
                  bordered={false}
                  style={{ width: 200, marginTop: 12, marginLeft: 20 }}
                  onChange={handleChangeType}
                >
                  {Type_event.map((option) => (
                    <Option
                      aria-label="None"
                      key={option.key}
                      value={option.key}
                    >
                      {option.value}
                    </Option>
                  ))}
                </Select>
              </div>
              <br />
              <br />

              <h3
                className="align-self-center"
                style={{
                  marginLeft: "40px",
                  fontFamily: "permanent Marker, cursive",
                  letterSpacing: "0.1rem",
                  fontSize: 18,
                  textTransform: "uppercase",
                  color: "rgb(109, 9, 109)",
                }}
              >
                Date :
              </h3>
              <div className="row">
                {Start_DateErr && (
                  <p
                    style={{
                      position: "absolute",
                      fontWeight: 500,
                      color: "#f82249",
                      marginTop: -27,
                      fontStyle: "italic",
                      marginLeft: "250px",
                    }}
                  >
                    {Start_DateErr.msg}
                  </p>
                )}
                {End_DateErr && (
                  <p
                    style={{
                      position: "absolute",
                      fontWeight: 500,
                      color: "#f82249",
                      marginTop: -27,
                      fontStyle: "italic",
                      marginLeft: "600px",
                    }}
                  >
                    {End_DateErr.msg}
                  </p>
                )}
                <TextField
                  // value={DateValue}
                  onChange={handleChangeDate}
                  style={{ width: "40%", marginLeft: "50px" }}
                  label="date de debut"
                  type="date"
                  name="Start_date"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  // value={DateValue}
                  onChange={handleChangeDate}
                  style={{ width: "40%", marginLeft: "50px" }}
                  label="date fe fin"
                  type="date"
                  name="End_date"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
              <br />
              <br />
              <div className="row">
                {CityErr && (
                  <p
                    style={{
                      position: "absolute",
                      fontWeight: 500,
                      color: "#f82249",
                      marginTop: -27,
                      fontStyle: "italic",
                      marginLeft: "100px",
                    }}
                  >
                    {CityErr.msg}
                  </p>
                )}
                {CityErr2 && (
                  <p
                    style={{
                      position: "absolute",
                      fontWeight: 500,
                      color: "#f82249",
                      marginTop: -27,
                      fontStyle: "italic",
                      marginLeft: "100px",
                    }}
                  >
                    {CityErr2.message}
                  </p>
                )}

                {CountryErr && (
                  <p
                    style={{
                      position: "absolute",
                      fontWeight: 500,
                      color: "#f82249",
                      marginTop: -27,
                      fontStyle: "italic",
                      marginLeft: "450px",
                    }}
                  >
                    {CountryErr.msg}
                  </p>
                )}
                {CountryErr2 && (
                  <p
                    style={{
                      position: "absolute",
                      fontWeight: 500,
                      color: "#f82249",
                      marginTop: -27,
                      fontStyle: "italic",
                      marginLeft: "450px",
                    }}
                  >
                    {CountryErr2.message}
                  </p>
                )}
                {Zip_CodeErr && (
                  <p
                    style={{
                      position: "absolute",
                      fontWeight: 500,
                      color: "#f82249",
                      marginTop: -27,
                      fontStyle: "italic",
                      marginLeft: "830px",
                    }}
                  >
                    {Zip_CodeErr.msg}
                  </p>
                )}
                {Zip_CodeErr2 && (
                  <p
                    style={{
                      position: "absolute",
                      fontWeight: 500,
                      color: "#f82249",
                      marginTop: -32,
                      fontStyle: "italic",
                      marginLeft: "830px",
                    }}
                  >
                    {Zip_CodeErr2.message}
                  </p>
                )}
                <h3
                  className="align-self-center"
                  style={{
                    marginLeft: "50px",
                    fontFamily: "permanent Marker, cursive",
                    letterSpacing: "0.1rem",
                    fontSize: 18,
                    textTransform: "uppercase",
                    color: "rgb(109, 9, 109)",
                  }}
                >
                  Gouvernorat:
                </h3>

                <Select
                  bordered={false}
                  defaultValue="None"
                  style={{ width: 150 }}
                  onChange={handleChangeCity}
                  listHeight={180}
                >
                  {City.map((option) => (
                    <Option key={option.key} value={option.value}>
                      {option.value}
                    </Option>
                  ))}
                </Select>
                <h3
                  className="align-self-center"
                  style={{
                    marginLeft: "30px",
                    fontFamily: "permanent Marker, cursive",
                    letterSpacing: "0.1rem",
                    fontSize: 18,
                    textTransform: "uppercase",
                    color: "rgb(109, 9, 109)",
                  }}
                >
                  ville:
                </h3>
                <TextField //value={TitleValue}
                  onChange={handleChange}
                  name="Country"
                  style={{ width: "12%" }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <h3
                  className="align-self-center"
                  style={{
                    fontFamily: "permanent Marker, cursive",
                    letterSpacing: "0.1rem",
                    fontSize: 18,
                    textTransform: "uppercase",
                    color: "rgb(109, 9, 109)",
                    marginLeft: "30px",
                  }}
                >
                  Code Postal:
                </h3>
                <TextField //value={TitleValue}
                  onChange={handleChange}
                  name="Zip_Code"
                  style={{ width: "12%" }}
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>

              <div className="row" style={{ marginTop: "30px" }}>
                <h3
                  className="align-self-center"
                  style={{
                    marginLeft: "50px",
                    fontFamily: "permanent Marker, cursive",
                    letterSpacing: "0.1rem",
                    fontSize: 18,
                    textTransform: "uppercase",
                    color: "rgb(109, 9, 109)",
                  }}
                >
                  Description
                </h3>
                {DescriptionErr && (
                  <p
                    style={{
                      position: "absolute",
                      fontWeight: 500,
                      color: "#f82249",
                      marginTop: -27,
                      fontStyle: "italic",
                      marginLeft: "350px",
                    }}
                  >
                    {DescriptionErr.msg}
                  </p>
                )}{" "}
                {DescriptionErr2 && (
                  <p
                    style={{
                      position: "absolute",
                      fontWeight: 500,
                      color: "#f82249",
                      marginTop: -27,
                      fontStyle: "italic",
                      marginLeft: "350px",
                    }}
                  >
                    {DescriptionErr2.messageg}
                  </p>
                )}
                <TextField
                  style={{
                    width: "90%",
                    marginBottom: "25px",
                    marginLeft: "50px",
                  }}
                  label="Description"
                  name="Description"
                  id="outlined-multiline-static"
                  multiline
                  rows={4}
                  variant="outlined"
                  onChange={handleChange}
                />
              </div>
              <Button
                onClick={onSubmit}
                style={{
                  marginLeft: "50px",
                  backgroundColor: "rgb(109, 9, 109)",
                  color: "white",
                  fontSize: "20px",
                  borderRadius: "5px",
                  width: "150px",
                  height: "50px",
                  borderColor: "transparent",
                  marginTop: "10px",
                }}
              >
                Ajouter
              </Button>
            </Form>
            <br />
          </div>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    error: state.ErrorEventReeducer,
  };
};

export default connect(mapStateToProps, {
  addEvent,
  clearErrorEvent,
  getUserEvents,
})(TableList);
