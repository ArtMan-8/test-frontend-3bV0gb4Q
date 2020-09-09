import React from "react";
import { useQuery as getQuery } from "@apollo/client";
import { TOP_REPOS, GET_REPOS } from "./main.graphql";
import Search from "../search/search";
import Repos from "../repos/repos";
import Paginator from "../paginator/paginator";
import SearchContext from "../context";
import styles from "./main.css";

import getReposByPages from "../../utils/get-repo-by-pages";

export default function Main() {
  const lastRequest = sessionStorage.getItem("lastRequest");
  const lastPage = sessionStorage.getItem("lastPage");

  const [requestRepo, setRequestRepo] = React.useState(lastRequest);
  const [currentPage, setPage] = React.useState(+lastPage || 1);

  const setRequest = (currentRequest) => {
    sessionStorage.setItem("lastRequest", currentRequest);
    setRequestRepo(currentRequest);
  };

  const setPageRepo = (page) => {
    sessionStorage.setItem("lastPage", page);
    setPage(page);
  };

  const { loading, error, data } = lastRequest
    ? getQuery(GET_REPOS, {
        variables: {
          getQuery: `${requestRepo} sort:stars`,
        },
      })
    : getQuery(TOP_REPOS);

  if (error) {
    const str = `${error}`;
    return <h2 className={styles.h2_error}>{str}</h2>;
  }

  const pages =
    data && getReposByPages(data.search.repositoryCount, data.search.nodes);

  return (
    <SearchContext.Provider value={[requestRepo, setRequest]}>
      <Search />
      {loading ? (
        <h3 className={styles.h3}>Loading...</h3>
      ) : (
        <>
          <Repos repos={pages.repos[currentPage - 1]} />
          <Paginator
            pages={pages.count}
            currentPage={currentPage}
            setPage={setPageRepo}
          />
        </>
      )}
    </SearchContext.Provider>
  );
}
