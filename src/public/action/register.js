import Axios from 'axios';

export const userRegister = () => {
    return {
        type: 'ADD_DATA',
        payload: Axios.post(`http://localhost:8888/books/register`,{
            username: state.username,
            name: state.name,
            email: state.email,
            password: state.password,
          })
    }
}