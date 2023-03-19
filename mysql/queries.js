const queries = {
  createUser: () => {
    return `INSERT IGNORE users
                (user_name, email, password, phone_number, postcode, latitude, longitude, range_preference)
                    VALUES
                        (?, ?, ?, ?, ?, ?, ?, ?);
                          SHOW WARNINGS;`;
  },

  createItem: () => {
    return `INSERT listed_items
	            (user_id, item_name, quantity, extra_details, collection_location, collection_details, status, latitude, longitude)
    	            VALUES 
        	            (?, ?, ?, ?, ?, ?, ?, ?, ?);`;
  },

  addToBasket: () => {
    return ` REPLACE INTO in_basket 
              (user_id, item_id) 
                  VALUES (?, ?);`;
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
    return `SELECT users.id, user_name, email, phone_number, postcode, latitude, longitude, range_preference FROM users
		          JOIN login_tokens
        	        ON users.id = login_tokens.user_id
            	        WHERE token = ?;`;
  },

  getUserListing: () => {
    return `SELECT listed_items.id AS item_id, item_name, quantity, extra_details, collection_location, collection_details, date_added, status  
              FROM login_tokens
	              JOIN users ON login_tokens.user_id = users.id
        	         JOIN listed_items ON users.id = listed_items.user_id
            		      WHERE token = ? AND (status = "available" OR status = "collected")
							           ORDER BY listed_items.date_added  DESC;`;
  },

  getAllListedItems: () => {
    return `SELECT listed_items.id as item_id, listed_items.user_id as user_listed_item, item_name, quantity, extra_details, collection_location, collection_details, date_added as date_item_listed, status, in_basket.user_id as user_in_basket, date_added_to_basket, latitude, longitude 
            	FROM listed_items
                LEFT JOIN in_basket
                  ON listed_items.id = in_basket.item_id
			  		      	WHERE (status = 'available' OR (status = 'in_basket' AND date_added_to_basket < NOW() - INTERVAL 1 HOUR)) AND listed_items.user_id != ?;`;
  },

  getUserId: () => {
    return `SELECT user_id FROM login_tokens
	            WHERE token = ?;`;
  },

  getUserBasket: () => {
    return `SELECT date_added_to_basket,listed_items.id as item_id,item_name,quantity,extra_details,collection_location,collection_details,date_added as date_item_listed, latitude, longitude
              FROM in_basket JOIN listed_items 
                ON in_basket.item_id = listed_items.id 
                  WHERE in_basket.user_id = ? AND listed_items.status = 'in_basket' AND date_added_to_basket > NOW() - INTERVAL 1 HOUR 
                    ORDER BY date_added_to_basket ASC;`;
  },

  getItemUserDetails: () => {
    return `SELECT listed_items.id as item_id, item_name, users.id as listerId, users.user_name as listerUsername, users.email as listerEmail, users.phone_number as listerPhone, users.postcode as listerPostcode
	            FROM listed_items
		            JOIN users on listed_items.user_id = users.id
    				      WHERE listed_items.id = ?;`;
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
