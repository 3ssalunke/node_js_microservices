import UserService from "#root/adapters/UserService";

const injectUserSession = async (req, res, next) => {
  if (req.cookies.userSessionId) {
    const userSession = UserService.fetchUserSession({
      sessionId: req.cookies.userSessionId,
    });
    res.locals.userSession = userSession;
  }

  return next();
};

export default injectUserSession;
