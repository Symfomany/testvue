const express = require("express");
const { BigQuery } = require("@google-cloud/bigquery");
const sql = require("./sql.js");
const cors = require("cors");

const port = 3000;

const app = express();

app.use(cors());

// Import the Google Cloud client library using default credentials
const bigquery = new BigQuery();
async function query() {
  const options = {
    query: sql,
    location: "US",
  };

  // Run the query as a job
  const [job] = await bigquery.createQueryJob(options);
  console.log(`Job ${job.id} started.`);

  // Wait for the query to finish
  const [rows] = await job.getQueryResults();

  // Print the results
  console.log("Rows length:", rows.length);

  return rows;
}

app.get("/api", async (req, res) => {
  try {
    const result = await query();
    return res.json(result);
  } catch (error) {
    console.log("error", error.message);
    res.json(error.message);
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
