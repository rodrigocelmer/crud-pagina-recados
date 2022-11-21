import "dotenv/config";
import { DataSourceOptions } from "typeorm";

const config: DataSourceOptions = {
    type: "postgres",
    url: process.env.DATABASE_URL,
    synchronize: false,
    logging: false,
    schema: "recados",
    ssl: {
        rejectUnauthorized: false,
    },
    entities: ['src/database/entities/*.ts']
};
export default config;