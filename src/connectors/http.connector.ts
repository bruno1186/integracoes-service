import axios, { AxiosInstance } from 'axios';

/**
 * Conector generico para APIs externas via HTTP, com retry simples.
 */
export class HttpConnector {
  private client: AxiosInstance;

  constructor(baseURL: string) {
    this.client = axios.create({ baseURL, timeout: 10_000 });
  }

  async post<T = unknown>(path: string, body: unknown, retries = 3): Promise<T> {
    let lastError: unknown;
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const { data } = await this.client.post<T>(path, body);
        return data;
      } catch (err) {
        lastError = err;
        await new Promise((r) => setTimeout(r, attempt * 500));
      }
    }
    throw lastError;
  }
}
