import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./repos.css";

export default function Repos({ repos }) {
  const getStrDate = (timestamp) => {
    const date = new Date(timestamp);
    const strDate = `${date.getDate()} / ${
      date.getMonth() + 1
    } / ${date.getFullYear()}`;
    return strDate;
  };

  return (
    <>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th>Repository</th>
            <th>Stars</th>
            <th>Last Commit</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {repos &&
            repos.map((repo) => (
              <tr key={repo.url}>
                <td>
                  <Link to={`/${repo.id}`}>{repo.name}</Link>
                </td>
                <td>{repo.stargazers.totalCount}</td>
                <td>
                  {getStrDate(repo.defaultBranchRef.target.committedDate)}
                </td>
                <td>
                  <a href={repo.url} target="_blank" rel="noreferrer">
                    to Github
                  </a>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}

Repos.propTypes = {
  repos: PropTypes.arrayOf(PropTypes.shape).isRequired,
};
