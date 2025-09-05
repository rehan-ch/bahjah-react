import { BASE_URL } from '../utills/varriables';

class ApiService {
  constructor() {
    this.baseURL = BASE_URL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'ngrok-skip-browser-warning': 'true',
    };
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: this.defaultHeaders,
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorText = await response.text().catch(() => '');
        throw new Error(`HTTP ${response.status} ${response.statusText} – ${errorText}`);
      }

      const contentType = response.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        const sample = (await response.clone().text()).slice(0, 200);
        throw new Error(`Expected JSON but got "${contentType}". Sample:\n${sample}`);
      }

      const data = await response.json();
      
      if (data.success === false) {
        throw new Error(data.message || 'API request failed');
      }

      return data;
    } catch (error) {
      console.error(`API Error [${endpoint}]:`, error);
      throw error;
    }
  }

  async get(endpoint, headers = {}) {
    return this.request(endpoint, {
      method: 'GET',
      headers: { ...this.defaultHeaders, ...headers },
    });
  }

  async post(endpoint, data = null, headers = {}) {
    return this.request(endpoint, {
      method: 'POST',
      headers: { ...this.defaultHeaders, ...headers },
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put(endpoint, data = null, headers = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      headers: { ...this.defaultHeaders, ...headers },
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete(endpoint, headers = {}) {
    return this.request(endpoint, {
      method: 'DELETE',
      headers: { ...this.defaultHeaders, ...headers },
    });
  }

  async getCategories() {
    const response = await this.get('/api/v1/categories');
    return response.data?.categories || [];
  }

  async createGame(gameData) {
    const payload = {
      game: {
        category: gameData.category,
        question_count: gameData.questionCount,
        host_attributes: {
          name: gameData.name,
          email: gameData.email,
        },
      },
    };

    const response = await this.post('/api/v1/games', payload);
    return response.data;
  }

  async joinGame(joinData) {
    const payload = {
      access_code: joinData.accessCode,
      user_attributes: {
        name: joinData.name,
        email: joinData.email,
      },
    };

    const response = await this.post('/api/v1/games/join', payload);
    return response.data;
  }

  async getGameLeaderboard(gameId) {
    const response = await this.get(`/api/v1/games/${gameId}/leaderboard`);
    return response.data;
  }

  async startGame(gameId) {
    const response = await this.post(`/api/v1/games/${gameId}/start`);
    return response.data;
  }

  async getGameQuestions(gameId) {
    const response = await this.get(`/api/v1/games/${gameId}/questions`);
    return response.data;
  }

  async submitAnswer(gameId, answerData) {
    const response = await this.post(`/api/v1/games/${gameId}/answers`, answerData);
    return response.data;
  }

  async getGameResults(gameId) {
    const response = await this.get(`/api/v1/games/${gameId}/results`);
    return response.data;
  }
}

const apiService = new ApiService();
export default apiService;
