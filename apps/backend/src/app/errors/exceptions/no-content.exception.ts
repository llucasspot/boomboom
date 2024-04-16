import { HttpException, HttpStatus } from '@nestjs/common';
import { HttpExceptionBodyMessage } from '@nestjs/common/interfaces/http/http-exception-body.interface';

/**
 * Defines an HTTP exception for *No Content* type errors.
 */
export class NoContentException extends HttpException {
  /**
   * Instantiate a `NoContentException` Exception.
   *
   * @example
   * `throw new NoContentException()`
   *
   * @usageNotes
   * The HTTP response status code will be .
   * - The `objectOrError` argument defines the JSON response body or the message string.
   * - The `descriptionOrOptions` argument contains either a short description of the HTTP error or an options object used to provide an underlying error cause.
   *
   * By default, the JSON response body contains two properties:
   * - `statusCode`: this will be the value 204.
   * - `message`: the string `'No Content'` by default; override this by supplying
   * a string in the `objectOrError` parameter.
   *
   * If the parameter `objectOrError` is a string, the response body will contain an
   * additional property, `error`, with a short description of the HTTP error. To override the
   * entire JSON response body, pass an object instead. Nest will serialize the object
   * and return it as the JSON response body.
   *
   * @param objectOrError string or object describing the error condition.
   * @param descriptionOrOptions either a short description of the HTTP error or an options object used to provide an underlying error cause
   */
  constructor(
    objectOrError?: HttpExceptionBodyMessage,
    descriptionOrOptions = 'No Content',
  ) {
    const { description, httpExceptionOptions } =
      HttpException.extractDescriptionAndOptionsFrom(descriptionOrOptions);
    super(
      HttpException.createBody(
        objectOrError,
        description,
        HttpStatus.NO_CONTENT,
      ),
      HttpStatus.NO_CONTENT,
      httpExceptionOptions,
    );
  }
}
