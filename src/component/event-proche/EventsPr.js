import React, { useState, useEffect } from "react";
import "./EventsPr.css";
import ReactLoading from "react-loading";
import Buttons from "./Button";
import axios from "axios";
import { Button } from "antd";
import { connect } from "react-redux";
import { Start_date } from "./data";
import AlertComponent from "./AlertComponent";
const EventsPr = (props) => {
  const [isLoading, setIsloading] = useState(false);
  const [Filters, setFilters] = useState({
    Start_date: [Start_date[0].array[0], Start_date[0].array[0]],
  });
  const [Skip, setSkip] = useState(0);
  const [Limit, setLimt] = useState(4);
  const [alladht, setAlladh] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [postSize, setPostSize] = useState(0);

  const getAdherents = () => {
    axios.get("/api/adherent/all").then((response) => {
      if (response.data) {
        setAlladh(response.data);
      } else alert("failed to fetch data");
    });
  };

  let arr = alladht.map(function (item) {
    return { user: item.User, userImage: item.userImage };
  });

  let myArray = [];
  const megreArray = () => {
    myArray = allEvents.map((e) => {
      for (let element of arr) {
        if (e.User._id === element.user) Object.assign(e, element);
      }
      return e;
    });
  };
  megreArray();
  useEffect(() => {
    fetch(`/api/users/all`)
      .then((res) => res.json())
      .then((json) => {
        setIsloading(true);
      });
  }, []);
  useEffect(() => {
    const variables = {
      skip: Skip,
      limit: Limit,
      filters: Filters,
    };
    getAllEvents(variables);
  }, []);
  const getAllEvents = (variables) => {
    axios.post("/api/event/getEventProche", variables).then((response) => {
      if (response.data.success) {
        if (variables.loadingMore) {
          setAllEvents([...allEvents, ...response.data.event]);
        } else {
          setAllEvents(response.data.event);
        }
        setPostSize(response.data.postSize);
      } else alert("failed to fetch data");
    });
  };

  const loadMore = () => {
    let skip = Skip + Limit;
    const variables = {
      skip: skip,
      limit: Limit,
      loadingMore: true,
    };
    getAllEvents(variables);
    setSkip(skip);
  };
  const showFilterResults = (filters) => {
    const variables = {
      skip: 0,
      limit: Limit,
      filters: filters,
    };
    getAllEvents(variables);
    setSkip(0);
  };
  const handleDate = (value) => {
    const data = Start_date;
    let array = [];
    for (let key in data) {
      if (data[key]._id === parseInt(value, 10)) {
        array = data[key].array;
      }
    }

    return array;
  };
  const handleFiltres = (filters, category) => {
    const newFilters = { ...Filters };
    newFilters[category] = filters;
    if (category === "Start_date") {
      let dateValue = handleDate(filters);
      newFilters["Start_date"] = dateValue;
    }

    showFilterResults(newFilters);
    setFilters(newFilters);
  };
  useEffect(() => {
    getAdherents();
  }, []);
  return (
    <div>
      {isLoading ? (
        <div style={{ backgroundColor: "#dbdbdbb6", paddingBottom: 40 }}>
          <div>
            <Buttons
              handlefiltres={(filtres) => handleFiltres(filtres, "Start_date")}
              Start_date={Start_date}
            />
          </div>
          {myArray.map((el, i) => (
            <AlertComponent setLimt={setLimt} data={el} key={i} />
          ))}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {postSize >= Limit && (
              <Button
                style={{
                  width: 150,
                  height: 50,
                  fontSize: 20,
                  borderRadius: 50,
                  marginBottom: 20,
                  marginTop: 30,
                }}
                onClick={loadMore}
              >
                Plus
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ReactLoading type="balls" height={120} width={120} color="#f82249" />
        </div>
      )}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    events: state.EventReducer,
  };
};
export default connect(mapStateToProps)(EventsPr);
