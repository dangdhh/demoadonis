'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class ModelNotFoundException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  handle (error, { response }) {
    return response.status(403).json({
      error: "The resource did not exist",
    });
  }
}

module.exports = ModelNotFoundException
