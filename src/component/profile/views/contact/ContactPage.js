import React, { useEffect } from "react";
import { getContact, deletecontact } from "../../../../actions/contactaction";
import { connect } from "react-redux";
import { Button } from "antd";

function ContactPage(props) {
  useEffect(() => {
    props.getContact();
  }, []);
  const renderTab = props.contactReducer.get.map((el, i) => {
    return (
      <tr key={i}>
        <td style={{ textAlign: "center" }}> {el.name} </td>
        <td style={{ textAlign: "center" }}> {el.email} </td>
        <td style={{ textAlign: "center" }}> {el.sujet} </td>
        <td style={{ textAlign: "center" }}> {el.message}</td>

        <td style={{ textAlign: "center" }}>
          <Button onClick={() => props.deletecontact(el._id)}>Supprimer</Button>
        </td>
      </tr>
    );
  });
  return (
    <div>
      <table>
        <thead>
          <tr style={{ textAlign: "center" }}>
            <th>name</th>
            <th>email</th>
            <th>sujet</th>
            <th>Message</th>

            <th>Supprimer</th>
          </tr>
        </thead>
        <tbody>{renderTab}</tbody>
      </table>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    contactReducer: state.contactReducer,
  };
};
export default connect(mapStateToProps, { getContact, deletecontact })(
  ContactPage
);
