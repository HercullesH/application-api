# Runing the application using Docker

**Attention:** Make sure you don't already have a PostgreSQL server running on port 5432. If you do, update the `docker-compose.yml` file or stop your PostgreSQL server.

Run the following command to run the application using Docker:

```bash
docker-compose up --build


The API will be running on the port `http://localhost:3001/api`.

All API documentation is available on Swagger through this link: [http://localhost:3001/api].

Check the schemas on swagger to understand how to use the API.


To run without Docker:

1. Run:
2. Create a database with name: `application` and update the `.env` file with your postgres server.

3. Run: npm install
4. Run: npx prisma migrate dev
5. Run: npm run start:dev
