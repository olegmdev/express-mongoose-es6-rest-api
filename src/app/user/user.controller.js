import User from './user.model'

export default {

  /**
   * Load user and append to req.
   */
  load(req, res, next, id) {
    User.get(id)
      .then((user) => {
        req.user = user; // eslint-disable-line no-param-reassign
        next();
      })
      .catch(e => next(e));
  },

  /**
   * Get user
   * @returns {User}
   */
  get(req, res) {
    res.json(req.user);
  },

  /**
   * Create new user
   * @property {string} req.body.username - The username of user.
   * @property {string} req.body.mobileNumber - The mobileNumber of user.
   * @returns {User}
   */
  create(req, res, next) {
    const user = new User({
      username: req.body.username,
      mobileNumber: req.body.mobileNumber
    });

    user.save()
      .then(savedUser => res.json(savedUser))
      .catch(e => next(e));
  },

  /**
   * Update existing user
   * @property {string} req.body.username - The username of user.
   * @property {string} req.body.mobileNumber - The mobileNumber of user.
   * @returns {User}
   */
  update(req, res, next) {
    const user = req.user;

    user.username = req.body.username;
    user.mobileNumber = req.body.mobileNumber;

    user.save()
      .then(savedUser => res.json(savedUser))
      .catch(e => next(e));
  },

  /**
   * Get user list.
   * @property {number} req.query.skip - Number of users to be skipped.
   * @property {number} req.query.limit - Limit number of users to be returned.
   * @returns {User[]}
   */
  list(req, res, next) {
    const { limit = 50, skip = 0 } = req.query;

    User.list({ limit, skip })
      .then(users => res.json(users))
      .catch(e => next(e));
  },

  /**
   * Delete user.
   * @returns {User}
   */
  remove(req, res, next) {
    const user = req.user;

    user.remove()
      .then(deletedUser => res.json(deletedUser))
      .catch(e => next(e));
  }
}
