import axios from 'axios'

if (window.location.origin === 'http://localhost:3000') {
  axios.defaults.baseURL = 'http://127.0.0.1:8000'
} else {
  axios.defaults.baseURL = window.location.origin
}

class PlayerClient {
  static all (params) {
    return axios.get(
      '/api/brawlhalla/players',
      { params: params }
    )
  }

  static get (brawlhallaID, params) {
    return axios.get(
        `/api/brawlhalla/players/${brawlhallaID}`,
        { params: params }
    )
  }

  static leaderboard (params) {
    return axios.get(
      '/api/brawlhalla/players/leaderboard',
      { params: params }
    )
  }

  static search (params) {
    return axios.get(
      '/api/brawlhalla/players/search',
      { params: params }
    )
  }
}

class UtilityClient {
  static sendEmail (params) {
    return axios.post(
      '/api/brawlhalla/send_email',
      { params: params }
    )
  }
}

export { PlayerClient, UtilityClient }
