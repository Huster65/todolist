const express = require('express')
const router = express.Router()
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const verifyToken = require('../middleware/auth')

router.get('/', verifyToken, async (req, res) => {
    try {
        // Trích xuất ID từ JWT
        const token = req.header('Authorization').split(' ')[1]; // Lấy token từ tiêu đề Authorization
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET); // Giải mã token
        const userId = decoded.userId; // Trích xuất ID người dùng từ token
    
        // Tìm người dùng dựa trên userId
        const user = await User.findOne({ _id: userId });
        const name = user.username
      if (user) {
        // Tìm thấy người dùng, gửi thông tin người dùng về client
        res.json({ name });
      } else {
        // Không tìm thấy người dùng
        res.status(404).json({ message: 'Người dùng không tồn tại' });
      }
    } catch (error) {
      // Xử lý lỗi nếu có lỗi trong quá trình giải mã JWT hoặc truy vấn cơ sở dữ liệu
      console.error('Lỗi:', error);
      res.status(500).json({ message: 'Đã xảy ra lỗi' });
    }
  });
module.exports = router