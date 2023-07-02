var express = require('express');
var router = express.Router();
const TypeBook = require('../model/kindofbook.model');

router.get('/books', async (req, res) => {

    try {
        let listBooks = await TypeBook.find();

        if (listBooks) {
            return res.status(200).json({ dataBook: listBooks, msg: 'Lấy dữ liệu thành công' });
        } else {
            return res.status(204).json({ msg: 'Không có dữ liệu' });
        }
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
})

router.post('/books', async (req, res) => {
    try {

        const { bookName } = req.body;

        const newBook = new TypeBook({ bookName });

        const result = await newBook.save();
        return res.status(201).json({ mess: "Thêm thành công", data: result })

    } catch (error) {

        return res.status(500).json({ msg: error.message })
    }
});

router.put('/books/:id', async (req, res) => {


    try {
        const { id } = req.params;
        const { bookName } = req.body;

        const result = await TypeBook.findByIdAndUpdate({ _id: id }, { bookName }, { new: true });
        if (!result) {
            return res.json({ mess: 'Không có người dùng' });
        }
        return res.status(201).json({ mess: "Sửa thành công", data: result })

    } catch (error) {

        return res.status(500).json({ msg: error.message })
    }
})

router.delete('/books/:id', async (req, res) => {


    try {
        const { id } = req.params;
        const result = await TypeBook.findByIdAndDelete(id);
        if (!result) {
            return res.json({ mess: 'Không có người dùng' });
        }
        return res.status(201).json({ mess: "Xóa thành công", data: result })

    } catch (error) {

        return res.status(500).json({ msg: error.message })
    }
})
module.exports = router;