import Pool from "pg-pool";

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "todoapp",
  port: 5432,
});

export default pool;
