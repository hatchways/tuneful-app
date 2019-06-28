const PostsService = {
  getAllPosts(knex) {
    return knex.select('*').from('user_posts')
  },
  insertPost(knex, newPost) {
    return knex
      .insert(newPost)
      .into('user_posts')
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },
  getById(knex, id) {
    return knex.from('user_posts').select('*').where('id', id).first()
  },
  getByAuthor(knex, author_id){
    return knex.from('user_posts').select('*').where('author', author_id)
  },
  deletePost(knex, id) {
    return knex('user_posts')
      .where({ id })
      .delete()
  },
  updatePost(knex, id, newPostFields) {
    return knex('user_posts')
      .where({ id })
      .update(newPostFields)
  },
}

module.exports = PostsService