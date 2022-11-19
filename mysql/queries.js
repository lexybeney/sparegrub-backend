const queries = {
  createUser: (
    user_name,
    email,
    password,
    phone_number,
    postcode,
    range_preference
  ) => {
    return `INSERT IGNORE users
                (user_name, email, password, phone_number, postcode, range_preference)
                    VALUES
                        ("${user_name}", "${email}", "${password}", "${phone_number}", "${postcode}", "${range_preference}");`;
  },

  checkCreds: (user_name, password) => {
    return `SELECT id FROM users
                    WHERE user_name = "${user_name}" AND password = "${password}";`;
  },

  addToken: (user_id, token) => {
    return `INSERT login_tokens
                    (user_id, token)
                        VALUES
                            ("${user_id}", "${token}");`;
  },

  removeToken: (token) => {
    return `DELETE from login_tokens
                WHERE token = "${token}";`;
  },

  getUser: (token) => {
    return `SELECT user_name, email, phone_number, postcode, range_preference FROM users
		        JOIN login_tokens
        	        ON users.id = login_tokens.user_id
            	        WHERE token = "${token}";`;
  },
};

module.exports = queries;
