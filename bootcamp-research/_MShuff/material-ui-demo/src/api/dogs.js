export async function getDogs() {
  const res = await fetch("https://dog.ceo/api/breed/hound/images/random/10");
  const { message: dogs } = await res.json();
  return dogs;
}
