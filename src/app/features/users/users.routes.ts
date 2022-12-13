// import { Router } from "express";
// import { UserController } from "./controllers/user.controller";
// import { UserValidator } from "./validators/user.validator";

// export default () => {
//     const router = Router();
//     const userController = new UserController();

//     router.post(
//         '/',
//         new UserValidator().validateBody,
//         new UserController().create
//     );
//     router.get(
//         '/',
//         new UserController().getAll
//     );
//     router.delete(
//         '/:userId',
//         new UserValidator().validateId,
//         new UserController().remove
//     );

//     return router;
// }