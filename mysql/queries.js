const queries = {
  createUser: () => {
    return `INSERT IGNORE users
                (user_name, email, password, phone_number, postcode, range_preference)
                    VALUES
                        (?, ?, ?, ?, ?, ?);`;
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
    return `SELECT user_name, email, phone_number, postcode, range_preference FROM users
		          JOIN login_tokens
        	        ON users.id = login_tokens.user_id
            	        WHERE token = ?;`;
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

  updateUser: () => {
    return `UPDATE users JOIN login_tokens ON users.id = login_tokens.user_id  
                SET ?? = ?  
                    WHERE token = ?;`;
  },

  checkToken: () => {
    return `SELECT users.id FROM users
                    JOIN login_tokens on users.id = login_tokens.user_id 
                        WHERE token = ?;`;
  },
};

module.exports = queries;
