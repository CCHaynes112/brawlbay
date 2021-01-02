import axios from 'axios';



class PlayerClient {
    static all(params) {
        return axios.get(
            'http://localhost:8000/api/brawlhalla/players',
            { params: params }
        );
    }

    static get(brawlhalla_id, params) {
        return axios.get(
            `http://localhost:8000/api/brawlhalla/players/${brawlhalla_id}`,
            { params: params }
        );
    }

    static leaderboard(params) {
        return axios.get(
            'http://localhost:8000/api/brawlhalla/players/leaderboard',
            { params: params }
        );
    }

    static search(params) {
        return axios.get(
            'http://localhost:8000/api/brawlhalla/players/search',
            { params: params }
        );
    }
}


export { PlayerClient }