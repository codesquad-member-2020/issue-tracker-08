export const addQueryParams = (history, location, params) => {
  const searchParams = new URLSearchParams(location.search);

  Object.keys(params).forEach((key) => {
    if (searchParams.has(key)) searchParams.delete(key);
  });

  const searchString = searchParams.toString();
  const esc = encodeURIComponent;
  const query =
    typeof params === "object"
      ? Object.keys(params)
          .map((k) => `${esc(k)}=${esc(params[k])}`)
          .join("&")
      : esc(params);
  const queryParams = searchString.includes("=") ? [searchString, query].join("&") : `?${query}`;

  history.push({
    pathname: "/IssueListPage",
    search: queryParams,
  });
};

export const startQueryParams = (history, location, params) => {
  const searchParams = new URLSearchParams(location.search);

  const esc = encodeURIComponent;
  const query =
    typeof params === "object"
      ? Object.keys(params)
          .map((k) => `${esc(k)}=${esc(params[k])}`)
          .join("&")
      : esc(params);

  history.push({
    pathname: "/IssueListPage",
    search: query,
  });
};
