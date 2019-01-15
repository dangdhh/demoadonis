"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
const Post = use("App/Models/Post");
const ace = require('@adonisjs/ace')
const AuthorizationService = use("App/Services/AuthorizationService");
/**
 * Resourceful controller for interacting with posts
 */
class PostController {
  /**
   * Show a list of all posts.
   * GET posts
   *
   */
  async index({ auth, request }) {
    try {
      const user = await auth.getUser();
      const page = request.input("page") || 1;
      const limit = request.input("limit") || 2;
      console.log(user);
      return await user.posts().paginate(page, limit);
    } catch (error) {
      return error.message;
    }
  }

  /**
   * Render a form to be used for creating a new post.
   * GET posts/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async create({ request, response }) {}

  /**
   * Create/save a new post.
   * POST posts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, auth }) {
    try {
      const user = await auth.getUser();
      const { title, description, content, published } = request.all();
      const post = new Post();
      post.fill({
        title,
        description,
        content,
        published
      });
      await user.posts().save(post);
      return post;
    } catch (error) {
      return error.message;
    }
  }

  /**
   * Display a single post.
   * GET posts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, auth }) {
    const user = await auth.getUser();
    const { id } = params;
    const post = await Post.find(id);
    AuthorizationService.veryfiPermission(post, user);

    return post;
  }

  /**
   * Render a form to update an existing post.
   * GET posts/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {}

  /**
   * Update post details.
   * PUT or PATCH posts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, auth }) {
    const user = await auth.getUser();
    const { id } = params;
    const post = await Post.find(id);
    AuthorizationService.veryfiPermission(post, user);
    post.merge(request.only(["title", "description", "content", "published"]));
    post.save();
    return post;
  }

  /**
   * Delete a post with id.
   * DELETE posts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, response, auth }) {
    const user = await auth.getUser();
    const { id } = params;
    const post = await Post.findOrFail(id);
    AuthorizationService.veryfiPermission(post, user);
    await post.delete();
    return response.json({
      status: "success",
      message: "Deleted Successfully!"
    });
  }

  async refreshMigration(){
    await  ace.call("migration:refresh");
    // await ace.call('migration:run')
  }
}

module.exports = PostController;
