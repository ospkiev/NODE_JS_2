const baseUrl = import.meta.env.DEV ?
  'http://localhost:3000' :
  window.location.origin;

/**
 * GET /api/brews – повертає [{ id, beans, method, ... }, …]
 */
export async function fetchBrews() {
  const url = new URL('/api/brews', baseUrl);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Fetch brews failed: ${res.status}`);
  return res.json();      // -> array
}

/**
 * POST /api/brews – створює нового користувача
 * @param {{ beans: string, method: string }} body
 * @return {Promise<{ id:number, beans:string, method:string }>}
 */
export async function createUser(body) {
  const url = new URL('/api/brews', baseUrl);
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    const { errors } = await res.json().catch(() => ({}));
    throw new Error(errors ? JSON.stringify(errors) : `Create failed: ${res.status}`);
  }
  return res.json();      // -> created brews
}