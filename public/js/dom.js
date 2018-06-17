const select = (element) => {
	return document.querySelector(element);
};

const mobile = select('.mobile');
const fullName = select('[name=fullName]');
const email = select('[name=email]');
const book = select('[name=bookName]');
const form = select('.reserveBook');
const mobileStatus = select('.mobileStatus');
const bookStatus = select('.bookStatus');
const datalist = select('#bookName');
const bookCopyMsg = select('[name=bookCopy]');
const reservedCopyMsg = select('[name=reservedCopy]');
const availableCopyMsg = select('[name=availableCopy]');
const notification = select('.notification');
const button = select('[name=button]');
const start = select('[name=lendingDate]').valueAsDate = new Date();
const end = select('[name=endDate]').valueAsDate = new Date();

console.log(book.value);



let messages = (bookstatus, mobilestatus, fullname, emailValue, bookCopyCount, reservedBookCount, availableBook, notify)=>{
	bookStatus.textContent= bookstatus;
	mobileStatus.textContent= mobilestatus;
	fullName.value=fullname;
	email.value=emailValue;
	bookCopyMsg.value=bookCopyCount;
	reservedCopyMsg.value=reservedBookCount;
	availableCopyMsg.value=availableBook;
	notification.textContent=notify;
};

const insertElement = (data)=>{
	datalist.textContent = '';
	for (var book in data.books) {
		const	option = document.createElement('option');
		option.setAttribute('value', `${data.books[book].book_name}`);
		datalist.appendChild(option);
	}
};

const eventListener = (element, action)=>{
	element.addEventListener(action, ()=>{
		const mobileNumber = mobile.value;
		const bookName = book.value;
		const start='start';
		const end='end';
		fetch('/insertbook', 'POST', mobileNumber, bookName,start,end, (res) => {
			const data = JSON.parse(res);
			const status = data.status;
			console.log('ee',res);
      
			errorHandling(status, data);

		});
	});
};

eventListener(mobile, 'blur');

eventListener(book, 'input');

eventListener(form, 'submit');


const errorHandling = (status, data) => {
	if(status === 400){
		button.setAttribute('disabled', '');
		messages('book not exist', '', '', '', data.bookCopy, data.count, data.availableCopy, '');
	}
	if(status === 305){
		button.setAttribute('disabled', '');
		const notify = `All the Copy of book (${book.value}) are reserved`;
		messages('All Copy Reserved', '', '', '', data.bookCopy, data.count, data.availableCopy, notify);

	}
	if(status === 310){
		button.removeAttribute('disabled', '');
		insertElement(data);
		messages('', 'Available User', data.fullName, data.email, data.bookCopy, data.count, data.availableCopy, '');
	}
	if(status === 402){
		button.setAttribute('disabled', '');
		insertElement(data);
		messages('', 'User Not Found', '', '', data.bookCopy, data.count, data.availableCopy, '');
	}
};
if(button){
	button.addEventListener('click', ()=>{
		const mobileNumber = mobile.value;
		const bookName = book.value;
		const lendingDate=start.value;
		const endDate=end.value;
	
  
  

		fetch('/insertbook', 'POST', mobileNumber, bookName,lendingDate,endDate, (res) => {
			const data = JSON.parse(res);
			const status = data.status;
			errorHandling(status, data);
			mobile.value='';
			book.value='';
			fullName.value='';
			bookCopyMsg.value='';
			reservedCopyMsg.vlaue='';
			availableCopyMsg.value='';
			start.value='';
			end.value='';
			email.value='';
			swal('Hello world!');


		});
	});

}




