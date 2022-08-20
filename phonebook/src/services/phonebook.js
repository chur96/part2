import { render } from '@testing-library/react'
import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
    const initialData = axios
                            .get(baseUrl)
                            .then(response => response.data)
    return initialData
}

const create = (newObject) => {
    const initialData = axios
                        .post(baseUrl, newObject)
                        .then(response => response.data)
    return initialData
    }

const update = (id, newObject) => {
    const initialData = axios
                        .put(`${baseUrl}/${id}`, newObject)
                        .then(response => response.data)
    return initialData
}

const deletePhone = (id) => {
    const initialData = axios
                        .delete(`http://localhost:3001/persons/${id}`)
    return initialData
}

export default {getAll, create, update, deletePhone}