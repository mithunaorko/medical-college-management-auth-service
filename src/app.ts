import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
// import { generateFacultyId } from './app/modules/user/user.utils';
import routes from './app/routes';
const app: Application = express();

app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application Route
// app.use('/api/v1/users/', UserRoutes);
// app.use('/api/v1/academic-semesters', AcademicSemesterRoutes)
app.use('/api/v1/', routes);

// Global error handler
app.use(globalErrorHandler);

// Handle not found route
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found!',
      },
    ],
  });
  next();
});

// const academicSemester = {
//   year: '2023',
//   code: '03',
// };

// const testSId = async () => {
//   const tId = await generateFacultyId();
//   console.log(tId);
// };

// testSId();

export default app;
