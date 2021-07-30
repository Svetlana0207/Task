export const ADD_NOTE = "ADD_NOTE";
export const SET_COMPANIES = "SET_COMPANIES";
export const SET_STREETS = "SET_STREETS";
export const SET_BUILDINGS = "SET_BUILDINGS";
export const SET_FLATS = "SET_FLATS";
export const SET_CLIENTS = "SET_CLIENTS";
export const CLEAR_NOTES = "CLEAR_NOTES";
export const CLEAR_STREETS = "CLEAR_STREETS";
export const CLEAR_BUILDINGS = "CLEAR_BUILDINGS";
export const CLEAR_FLATS = "CLEAR_FLATS";
export const CLEAR_CLIENTS = "CLEAR_CLIENTS";
export const DELETE_CLIENT = "DELETE_CLIENT";


export const setCompanies = (companies) => ({
  type: SET_COMPANIES,
  payload: companies,
});

export const setStreets = (noteId,streets) => ({
  type: SET_STREETS,
  payload: {companyId:noteId,streetArr:streets},
});

export const clearStreets = (companyId) => ({
  type: CLEAR_STREETS,
  companyId:companyId
});

export const setBuildings = (streetId,buildings) => ({
  type: SET_BUILDINGS,
  payload: {streetId:streetId,buildingsArr:buildings},
});

export const setFlats = (houseId,flats) => ({
  type: SET_FLATS,
  payload: {houseId:houseId,flatsArr:flats},
});


export const setClients = (addressId,clients) => ({
  type: SET_CLIENTS,
  payload: {addressId:addressId,clientsArr:clients},
});

export const clearBuildings = (streetId) => ({
  type: CLEAR_BUILDINGS,
  streetId:streetId
});

export const clearFlats = (houseId) => ({
  type: CLEAR_FLATS,
  houseId:houseId
});

export const clearClients = (addressId) => ({
  type: CLEAR_CLIENTS,
  addressId:addressId
});

