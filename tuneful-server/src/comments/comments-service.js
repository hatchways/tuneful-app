const CommentsService = {
    getAllComments(knex) {
      return knex.select('*').from('user_comments')
    },
  
    insertComment(knex, newComment) {
      return knex
        .insert(newComment)
        .into('user_comments')
        .returning('*')
        .then(rows => {
          return rows[0]
        })
    },
  
    getById(knex, id) {
      return knex
        .from('user_comments')
        .select('*')
        .where('id', id)
        .first()
    },

    getByPosts(knex, posts_id){
      return knex.from('user_comments').select('*').where('posts_id', posts_id)
    },
  
    deleteComment(knex, id) {
      return knex('user_comments')
        .where({ id })
        .delete()
    },
  
    updateComment(knex, id, newCommentFields) {
      return knex('user_comments')
        .where({ id })
        .update(newCommentFields)
    },
  }
  
  module.exports = CommentsService