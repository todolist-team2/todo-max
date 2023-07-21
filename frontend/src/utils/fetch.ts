type Options = {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers: {
    "Content-Type": "application/json" | "application/x-www-form-urlencoded";
  };
  body?: string;
};

const serverUrl = "http://43.202.106.146:8080";

async function fetchData<T>(path: string, options: Options, callback: (data?: T) => void) {
  await fetch(serverUrl + path, options)
    .then((response) => {
      return response.json();
    })
    .then((data: T) => {
      callback(data);
    })
    .catch(() => {
      callback();
    });
}

export default fetchData;
