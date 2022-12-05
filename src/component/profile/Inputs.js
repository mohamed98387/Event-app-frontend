import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import UploadFile from "./UploadFile";
// import { Link } from "react-router-dom";
import { Select } from "antd";
import TextField from "@material-ui/core/TextField";
import {
  registerAdherent,
  clearErrors,
  clearErrorsAdh,
  getAdhrent,
} from "../../actions/authActions";
import GridItem from "./components@material/Grid/GridItem.js";
import GridContainer from "./components@material/Grid/GridContainer.js";
import { makeStyles } from "@material-ui/core/styles";
import { removeModel } from "../../actions/modelAction";
const { Option } = Select;
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
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

const MyVerticallyCenteredModal = (props) => {
  const [infos, setInfos] = useState({
    Gouvernorat: "",
    Ville: "",
    Zip_Code: "",
    Phone: "",
    Age: "",
    aPropos: "",
  });
  // const [userImage, setImage] = useState(null);
  const classes = useStyles();
  const handleChange = (e) => {
    setInfos({ ...infos, [e.target.name]: e.target.value });
  };
  function handleChangeCity(value) {
    setInfos({ ...infos, Gouvernorat: value });
  }
  let Gouvernorat = props.errors.adhErrors.filter(
    (el) => el.param === "Gouvernorat"
  );

  let Gouvernorat1 = props.errors.adhErrors.filter(
    (el) =>
      el.message === "Gouvernorat ne doit pas avoir de caractères spéciaux"
  );
  let Gouvernorat2 = props.errors.adhErrors.filter(
    (el) => el.message === "Les caractères limités sont 25"
  );
  let Ville = props.errors.adhErrors.filter((el) => el.param === "Ville");
  let Ville1 = props.errors.adhErrors.filter(
    (el) => el.message === "Ville ne doit pas avoir de caractères spéciaux"
  );
  let Ville2 = props.errors.adhErrors.filter(
    (el) => el.message === "Les caractères limités sont 25"
  );
  let Zip_Code = props.errors.adhErrors.filter((el) => el.param === "Zip_Code");
  let Zip_Code1 = props.errors.adhErrors.filter(
    (el) => el.message === "Veuillez entrer un code postal valide"
  );

  let Phone = props.errors.adhErrors.filter((el) => el.param === "Phone");
  let phone1 = props.errors.adhErrors.filter(
    (el) =>
      el.message === "S'il vous plaît entrer un numéro de téléphone valide"
  );
  let Age = props.errors.adhErrors.filter((el) => el.param === "Age");

  let userImag = props.errors.adhErrors.filter(
    (el) => el.param === "userImage"
  );
  const [image, setImage] = useState("");

  const updateImage = (image) => {
    setImage(image);
  };
  const clearStates = () => {
    if (props.currentUser.adherent) {
      console.log(props.currentUser.adherent);
      setImage();
      setInfos({});
    }
  };
  function CreateUser() {
    props.registerAdherent({
      Gouvernorat: infos.Gouvernorat,
      Ville: infos.Ville,
      Zip_Code: infos.Zip_Code,
      Phone: infos.Phone,
      Age: infos.Age,
      aPropos: infos.aPropos,
      userImage: image,
    });
    clearStates();
    setTimeout(() => {
      props.clearErrorsAdh();
    }, 4000);
  }

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header
        closeButton
        style={{
          marginBottom: 10,
        }}
      >
        <Modal.Title id="contained-modal-title-vcenter">
          Pramètre de profile
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <GridContainer>
          <GridItem xs={6}>
            {Gouvernorat.length === 0
              ? null
              : Gouvernorat.map((el, i) => (
                  <h6
                    style={{
                      marginTop: "-19px",
                      color: "#fa3a3acb",
                      position: "absolute",
                      textAlign: "center",
                      fontStyle: "italic",
                    }}
                    key={i}
                  >
                    {el.msg}
                    {Gouvernorat1.message}
                  </h6>
                ))}
            {Gouvernorat1.length === 0
              ? null
              : Gouvernorat1.map((el, i) => (
                  <h6
                    style={{
                      marginTop: "-19px",
                      color: "#fa3a3acb",
                      position: "absolute",
                      textAlign: "center",
                      fontStyle: "italic",
                    }}
                    key={i}
                  >
                    {el.message}
                  </h6>
                ))}
            {Gouvernorat2.length === 0
              ? null
              : Gouvernorat2.map((el, i) => (
                  <h6
                    style={{
                      marginTop: "-19px",
                      color: "#fa3a3acb",
                      position: "absolute",
                      textAlign: "center",
                      fontStyle: "italic",
                    }}
                    key={i}
                  >
                    {el.message}
                  </h6>
                ))}
            <span
              style={{
                borderBottom: "solid 1px rgba(70, 70, 70, 0.842)",
              }}
            >
              <Select
                bordered={false}
                defaultValue="Gouvernorat"
                style={{ width: "95%", marginTop: 20, marginLeft: 17 }}
                onChange={handleChangeCity}
                listHeight={180}
              >
                {City.map((option) => (
                  <Option key={option.key} value={option.value}>
                    {option.value}
                  </Option>
                ))}
              </Select>
            </span>
          </GridItem>
          <GridItem xs={6}>
            {Ville.S === 0
              ? null
              : Ville.map((el, i) => (
                  <h6
                    style={{
                      marginTop: "-19px",
                      color: "#fa3a3acb",
                      position: "absolute",
                      textAlign: "center",
                      fontStyle: "italic",
                    }}
                    key={i}
                  >
                    {el.msg}
                  </h6>
                ))}
            {Ville1.length === 0
              ? null
              : Ville1.map((el, i) => (
                  <h6
                    style={{
                      marginTop: "-19px",
                      color: "#fa3a3acb",
                      position: "absolute",
                      textAlign: "center",
                      fontStyle: "italic",
                    }}
                    key={i}
                  >
                    {el.message}
                  </h6>
                ))}
            {Ville2.length === 0
              ? null
              : Ville2.map((el, i) => (
                  <h6
                    style={{
                      marginTop: "-19px",
                      color: "#fa3a3acb",
                      position: "absolute",
                      textAlign: "center",
                      fontStyle: "italic",
                    }}
                    key={i}
                  >
                    {el.message}
                  </h6>
                ))}
            <TextField
              style={{ width: "100%", marginBottom: "25px" }}
              onChange={handleChange}
              label="Ville:"
              name="Ville"
              value={infos.Ville}
            />
          </GridItem>
          <GridItem xs={6} md={6}>
            {Zip_Code.length === 0
              ? null
              : Zip_Code.map((el, i) => (
                  <h6
                    style={{
                      marginTop: "-19px",
                      color: "#fa3a3acb",
                      position: "absolute",
                      textAlign: "center",
                      fontStyle: "italic",
                    }}
                    key={i}
                  >
                    {el.msg}
                  </h6>
                ))}
            {Zip_Code1.length === 0
              ? null
              : Zip_Code1.map((el, i) => (
                  <h6
                    style={{
                      marginTop: "-19px",
                      color: "#fa3a3acb",
                      position: "absolute",
                      textAlign: "center",
                      fontStyle: "italic",
                    }}
                    key={i}
                  >
                    {el.message}
                  </h6>
                ))}
            <TextField
              style={{ width: "100%", marginBottom: "25px" }}
              onChange={handleChange}
              label="Zip_Code:"
              id="standard-basic"
              name="Zip_Code"
              type="number"
              value={infos.Zip_Code}
            />
          </GridItem>
          <GridItem xs={6} md={6}>
            {Phone.length === 0
              ? null
              : Phone.map((el, i) => (
                  <h6
                    style={{
                      marginTop: "-19px",
                      color: "#fa3a3acb",
                      position: "absolute",
                      textAlign: "center",
                      fontStyle: "italic",
                    }}
                    key={i}
                  >
                    {el.msg}
                  </h6>
                ))}
            {phone1.length === 0
              ? null
              : phone1.map((el, i) => (
                  <h6
                    style={{
                      marginTop: "-19px",
                      color: "#fa3a3acb",
                      position: "absolute",
                      textAlign: "center",
                      fontStyle: "italic",
                    }}
                    key={i}
                  >
                    {el.message}
                  </h6>
                ))}
            <TextField
              style={{ width: "100%", marginBottom: "25px" }}
              onChange={handleChange}
              label="Phone:"
              id="standard-basic"
              type="number"
              name="Phone"
              value={infos.Phone}
            />
          </GridItem>

          <GridItem xs={6} md={6}>
            {Age.length === 0
              ? null
              : Age.map((el, i) => (
                  <h6
                    style={{
                      marginTop: "-19px",
                      color: "#fa3a3acb",
                      position: "absolute",
                      textAlign: "center",
                      fontStyle: "italic",
                    }}
                    key={i}
                  >
                    {el.msg}
                  </h6>
                ))}

            <form className={classes.container} noValidate>
              <TextField
                id="date"
                onChange={handleChange}
                label="Date de naissance"
                type="date"
                name="Age"
                style={{ width: "100%", marginBottom: "25px" }}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </form>
          </GridItem>
          <GridItem xs={6} md={6}>
            {userImag.length === 0
              ? null
              : userImag.map((el, i) => (
                  <h6
                    style={{
                      marginTop: "-19px",
                      color: "#fa3a3acb",
                      position: "absolute",
                      textAlign: "center",
                      fontStyle: "italic",
                    }}
                    key={i}
                  >
                    {el.msg}
                  </h6>
                ))}
            <UploadFile refrechFunction={updateImage} />
          </GridItem>
          <GridItem xs={12} md={12}>
            <TextField
              style={{ width: "100%", marginBottom: "25px" }}
              label="À propos de vous:"
              name="aPropos"
              id="outlined-multiline-static"
              multiline
              rows={4}
              variant="outlined"
              value={infos.aPropos}
              onChange={handleChange}
            />
          </GridItem>
        </GridContainer>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Fermer</Button>
        <Button onClick={CreateUser}>créer un profil</Button>
      </Modal.Footer>
    </Modal>
  );
};
const mapStateToProps = (state) => {
  return {
    errors: state.errors,
    currentUser: state.auth,
  };
};
export default connect(mapStateToProps, {
  registerAdherent,
  clearErrors,
  clearErrorsAdh,
  getAdhrent,

  removeModel,
})(MyVerticallyCenteredModal);
