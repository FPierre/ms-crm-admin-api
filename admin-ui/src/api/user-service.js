import Vue from 'vue'

export default {
  login (userCredentials, cb, errorCb) {
    Vue.http.post('http://localhost:4000/login', { user: userCredentials }).then(response => {
      console.log(response.body)
      cb(response.body)
    }, response => errorCb())
  }
}
