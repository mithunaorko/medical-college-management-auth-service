/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
import { ErrorRequestHandler } from 'express'
import { IGenericErrorMessage } from '../../interfaces/error'
import handleValidationError from '../../errors/handleValidationError'
import config from '../../config'
import ApiError from '../../errors/ApiError'
import { errorLogger } from '../../shared/logger'

const globalErrorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  next
) => {
 // when our application on development mood show error using console.log(error) and when app is running on production mood that case error store inside error log file 
  config.env === 'development' ?
  console.log('👽 globalErrorHandler ~ ', error)
  : errorLogger.error('👽 globalErrorHandler ~ ',error)

  let statusCode = 500;
  let message = 'Something went Wrong !';
  let errorMessage: IGenericErrorMessage[] = [];

  // simplified error
  if(error?.name === 'ValidationError'){
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessage = simplifiedError.errorMessage;
  }
  else if(error instanceof ApiError){
    statusCode= error?.statusCode;
    message = error?.message;
    errorMessage = error?.message?
    [
      {
        path: '',
        message: error?.message
      }
    ]: []
  }
  else if(error instanceof Error){
    message= error?.message
    errorMessage = error?.message?
    [
      {
        path: '',
        message: error?.message
      }
    ]: []
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    stack: config.env !== 'production' ? error.stack : undefined,
  })

  next()
}

export default globalErrorHandler;
