import { Router } from "express";
import userController from "../controllers/userController";
import { protect } from "../middleware/authMiddleware";

const router = Router();
const UserController = new userController();

router.post("/register", UserController.register.bind(UserController));
router.post("/otpVerify", UserController.otpVerify.bind(UserController));
router.get("/resendOtp", UserController.resendOtp.bind(UserController));
router.post("/login", UserController.login.bind(UserController));
router.post(
  "/addProduct",
  protect,
  UserController.addProduct.bind(UserController)
);
router.get(
  "/getProducts",
  protect,
  UserController.getProducts.bind(UserController)
);
router.post(
  "/addCustomer",
  protect,
  UserController.addCustomer.bind(UserController)
);
router.get(
  "/getCustomers",
  protect,
  UserController.getCustomers.bind(UserController)
);
router.post(
  "/sellProduct",
  protect,
  UserController.sellProduct.bind(UserController)
);
router.put(
  "/editProduct",
  protect,
  UserController.editProduct.bind(UserController)
);
router.get(
  "/getSalesReport",
  protect,
  UserController.getSalesReport.bind(UserController)
);
router.post("/sendMail", protect, UserController.sendMail.bind(UserController));
router.put(
  "/deleteProduct",
  protect,
  UserController.deleteProduct.bind(UserController)
);
router.post(
  "/forgotPassword",
  UserController.forgotPassword.bind(UserController)
);
router.post(
  "/passwordReset",
  UserController.passwordReset.bind(UserController)
);

export const userRoutes = router;
