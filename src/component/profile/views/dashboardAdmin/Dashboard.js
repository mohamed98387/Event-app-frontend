import React from "react";

const Dashboard = () => {
  return (
    <div>
      <iframe
        title="Nombre des utilisateurs inscrit par jour"
        style={{
          background: "#21313C",
          border: "none",
          borderRadius: 2,
          boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
        }}
        width={"40%"}
        height={250}
        src="https://charts.mongodb.com/charts-project-0-jdfjy/embed/charts?id=36afa4c0-f637-4496-b6ce-6010048d4511&autoRefresh=60&theme=dark"
      />
      <iframe
        title="Nombre des créateurs inscrit par jour"
        style={{
          marginLeft: 10,
          background: "#21313C",
          border: "none",
          borderRadius: 2,
          boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
        }}
        width={"40%"}
        height={250}
        src="https://charts.mongodb.com/charts-project-0-jdfjy/embed/charts?id=cd19ea1b-1638-447c-9709-eb5b59854a98&autoRefresh=60&theme=dark"
      />
      <iframe
        title="Totale vidéos"
        style={{
          marginLeft: 10,
          background: "#21313C",
          border: "none",
          borderRadius: 2,

          boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
        }}
        width={"18%"}
        height={250}
        src="https://charts.mongodb.com/charts-project-0-jdfjy/embed/charts?id=4aa01f20-051d-4263-be37-9ef494bacb25&autoRefresh=60&theme=dark"
      />
      <iframe
        title="Nombre d'événements ajoutés par jour"
        style={{
          background: "#FFFFFF",
          border: "none",
          borderRadius: 2,
          marginTop: 20,
          boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
        }}
        width={"65%"}
        height={300}
        src="https://charts.mongodb.com/charts-project-0-jdfjy/embed/charts?id=40365bfc-d3b6-4e15-b748-325a53c80c11&autoRefresh=60&theme=light"
      />
      <iframe
        title="Nombre des événements par gouvernorat"
        style={{
          background: "#FFFFFF",
          border: "none",
          borderRadius: 2,
          marginTop: 20,
          marginLeft: 20,
          boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
        }}
        width={"33%"}
        height={300}
        src="https://charts.mongodb.com/charts-project-0-jdfjy/embed/charts?id=a01f999e-7dea-46c4-a5c3-7a8b66f193c6&autoRefresh=60&theme=light"
      />

      <iframe
        title="Nombre des vidéos pour chaque catégorie"
        style={{
          background: "#FFFFFF",
          border: "none",
          borderRadius: 2,
          marginTop: 20,
          boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
        }}
        width={"33%"}
        height={300}
        src="https://charts.mongodb.com/charts-project-0-jdfjy/embed/charts?id=e6297106-de1d-4f4e-ba7f-0570832d5822&autoRefresh=60&theme=light"
      />
      <iframe
        title="Nombre des vidéos ajoutés par jour"
        style={{
          background: "#FFFFFF",
          border: "none",
          marginTop: 20,
          marginLeft: 20,
          borderRadius: 2,
          boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
        }}
        width={"65%"}
        height={300}
        src="https://charts.mongodb.com/charts-project-0-jdfjy/embed/charts?id=e11f474c-3e3c-4c91-a3da-cd79d969e774&autoRefresh=60&theme=light"
      />
    </div>
  );
};

export default Dashboard;
