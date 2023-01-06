const queries = {
  createUser: () => {
    return `INSERT IGNORE users
                (user_name, email, password, phone_number, postcode, range_preference)
                    VALUES
                        (?, ?, ?, ?, ?, ?);
            SHOW WARNINGS;`;
  },

  createItem: () => {
    return `INSERT listed_items
	            (user_id, item_name, quantity, extra_details, collection_location, collection_details, status)
    	            VALUES 
        	            (?, ?, ?, ?, ?, ?, ?);`;
  },

  checkCreds: () => {
    return `SELECT id FROM users
                WHERE user_name LIKE ? 
                     AND password LIKE ?;`;
  },

  addToken: () => {
    return `INSERT login_tokens
                    (user_id, token)
                        VALUES
                            (?, ?);`;
  },

  removeToken: () => {
    return `DELETE from login_tokens
                WHERE token = ?;`;
  },

  getUser: () => {
    return `SELECT users.id, user_name, email, phone_number, postcode, range_preference FROM users
		          JOIN login_tokens
        	        ON users.id = login_tokens.user_id
            	        WHERE token = ?;`;
  },

  getUserListing: () => {
    return `SELECT listed_items.id AS item_id, item_name, quantity, extra_details, collection_location, collection_details, date_added, status  
              FROM login_tokens
	              JOIN users ON login_tokens.user_id = users.id
        	         JOIN listed_items ON users.id = listed_items.user_id
            		      WHERE token = ?
							           ORDER BY listed_items.date_added  ASC`;
  },

  getUserId: () => {
    return `SELECT user_id FROM login_tokens
	            WHERE token = ?;`;
  },

  deleteUser: () => {
    return `DELETE users FROM users
	            JOIN login_tokens ON users.id = login_tokens.user_id
    	            WHERE token = ?;`;
  },

  deleteUserTokens: () => {
    return `DELETE tokens FROM users
	            JOIN login_tokens ON users.id = login_tokens.user_id
    	            WHERE token = ?;`;
  },

  deleteItem: () => {
    return `DELETE FROM listed_items
	            WHERE listed_items.id = ?;`;
  },

  updateUser: () => {
    return `UPDATE users JOIN login_tokens ON users.id = login_tokens.user_id  
                SET ?? = ?  
                    WHERE token = ?;`;
  },

  updateItem: () => {
    return `UPDATE listed_items 
              SET ?? = ?
                WHERE listed_items.id = ?;`;
  },

  checkToken: () => {
    return `SELECT users.id FROM users
                    JOIN login_tokens on users.id = login_tokens.user_id 
                        WHERE token = ?;`;
  },
};

module.exports = queries;
