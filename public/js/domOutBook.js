const buttonBook= document.querySelectorAll('.buttonBook');
buttonBook.forEach((e)=>{
	e.addEventListener('click', ()=>{
		const bookId=e.value;
		const id = {bookId};
		fetch('/outBooks', 'POST',id, (res) => {
			location.reload();
    
		});
	});
});



