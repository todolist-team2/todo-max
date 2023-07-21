type Options = {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers: {
    "Content-Type": "application/json" | "application/x-www-form-urlencoded";
  };
  body?: string;
}

const serverUrl = "http://43.202.106.146:8080";

async function fetchData<T>(path: string, options: Options, callback:(data: T) => void) {
  const response = await fetch(serverUrl + path, options);
  const data:T = await response.json();
  callback(data);
}

export default fetchData;