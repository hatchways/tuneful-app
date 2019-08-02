const LikesService = {

insertLike(knex, newLike) {
    return knex
    .insert(newLike)
    .into('user_likes')
    .returning('*')
    .then(rows => {
    return rows[0]
    })
},

getById(knex, likes_id) {
    return knex
      .from('user_likes')
      .select('*')
      .where('user_id', user_id)
      .first()
  },

updateLike(knex,id) {
    return knex('user_posts')
    .where({id})
    .increment('likes_count',1)
},


deleteLike(knex,user_id){
    return knex('user_likes')
        .where({ user_id })
        .delete()
    },

removeLike(knex, id) {
    return knex('user_posts')
      .where({ id })
      .decrement('likes_count',1)
  },
}

module.exports = LikesService