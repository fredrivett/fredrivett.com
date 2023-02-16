/**
 * Wrapper to call the Toggl API
 *
 * @param path The sub-path to append to the base API URL
 * @param method The HTTP method to use
 *
 * @return The response from the API
 */
export const toggleApi = async (path: string, method: "GET") => {
  const credentials = `${process.env.TOGGL_EMAIL}:${process.env.TOGGL_PASSWORD}`;
  const encodedCredentials = Buffer.from(credentials).toString("base64");

  const baseUrl = "https://api.track.toggl.com/api/v9/";
  const url = new URL(path, baseUrl);

  url.searchParams.set("start_date", "2023-01-01");
  url.searchParams.set("end_date", new Date().toISOString());

  // add query string setup to fetch here
  return fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${encodedCredentials}`,
    },
  })
    .then((resp) => resp.json())
    .then((json) => {
      return json;
    })
    .catch((err) => console.error(err));
};
