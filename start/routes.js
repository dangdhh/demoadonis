"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.on("/").render("login");
Route.post("/register", "UserController.register");
Route.post("/login", "UserController.login");
Route.post("/active", "UserController.active");
Route.group(() => {
  Route.get("posts", "PostController.index");
  Route.post("posts", "PostController.store");
  Route.delete("posts/:id", "PostController.destroy");
  Route.put("posts/:id", "PostController.update");
  Route.get("posts/:id", "PostController.show");

  Route.put("users/change-password", "UserController.changePassword");
  Route.put("users/updateProfile", "UserController.updateProfile");
  Route.get("users/showProfile", "UserController.showProfile");
})
  .prefix("api/v1")
  .middleware(["auth:jwt"]);
