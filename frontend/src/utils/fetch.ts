type Options = {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers: {
    "Content-Type": "application/json" | "application/x-www-form-urlencoded";
  };
  body?: string;
}

async function fetchData<T>(url: string, options: Options, callback:(data: T) => void) {
  const response = await fetch(url, options);
  const data:T = await response.json();
  callback(data);
}

export default fetchData;