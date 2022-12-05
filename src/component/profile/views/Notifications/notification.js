/*eslint-disable*/
import React, { useState, useEffect } from "react";
import axios from "axios";
// nodejs library to set properties for components
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import moment from "moment";

import GridItem from "../../components@material/Grid/GridItem.js";
import GridContainer from "../../components@material/Grid/GridContainer.js";
import Card from "../../components@material/Card/Card.js";
import CardHeader from "../../components@material/Card/CardHeader.js";
import CardBody from "../../components@material/Card/CardBody.js";
import { Alert } from "antd";
const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
};

const useStyles = makeStyles(styles);

function Notifications(props) {
  const classes = useStyles();
  const [Notification, setNotification] = useState([]);

  const notification = () => {
    axios.post("/api/notification/getNotification").then((res) => {
      if (res.data.success) {
        setNotification(res.data.notification);
      }
    });
  };
  const onClose = (id) => {
    axios.delete(`/api/notification/delete/${id}`).then((res) => {
      if (res.data.success) {
        notification();
      }
    });
  };
  useEffect(() => {
    notification();
  }, []);

  return (
    <Card>
      <CardHeader color="primary">
        <h4 className={classes.cardTitleWhite}>Notifications</h4>
      </CardHeader>
      <CardBody>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            {Notification.map((el, i) => (
              <div key={i}>
                <Alert
                  message={`${el.text} ${el.Titre} à ${moment(
                    el.createdAt
                  ).format("YYYY-MM-DD HH:mm:ss")}`}
                  closable
                  style={{
                    backgroundColor: "rgba(255,255,255,.62)",
                    border: "2px solid",
                    marginTop: 20,
                  }}
                  onClose={() => onClose(el._id)}
                />
              </div>
            ))}
          </GridItem>
        </GridContainer>
      </CardBody>
    </Card>
  );
}

export default Notifications;
