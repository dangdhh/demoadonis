'use strict'

const BaseExceptionHandler = use('BaseExceptionHandler')

/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler extends BaseExceptionHandler {
  /**
   * Handle exception thrown during the HTTP lifecycle
   *
   * @method handle
   *
   * @param  {Object} error
   * @param  {Object} options.request
   * @param  {Object} options.response
   *
   * @return {void}
   */
  async handle (error, { request, response,view }) {
    // response.status(error.status).send(error.message)
    if(error.status == 404){
      response.status(error.status).send(view.render('404'))
    }else if(error.status == 500){
      response.json({
        // code: error.status,
        // message: "The resource error"
        code: error.status,
            name: error.name,
            message: error.message
      })
      // response.status(error.status).send("Oops! this email exist!")
    }
    else{
      // response.status(error.status).send(error.message)
      response.json({
            code: error.status,
            name: error.name,
            message: error.message
          })
    }
    // else if(error.status == 500 && error.name == "ModelNotFoundException"){
    //   response.json({
    //     code: error.status,
    //     name: error.name,
    //     message: "The resource did not exist"
    //   })
    // }else if(error.status == 500){
    //   response.json({
    //     code: error.status,
    //     name: error.name,
    //     message: "Server Busy, Please Try Again!"
    //   })
    // }
  }

  /**
   * Report exception for logging or debugging.
   *
   * @method report
   *
   * @param  {Object} error
   * @param  {Object} options.request
   *
   * @return {void}
   */
  async report (error, { request }) {
  }
}

module.exports = ExceptionHandler
