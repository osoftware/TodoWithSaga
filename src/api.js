import axios from 'axios';

export function getRandomAdvice() {
    return axios
        .get('http://api.adviceslip.com/advice')
        .then(result => result.data.slip);
}