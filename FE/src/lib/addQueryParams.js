export const addQueryParams = (history, location, key, value) => {
  const searchParams = new URLSearchParams(location.search);

  if (location.search.includes(key)) searchParams.delete(key);

  const searchString = searchParams.toString();
  const newSearchParams = searchString === "" ? `?${key}=${value}` : `${searchString}&${key}=${value}`;

  history.push({
    pathname: "/IssueListPage",
    search: newSearchParams,
  });
};
