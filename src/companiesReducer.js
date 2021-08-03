import {
  CLEAR_STREETS,
  setCompanies,
  setStreets,
  setClients,
  SET_CLIENTS,
  SET_STREETS,
  SET_COMPANIES,
  SET_BUILDINGS,
  setBuildings,
  CLEAR_BUILDINGS,
  setFlats,
  SET_FLATS,
  CLEAR_FLATS,
  CLEAR_CLIENTS,
} from "./actions";

const initialState = {
  companies: [],
  streets: [],
  buildings: [],
  flats: [],
  clients: [],
};

export const companiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_COMPANIES: {
      return { ...state, companies: action.payload };
    }
    case SET_STREETS: {
      return { ...state, streets: [...state.streets, action.payload] };
    }
    case SET_BUILDINGS: {
      return { ...state, buildings: [...state.buildings, action.payload] };
    }
    case SET_FLATS: {
      return { ...state, flats: [...state.flats, action.payload] };
    }
    case SET_CLIENTS: {
      return { ...state, clients: [...state.clients, action.payload] };
    }

    case CLEAR_STREETS: {
      return {
        ...state,
        streets: state.streets.filter(
          (item) => item.companyId != action.companyId
        ),
      };
    }
    case CLEAR_BUILDINGS: {
      return {
        ...state,
        buildings: state.buildings.filter(
          (item) => item.streetId != action.streetId
        ),
      };
    }
    case CLEAR_FLATS: {
      return {
        ...state,
        flats: state.flats.filter((item) => item.houseId != action.houseId),
      };
    }
    case CLEAR_CLIENTS: {
      return {
        ...state,
        clients: state.clients.filter(
          (item) => item.addressId != action.addressId
        ),
      };
    }

    default:
      return state;
  }
};

export const saveClient =
  (client, houseId, addressId) => async (dispatch, getState) => {
    await fetch("https://dispex.org/api/vtest/HousingStock/client", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(client),
    })
      .then((res) => res.json())
      .then(async (data) => {
        const update = {
          AddressId: addressId,
          ClientId: data.id,
        };
        await fetch("https://dispex.org/api/vtest/HousingStock/bind_client", {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
          body: JSON.stringify(update),
        });
      });

    dispatch(loadClients(houseId, addressId));
  };

export const loadCompanies = () => async (dispatch, getState) => {
  const companies = await fetch(
    "https://dispex.org/api/vtest/Request/companies"
  ).then((res) => res.json());

  dispatch(setCompanies(companies));
};
export const loadStreets = (companyId) => async (dispatch, getState) => {
  const company = await fetch(
    `https://dispex.org/api/vtest/HousingStock?companyId=${companyId}`
  ).then((res) => res.json());

  const streets = company.reduce((a, x) => {
    a[x.streetId] = x.streetName;
    return a;
  }, {});
  if (Object.keys(streets).length == 0) {
    dispatch(setStreets(companyId, { streets: "Ничего не найдено" }));
  } else {
    dispatch(setStreets(companyId, streets));
  }
};

export const loadBuildings = (streetId) => async (dispatch, getState) => {
  const street = await fetch(
    `https://dispex.org/api/vtest/HousingStock?streetId=${streetId}`
  ).then((res) => res.json());

  const buildings = street.reduce((a, x) => {
    a[x.houseId] = x.building;
    return a;
  }, {});
  dispatch(setBuildings(streetId, buildings));
};

export const loadFlats = (houseId) => async (dispatch, getState) => {
  const building = await fetch(
    `https://dispex.org/api/vtest/HousingStock?houseId=${houseId}`
  ).then((res) => res.json());

  const flats = building.reduce((a, x) => {
    a[x.flat] = { clients: x.clients, addressId: x.addressId };
    return a;
  }, {});

  dispatch(setFlats(houseId, flats));
};

export const loadClients =
  (houseId, addressId) => async (dispatch, getState) => {
    const building = await fetch(
      `https://dispex.org/api/vtest/HousingStock?houseId=${houseId}`
    ).then((res) => res.json());

    const clients = building
      .filter((item) => item.addressId == addressId)
      .reduce((a, x) => {
        a[x.addressId] = x.clients;
        return a;
      }, {});
    console.log("clBuild", clients);

    dispatch(setClients(addressId, clients));
  };

export const deleteC =
  (clientId, houseId, addressId) => async (dispatch, getState) => {
    await fetch(
      `https://dispex.org/api/vtest/HousingStock/bind_client/${clientId}`,
      {
        method: "DELETE",
      }
    ).then((res) => console.log(res.text()));

    dispatch(loadClients(houseId, addressId));
  };
