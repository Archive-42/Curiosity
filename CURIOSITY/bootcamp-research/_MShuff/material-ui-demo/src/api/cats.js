export async function getCats() {
  const res = await fetch('https://api.thecatapi.com/v1/images/search?limit=20')
  return await res.json();
}

