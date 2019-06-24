CREATE TABLE user_likes(
	id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
	posts_id INTEGER
        REFERENCES user_posts(id) ON DELETE CASCADE NOT NULL,
    user_id INTEGER
        REFERENCES user_accounts(id) ON DELETE CASCADE NOT NULL  
);