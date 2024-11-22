import { matchPath } from "react-router-dom";
import { booksMocks } from "../mocks/booksMocks";

const REQUEST_TIMEOUT = 3000;

const mockRequest = (data) => {
  return new Promise((resolve) =>
    setTimeout(() => resolve(data), REQUEST_TIMEOUT * Math.random())
  );
};

const mockData = [
  [
    "/books",
    ({ search }) =>
      search
        ? booksMocks.filter((item) =>
            item.title.toLowerCase().includes(search.toLowerCase())
          )
        : booksMocks,
  ],
  ["/books/:id", ({ id }) => booksMocks[id]],
];

export const mockFetch = async (requestUrl, options) => {
  console.log("Fetching", requestUrl, options);
  const [matchedUrl, getMocks] =
    mockData.find(([url]) => Boolean(matchPath(url, requestUrl))) || [];

  if (!getMocks) {
    return { error: { status: 404, message: "Requested data not found" } };
  }

  const { params } = matchPath(matchedUrl, requestUrl);

  const response = await mockRequest(getMocks({ ...params, ...options }));

  console.log("Response for:", requestUrl, options, response);

  return response;
};

window.mockFetch = mockFetch;
