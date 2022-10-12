export default async function handlePost(inputs, steps, diets) {
  const data = {
    ...inputs,
    steps,
    diets,
  };
  try {
    let response = await fetch("http://localhost:3001/recipes/create", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let resp = await response.json();
    return resp;
  } catch (err) {
    return err;
  }
}
