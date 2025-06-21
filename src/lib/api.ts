// Defines how we interact with the backend API for sentiment and bias analysis

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000"; // Default to localhost for development

// Type Definitions for API responses - Matches the API schema

export interface SentimentScores {
  neg: number;
  neu: number;
  pos: number;
  compound: number;
  error?: string;
}

export interface SentimentResponse {
  sentiment: SentimentScores;
  error?: string;
}

export interface SimpleSentimentResponse {
  sentiment: boolean | null;
  error?: string;
}

export interface BiasScores {
  left: number;
  neutral: number;
  right: number;
  compound: number;
  confidence: number;
  prediction: number;
  error?: string;
}

export interface BiasResponse {
  bias: BiasScores;
  error?: string;
}

// API Client Class - Handles API requests, error handling, and response parsing. Simplifies the HTTP request process by having a single class with methods for each API endpoint.
class ApiClient {
  private baseUrl: string;

  // Constructor to initialize the API client with a base URL
  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  // Generic method to make API requests
  private async makeRequest<T>( // <T> is a generic type parameter that allows the method to return any type of response
    endpoint: string,
    options: RequestInit = {} // Alter this if you want additional request headers or options.
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`; // Construct the full URL using the base URL and endpoint
    
    // Set up the request configuration, including headers and any additional options
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json', // Set the content type to JSON
        ...options.headers, // Spread operator to include any additional headers passed in options
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) { // Check if the response status is OK (status code 200-299)
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json(); // Parse the response as JSON
    } catch (error) { // Catch any errors that occur during the fetch operation
      console.error('API request failed:', error);
      throw error;
    }
  }

  async analyzeSentiment(text: string): Promise<SimpleSentimentResponse> {
    const endpoint = '/analyze_sentiment'; // Define the API endpoint for sentiment analysis
    const options: RequestInit = {
      method: 'POST', // Set the HTTP method to POST
      body: JSON.stringify({ text }), // Convert the text to a JSON string for the request body
    };
    
    return this.makeRequest<SimpleSentimentResponse>(endpoint, options); // Call the makeRequest method with the endpoint and options
  }

  async analyzeBias(text: string): Promise<BiasResponse> {
    const endpoint = '/analyze_bias';
    const options: RequestInit = {
        method: 'POST',
        body: JSON.stringify({ text }),
    };
    return this.makeRequest<BiasResponse>(endpoint, options); // Call the makeRequest method with the endpoint and options
    }
    async healthCheck(): Promise<{ status: string, message: string }> {
        const endpoint = '/health';
        try {
        return this.makeRequest<{ status: string, message: string }>(endpoint); // Call the makeRequest method with the endpoint
        }
        catch {
            return {status: "", message:"Cannpt connect to Nuance-API"};
        }

    }
}

export const apiClient = new ApiClient(); // Create an instance of the ApiClient to be used throughout the application