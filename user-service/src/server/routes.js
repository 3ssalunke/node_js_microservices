import { addHours } from "date-fns";

import { User, UserSession } from "#root/db/models";
import generateUUID from "#root/helpers/generateUUID";
import hashPassword from "#root/helpers/hashPassword";
import passwordCompareSync from "#root/helpers/passwordCompareSync";

const USER_SESSION_EXPIRY_HOURS = 1;

const setupRoutes = (app) => {
  app.post("/session", async (req, res, next) => {
    if (!req.body.email || !req.body.password) {
      return next(new Error("Invalid body"));
    }

    try {
      const user = await User.findOne({
        attributes: {},
        where: {
          email: req.body.email,
        },
      });

      if (!user) return next(new Error("Invalid Email"));

      if (!passwordCompareSync(req.body.password, user.passwordHash)) {
        return next(new Error("Invalid Password!"));
      }

      const expiresAt = addHours(new Date(), USER_SESSION_EXPIRY_HOURS);

      const sessionToken = generateUUID();

      const session = await UserSession.create({
        expiresAt,
        id: sessionToken,
        userId: user.id,
      });

      return res.json(session);
    } catch (error) {}
  });

  app.delete("/session/:sessionId", async (req, res, next) => {
    try {
      const session = await UserSession.findByPk(req.params.sessionId);

      if (!session) return next(new Error("Invalid session ID"));

      await session.destroy();
      return res.end();
    } catch (error) {
      return next(error);
    }
  });

  app.get("/session/:sessionId", async (req, res, next) => {
    try {
      const session = await UserSession.findByPk(req.params.sessionId);

      if (!session) return next(new Error("Invalid session ID"));

      return res.json(session);
    } catch (error) {
      return next(error);
    }
  });

  app.post("/users", async (req, res, next) => {
    if (!req.body.email || !req.body.password) {
      return next(new Error("Invalid body"));
    }
    try {
      const newUser = await User.create({
        email: req.body.email,
        id: generateUUID(),
        passwordHash: hashPassword(req.body.password),
      });
      return res.json(newUser);
    } catch (error) {
      return next(error);
    }
  });

  app.get("/users/:userId", async (req, res, next) => {
    try {
      const user = await User.findByPk(req.params.userId);

      if (!user) return next(new Error("Invalid User Id"));

      return res.json(user);
    } catch (error) {
      return next(error);
    }
  });
};
export default setupRoutes;
