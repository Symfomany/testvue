const sql = `SELECT licenses.license AS license, count(*) AS total
                FROM bigquery-public-data.github_repos.sample_repos AS repo
                INNER JOIN bigquery-public-data.github_repos.licenses AS licenses ON repo.repo_name = licenses.repo_name
                GROUP BY license
                ORDER BY total DESC
                LIMIT 5`;

module.exports = sql;
