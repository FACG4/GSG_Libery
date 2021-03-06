const connection = require('./../db_connection');
const bookName = (bookName, cb) => {
	const sql = {
		text: 'select book_name, num_copy from books where book_name like $1',
		values: ['%' + bookName + '%'],
	};
	connection.query(sql, (err, res) => {
		if (err) {
			cb(err);
		} else {
			cb(null, res.rows);

		}
	});
};

const bookNameMatch = (bookName, cb) => {
	const sql = {
		text: 'select book_name, num_copy from books where book_name like $1',
		values: [bookName],
	};
	connection.query(sql, (err, res) => {
		if (err) {
			cb(err);
		} else {
			cb(null, res.rows);

		}
	});
};

const lendingBook = (cb) => {
	const sql = {
		text: 'select * from lending'
	};
	connection.query(sql, (err, res) => {
		if (err) {
			cb(err);
		} else {
			cb(null, res.rows);

		}
	});
};

module.exports = {bookName, bookNameMatch, lendingBook};
