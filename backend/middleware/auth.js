const jwt = require("jsonwebtoken");
/**
 *
 *
 * một middleware trong ứng dụng sử dụng Express.js và JSON Web Tokens (JWT) để xác thực và phân quyền người dùng.
 */

/**
 * Middleware "auth":

Đầu tiên, middleware "auth" kiểm tra xem yêu cầu từ người dùng có chứa mã thông báo xác thực (JWT) trong header "x-auth-token" hay không.
Nếu không tồn tại mã thông báo, nó sẽ trả về mã lỗi HTTP 401 "Unauthorized" (truy cập bị từ chối) và thông báo "Yêu cầu của người dùng không được xác thực".
Nếu tồn tại mã thông báo, nó sẽ thực hiện xác thực mã thông báo bằng cách giải mã nó bằng JWT sử dụng secret key đã cấu hình. Nếu việc giải mã thành công, 
middleware sẽ gán thông tin người dùng từ mã thông báo vào thuộc tính "user" của đối tượng "req" và tiếp tục 
chuyển quyền điều khiển cho middleware tiếp theo bằng cách gọi hàm "next()".
Nếu việc giải mã không thành công, nó sẽ trả về mã lỗi HTTP 400 "Bad Request" (yêu cầu không hợp lệ) và thông báo
 "Yêu cầu của người dùng bao gồm một mã thông báo xác thực (auth token) không hợp lệ".
 
 * 
 */
const auth = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res
      .status(401)
      .send(
        "  truy cập bị từ chối!,Yêu cầu của người dùng không được xác thực (401 trong middleware)"
      );
  }
  try {
    const secretKey = process.env.JWT_KEY;
    const user = jwt.verify(token, secretKey);
    req.user = user;
    next();
  } catch (error) {
    console.log("error rồi ", error);
    res
      .status(400)
      .send(
        " truy cập bị từ chối , yêu cầu của người dùng bao gồm một mã thông báo xác thực (auth token) không hợp lệ.",
        error
      );
  }
};

/**
 * 
 
Middleware "isAdmin" sử dụng middleware "auth" đã được định nghĩa trước đó để xác thực người dùng.
Sau khi xác thực thành công, nó kiểm tra xem người dùng có thuộc nhóm quản trị viên (isAdmin) hay không.

Nếu người dùng là quản trị viên (isAdmin = true), nó sẽ chuyển quyền điều khiển cho middleware tiếp theo bằng cách gọi hàm "next()".

Nếu người dùng không phải là quản trị viên (isAdmin = false), nó sẽ trả về mã lỗi HTTP 403 "Forbidden" (truy cập bị từ chối) 
và thông báo "Không có quyền truy cập vào tài nguyên".



 */

const isAdmin = (req, res, next) => {
  auth(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res
        .status(403)
        .send(" truy cập bị từ chối .không có quyền truy cập vào tài nguyên");
    }
  });
};

const isUser = (req, res, next) => {
  auth(req, res, () => {
    if (req.user._id == req.params.id || req.user.isAdmin) {
      next();
    } else {
      res
        .status(403)
        .send(" truy cập bị từ chối .không có quyền truy cập vào tài nguyên");
    }
  });
};
module.exports = { isAdmin, auth, isUser };

/***
 * Nếu trong đoạn code trên không có next được gọi, thì sau khi kiểm tra và xác thực người dùng,
 *  nó sẽ không tiếp tục thực thi các middleware hoặc xử lý tiếp theo mà được định nghĩa sau nó trong chuỗi middleware.
 *  Điều này có thể làm cho quá trình xử lý dừng lại và không đi đến các xử lý tiếp theo, gây ra trường hợp bị đứng đầu trang
 *  hoặc lỗi trong việc xử lý yêu cầu.
 */
