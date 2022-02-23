import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:3001/api/persons';

const getAll = () => axios.get(baseUrl).then(response => response.data)

const createOne = (newPerson) => axios
    .post(baseUrl, newPerson)
    .then(response => response.data)

const updateOne = (person) => axios
    .put(`${baseUrl}/${person.id}`, person)
    .then(response => response.data)

const deleteOne = (id) => axios
    .delete(`${baseUrl}/${id}`)
    .then(response => response.data)

const personService = { getAll, createOne, updateOne, deleteOne };
export default personService;