
const InvalidAccessException = use("App/Exceptions/InvalidAccessException");
const ModelNotFoundException = use("App/Exceptions/ModelNotFoundException");

class AuthorizationService{
  veryfiPermission(resource, user){
    if(!resource){
      throw new ModelNotFoundException;
    }
    if(resource.user_id !== user.id){
      console.log("invalid access");
      throw new InvalidAccessException;
    }
  }
}
module.exports = new AuthorizationService();
