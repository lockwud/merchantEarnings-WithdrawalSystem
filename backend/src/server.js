const express = require("express")
const dotenv = require("dotenv")
const morgan = require("morgan")
const cors = require("cors")
const {ErrorHandler} = require("./middlewares/errorHandler");
dotenv.config()
const app = express();
const port = process.env.PORT || 3000
const mainRouter = require("./routes/index.routes")


app.use(express.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(morgan('dev'))


app.use("/api", mainRouter)

app.use(ErrorHandler);

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
  