export const addQueryParams = (history, location, key, value) => {
  const searchParams = new URLSearchParams(location.search);

  if (location.search.includes(key)) {
    searchParams.delete(key);
  }

  history.push({
    pathname: "/IssueListPage",
    search: `${searchParams.toString()}&${key}=${value}`,
  });
};
