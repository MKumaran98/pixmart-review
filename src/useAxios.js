import axios from 'axios';

const instance=axios.create({
    baseURL:"https://pixmart-api.herokuapp.com/"
})

export default instance