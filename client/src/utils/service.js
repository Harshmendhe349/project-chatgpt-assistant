const baseUrl = "http://localhost:5000/api";

const getRequest = async (url) => {
  const response = await fetch(url);

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`GET request failed: ${response.status} - ${errorMessage}`);
  }

  return response.json();
};

const postRequest = async (url, body) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`POST request failed: ${response.status} - ${errorMessage}`);
  }

  return response.json();
};

export { baseUrl, getRequest, postRequest };
