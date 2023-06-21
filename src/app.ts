import express, { Application } from 'express'
import cors from 'cors'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import routes from './app/routes'
const app: Application = express()

app.use(cors())

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application Route
// app.use('/api/v1/users/', UserRoutes);
// app.use('/api/v1/academic-semesters', AcademicSemesterRoutes)
app.use('/api/v1/', routes);

// Global error handler
app.use(globalErrorHandler);



export default app
