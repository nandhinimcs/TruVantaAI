/**
 * API client service for TruVanta AI
 * Handles communication with the FastAPI backend
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';
const DIRECT_BACKEND_URL = 'http://127.0.0.1:8000';

export async function checkHealth() {
  const startTime = performance.now();
  
  const urlsToTry = [
    `${API_BASE_URL}/health`,
    `${DIRECT_BACKEND_URL}/health`
  ];

  let lastError = null;

  for (const url of urlsToTry) {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      const latency = Math.round(performance.now() - startTime);

      return {
        success: true,
        data,
        latency,
        endpoint: url,
      };
    } catch (err) {
      lastError = err;
    }
  }

  return {
    success: false,
    error: lastError ? lastError.message : 'Failed to connect to backend',
    latency: Math.round(performance.now() - startTime),
  };
}

export async function getBrandInfo() {
  const urlsToTry = [
    `${API_BASE_URL}/brand`,
    `${DIRECT_BACKEND_URL}/brand`
  ];

  let lastError = null;

  for (const url of urlsToTry) {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return { success: true, data };
    } catch (err) {
      lastError = err;
    }
  }

  return {
    success: false,
    error: lastError ? lastError.message : 'Failed to fetch brand data',
  };
}

export async function generateContent({ brand, product, contentType, audience, tone }) {
  const urlsToTry = [
    `${API_BASE_URL}/generate`,
    `${DIRECT_BACKEND_URL}/generate`
  ];

  const payload = {
    brand: brand || 'Lumina Skincare',
    product,
    content_type: contentType,
    audience,
    tone,
  };

  let lastError = null;

  for (const url of urlsToTry) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json().catch(() => null);

      if (!response.ok) {
        const errorDetail = responseData?.detail || `HTTP ${response.status}: ${response.statusText}`;
        throw new Error(errorDetail);
      }

      return {
        success: true,
        data: responseData,
      };
    } catch (err) {
      lastError = err;
      // If server responded with application error (4xx/5xx with message), don't retry blindly
      if (err.message && !err.message.includes('Failed to fetch') && !err.message.includes('NetworkError')) {
        break;
      }
    }
  }

  return {
    success: false,
    error: lastError ? lastError.message : 'Failed to generate content',
  };
}
