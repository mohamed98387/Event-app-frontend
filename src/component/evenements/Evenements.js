import React, { useEffect, useState } from "react";
import NavApp from "../nav-app/NavApp";
import Footer from "../footer/Footer";
import BackToTop from "../Back-to-top/BackTop";
import "./Events.css";
import axios from "axios";
import { Col, Row, Button } from "antd";
import SearchComponent from "./Search";
import { Container } from "react-bootstrap";

import CheckBoxes from "./CheckBoxes";
import { connect } from "react-redux";
import { getAllUsers, getAllAdherent } from "../../actions/authActions";
import { getEvents } from "../../actions/actions";
import RadioBox from "./RadioBox";
import Card from "./Card";
import { Type_event, Start_date, City } from "./Datas";
import ReactLoading from "react-loading";
import { Collapse, Radio } from "antd";
const { Panel } = Collapse;
const Evenements = ({ getEvents, location, events }) => {
  const [isLoading, setIsloading] = useState(false);
  const [Skip, setSkip] = useState(0);
  const [Limit, setLimt] = useState(9);
  const [allEvents, setAllEvents] = useState([]);
  const [alladht, setAlladh] = useState([]);
  const [users, SetUseres] = useState([]);
  const [postSize, setPostSize] = useState(0);
  const [SearchTerms, setSearchTerms] = useState("");
  const [Value, setValue] = useState("");
  const [Filters, setFilters] = useState({
    Type_event: [],
    Start_date: [],
  });
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`/api/users/all`);
      SetUseres(result.data);
    };

    fetchData();
  }, []);
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
        getEvents();
        setIsloading(true);
      });
  }, [getEvents]);
  const getAllEvents = (variables) => {
    axios.post("/api/event/getEvent", variables).then((response) => {
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

  useEffect(() => {
    const variables = {
      skip: Skip,
      limit: Limit,
    };
    getAllEvents(variables);
  }, []);
  const loadMore = () => {
    let skip = Skip + Limit;
    const variables = {
      skip: skip,
      limit: Limit,
      filters: Filters,
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
      Validation: true,
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
  const refrechFunction = (newSerachTerm) => {
    const variables = {
      skip: 0,
      limit: Limit,
      filters: Filters,
      searchTerm: newSerachTerm,
    };
    setSkip(0);
    setSearchTerms(newSerachTerm);
    getAllEvents(variables);
  };
  useEffect(() => {
    getAdherents();
  }, []);
  const refrechDate = (date) => {
    setFilters({ ...Filters, Start_date: date });
  };
  const serach = () => {
    const variables = {
      skip: 0,
      limit: Limit,
      filters: Filters,
    };
    getAllEvents(variables);
  };

  const renderRadioBox = () =>
    City &&
    City.map((value) => (
      <span key={value._id}>
        <Radio array={value.array} value={`${value.value}`}>
          {value.name}
        </Radio>
      </span>
    ));
  const handleChangeCity = (e) => {
    setValue(e.target.value);
  };
  return (
    <div>
      {isLoading ? (
        <div
          style={{
            backgroundColor: "rgba(216, 224, 233, 0.815)",
            marginTop: -100,
          }}
        >
          <NavApp
            SearchTerms={SearchTerms}
            setLimt={setLimt}
            navEvent={location.pathname}
          />
          <Container fluid={true}>
            <Row className="containerSerch">
              <Col
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
                xs={24}
              >
                <SearchComponent
                  allEvents={allEvents}
                  refrechFunction={refrechFunction}
                  style={{ width: "100%" }}
                />
              </Col>
            </Row>
          </Container>
          <Row
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "flex-end",
            }}
          >
            <Col xs={24} md={20}>
              <div style={{ marginTop: 30, marginRight: 6 }}>
                <Collapse
                  style={{ minWidth: 150 }}
                  defaultActiveKey={["0", "1"]}
                >
                  <Panel
                    disabled={true}
                    forceRender={false}
                    header="gouvernorat"
                    key="1"
                  >
                    <Radio.Group onChange={handleChangeCity} value={Value}>
                      {renderRadioBox()}
                    </Radio.Group>
                  </Panel>
                </Collapse>
              </div>
            </Col>
          </Row>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              marginTop: 30,
            }}
          >
            <Row style={{ width: "100%" }} gutter={[16, 16]}>
              <Col style={{ marginTop: -154 }} xs={24} sm={24} md={4}>
                <CheckBoxes
                  Type_event={Type_event}
                  handlefiltres={(filtres) =>
                    handleFiltres(filtres, "Type_event")
                  }
                />
                <RadioBox
                  refrechDate={refrechDate}
                  serach={serach}
                  Start_date={Start_date}
                  handlefiltres={(filtres) =>
                    handleFiltres(filtres, "Start_date")
                  }
                />
              </Col>

              <Col xs={24} sm={24} md={20}>
                <Row gutter={[16, 16]}>
                  {myArray
                    .filter(
                      (el) =>
                        el.Validation === true &&
                        el.City.toLowerCase().includes(Value.toLowerCase())
                    )
                    .map((el, i) => (
                      <Col key={i} xs={24} md={12} xl={8}>
                        <Card data={el} />
                      </Col>
                    ))}
                </Row>
              </Col>
            </Row>
          </div>
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
                  marginBottom: 50,
                  marginTop: 30,
                }}
                onClick={loadMore}
              >
                Plus
              </Button>
            )}
          </div>
          <Footer />
          <BackToTop />
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
          <ReactLoading
            users={users}
            type="balls"
            height={100}
            width={100}
            color="#f82249"
          />
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

export default connect(mapStateToProps, {
  getEvents,
  getAllAdherent,

  getAllUsers,
})(Evenements);
