class Goals {
    constructor(goal_id, user_id, goal_basis, steps_per_day, steps_per_week,
        days, calories_to_burn) {
            this.goal_id = goal_id;
            this.user_id = user_id;
            this.goal_basis = goal_basis;
            this.steps_per_day = steps_per_day;
            this.steps_per_week = steps_per_week;
            this.days = days;
            this.calories_to_burn = calories_to_burn;
    }
}

module.exports = Goals;