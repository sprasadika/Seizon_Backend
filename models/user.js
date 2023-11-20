class User {
    constructor(username, firstName, lastName, user_language, height,
        weight, age, gender, password, user_level, total_steps) {

            // Validation for username: Should be a non-empty string
            if (typeof username !== "string" || username.trim() === "") {
                throw new Error("Username must be a non-empty string.");
            }
            if (typeof firstName !== "string") {
                throw new Error("First Name is required and must be a string.");
            }
          
            if (typeof lastName !== "string") {
                throw new Error("Last Name is required and must be a string.");
            }
            // Validation for password: Should be a string with a minimum length
            if (typeof password !== "string" || password.length < 6) {
                throw new Error("Password must be a string with at least 6 characters.");
            }
            this.username = username;
            this.firstName = firstName;
            this.lastName = lastName;
            this.user_language = user_language;
            this.height = height;
            this.weight = weight;
            this.age = age;
            this.gender = gender;
            this.password = password;
            this.user_level = user_level;
            this.total_steps = total_steps;
    }
}

module.exports = User;