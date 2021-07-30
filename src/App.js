import { useSelector, useDispatch } from "react-redux";
import {
  clearStreets,
  clearBuildings,
  clearFlats,
  clearClients,
} from "./actions";
import {
  loadCompanies,
  loadStreets,
  loadBuildings,
  loadFlats,
  loadClients,
  deleteC,
  saveClient,
} from "./companiesReducer";
import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  let companies = useSelector((state) => state.companies);
  let streets = useSelector((state) => state.streets).reduce((a, x) => {
    a[x.companyId] = x.streetArr;
    return a;
  }, {});

  let buildings = useSelector((state) => state.buildings).reduce((a, x) => {
    a[x.streetId] = x.buildingsArr;
    return a;
  }, {});
  let flats = useSelector((state) => state.flats).reduce((a, x) => {
    a[x.houseId] = x.flatsArr;
    return a;
  }, {});

  let clientsArr = useSelector((state) => state.clients).reduce((a, x) => {
    a[x.addressId] = x.clientsArr;
    return a;
  }, {});

  const onLoad = () => {
    dispatch(loadCompanies());
  };

  const renderStreets = (companyId) => {
    if (!streets[companyId]) {
      dispatch(loadStreets(companyId));
    } else if (streets[companyId]) {
      dispatch(clearStreets(companyId));
    }
  };

  const renderBuildings = (streetId) => {
    if (!buildings[streetId]) {
      dispatch(loadBuildings(streetId));
    } else if (buildings[streetId]) {
      dispatch(clearBuildings(streetId));
    }
  };

  const renderFlats = (houseId) => {
    if (!flats[houseId]) {
      dispatch(loadFlats(houseId));
    } else if (flats[houseId]) {
      dispatch(clearFlats(houseId));
    }
  };

  const deleteClient = (clientId, houseId, addressId) => {
    dispatch(deleteC(clientId, houseId, addressId));
  };

  const addClient = (houseId, addressId) => {
    const client = {
      Name: name,
      Email: email,
      Phone: phone,
    };
    dispatch(saveClient(client, houseId, addressId));
    
    setName("");
    setEmail("");
    setPhone("");
  };

  const renderClients = (houseId, addressId) => {
    if (!clientsArr[addressId]) {
      dispatch(loadClients(houseId, addressId));
    } else if (clientsArr[addressId]) {
      dispatch(clearClients(addressId));
    }
  };

  return (
    <>
      <button onClick={onLoad}>Управляющие Компании</button>
      <hr />
      {companies.map((company) => {
        return (
          <li
            onClick={() => {
              renderStreets(company.id);
            }}
            key={company.id}
          >
            {company.name}

            <ul>
              {streets[company.id]
                ? Object.entries(streets[company.id]).map((s) => {
                    return (
                      <li
                        onClick={(e) => {
                          e.stopPropagation();
                          renderBuildings(s[0]);
                        }}
                      >
                        {s[1]}

                        <ul>
                          {buildings[s[0]]
                            ? Object.entries(buildings[s[0]]).map((b) => {
                                return (
                                  <li
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      renderFlats(b[0]);
                                    }}
                                  >
                                    {b[1]}
                                    <ul>
                                      {flats[b[0]]
                                        ? Object.entries(flats[b[0]]).map(
                                            (f) => {
                                              return (
                                                <li
                                                  onClick={(e) => {
                                                    e.stopPropagation();
                                                    renderClients(
                                                      b[0],
                                                      f[1].addressId
                                                    );
                                                  }}
                                                >
                                                  {f[0]}

                                                  <div className="container">
                                                    {clientsArr[f[1].addressId]
                                                      ? Object.entries(
                                                          clientsArr[
                                                            f[1].addressId
                                                          ]
                                                        ).map((c) => {
                                                          return (
                                                            <>
                                                              {Object.entries(
                                                                c[1]
                                                              ).map((cc) => {
                                                                return (
                                                                  <>
                                                                    <div className="client">
                                                                      <p>
                                                                        Name:
                                                                        {
                                                                          cc[1]
                                                                            .name
                                                                        }
                                                                      </p>
                                                                      <p>
                                                                        Phone:
                                                                        {
                                                                          cc[1]
                                                                            .email
                                                                        }
                                                                      </p>
                                                                      <p>
                                                                        Email:
                                                                        {
                                                                          cc[1]
                                                                            .phone
                                                                        }
                                                                      </p>
                                                                      <button
                                                                        onClick={(
                                                                          e
                                                                        ) => {
                                                                          e.stopPropagation();
                                                                          deleteClient(
                                                                            cc[1]
                                                                              .bindId,
                                                                            b[0],
                                                                            c[0]
                                                                          );
                                                                        }}
                                                                      >
                                                                        Удалить
                                                                        жильца
                                                                      </button>
                                                                    </div>
                                                                  </>
                                                                );
                                                              })}

                                                              <div
                                                                onClick={(
                                                                  e
                                                                ) => {
                                                                  e.stopPropagation();
                                                                }}
                                                                className="client"
                                                              >
                                                                <form
                                                                  onSubmit={(
                                                                    e
                                                                  ) => {
                                                                    e.preventDefault();
                                                                    addClient(
                                                                      b[0],
                                                                      f[1]
                                                                        .addressId
                                                                    );
                                                                  }}
                                                                >
                                                                  <input
                                                                    placeholder="Name"
                                                                    required
                                                                    value={name}
                                                                    onChange={(
                                                                      e
                                                                    ) => {
                                                                      setName(
                                                                        e.target
                                                                          .value
                                                                      );
                                                                    }}
                                                                  />
                                                                  <input
                                                                    placeholder="Email"
                                                                    required
                                                                    value={
                                                                      email
                                                                    }
                                                                    onChange={(
                                                                      e
                                                                    ) => {
                                                                      setEmail(
                                                                        e.target
                                                                          .value
                                                                      );
                                                                    }}
                                                                    type="email"
                                                                  />
                                                                  <input
                                                                    placeholder="Phone"
                                                                    required
                                                                    value={
                                                                      phone
                                                                    }
                                                                    onChange={(
                                                                      e
                                                                    ) => {
                                                                      setPhone(
                                                                        e.target
                                                                          .value
                                                                      );
                                                                    }}
                                                                  />
                                                                  <button type="submit">
                                                                    Добавить
                                                                    жильца
                                                                  </button>
                                                                </form>
                                                              </div>
                                                            </>
                                                          );
                                                        })
                                                      : ""}
                                                  </div>
                                                </li>
                                              );
                                            }
                                          )
                                        : ""}
                                    </ul>
                                  </li>
                                );
                              })
                            : ""}
                        </ul>
                      </li>
                    );
                  })
                : ""}
            </ul>
          </li>
        );
      })}
      <hr />
    </>
  );
}

export default App;
