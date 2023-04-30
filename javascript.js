let library = [];

//Book object constructor
function Book(title, author, pages, haveRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;
    this.toString = `Title: ${this.title},\nAuthor: ${this.author},\nNumber of pages: ${this.pages},\nAlready read: ${this.haveRead}`;
}

//Constant elements of the page
const addButton = document.querySelector('#addButton');
const cancelButton = document.querySelector('#cancelButton');
const formContainer = document.querySelector('#formContainer');
const formHeader = document.querySelector('#formHeader');
const formContent = document.querySelector('#formContent');
const formFooter = document.querySelector('#formFooter');
const cardContainer = document.querySelector('#cardContainer');

//Basic events of the site
addButton.addEventListener('click', openForm);
cancelButton.addEventListener('click', closeForm);
formContent.addEventListener('submit', (e) => {
    e.preventDefault();
    submitForm();
})

function openForm() {
    formContainer.setAttribute('style', 'width: 20%; height: 50%; transition: 0.3s; opacity: 1;');
    formHeader.setAttribute('style', 'transition-delay: 0.3s; opacity: 1; transition: 2s');
    formContent.setAttribute('style', 'transition-delay: 0.3s; opacity: 1; transition: 2s');
    formFooter.setAttribute('style', 'transition-delay: 0.3s; opacity: 1; transition: 2s');
}
function closeForm() {
    formContainer.setAttribute('style', 'width: 0%; height: 0%; background-color: white; transition: 0.3s; transition-delay: 0.1s;')
    formHeader.setAttribute('style', 'opacity: 0; transition: 0.3s');
    formContent.setAttribute('style', 'opacity: 0; transition: 0.3s');
    formFooter.setAttribute('style', 'opacity: 0; transition: 0.3s');
}

//Checks for duplicates and submits form
function submitForm() {
    let bookTitle = document.querySelector('#bookTitle').value;
    let possibleId;
    library.forEach(item => {if(item.title == bookTitle){possibleId = library.indexOf(item)}});
    if(possibleId == undefined) {
        createBook();
    } else {
        alert('Book already exsists! You must not create duplicates!');
    }

}


//creates book object and adds it to end of library[]
function createBook() {
    let bookTitle = document.querySelector('#bookTitle').value;
    let bookAuthor = document.querySelector('#bookAuthor').value;
    let pageCount = document.querySelector('#pageCount').value;
    let isRead = document.querySelector('#isRead').checked;

    let book = new Book(bookTitle, bookAuthor, pageCount, isRead);
    library.push(book);
    console.log(library[library.length - 1]);

    closeForm();
    createCard();
    console.log(library);
    formContent.reset();
}


//creates book card and adds it to cardContainer
function createCard() {
    //new card is created
    let card = document.querySelector('.card');
    const cloneCard = card.cloneNode(true);

    //sets card id to the book's title and card values to book's values
    cloneCard.setAttribute('id', `${library[library.length - 1].title}`);
    cloneCard.querySelector('.cardTitle').textContent = library[library.length - 1].title;
    cloneCard.querySelector('.cardAuthor').textContent = library[library.length - 1].author;
    cloneCard.querySelector('.cardLength').textContent = library[library.length - 1].pages + ' pages';
    cloneCard.querySelector('.cardIsRead').textContent = library[library.length - 1].haveRead;

    //adds card to the container
    cardContainer.appendChild(cloneCard);

    setCardStatus(cloneCard);  
    cardEventlisteners(cloneCard);

}

//adds eventlisteners to card buttons
function cardEventlisteners(cloneCard) {
    cloneCard.querySelector('.deleteButton').addEventListener('click', function () {
        deleteBook(cloneCard);
        cloneCard.remove();
    });

    cloneCard.querySelector('.toggleButton').addEventListener('click', function() {
        toggleStatus(cloneCard);
        setCardStatus(cloneCard);
    });

}

//deletes book from library[]
function deleteBook(cloneCard) {
    library.forEach(item => {if(cloneCard.id == item.title){
        library.splice(library.indexOf(item), 1);
    }})
}

//sets the card to Finished or Not read based on the initial input
function setCardStatus(cloneCard) {
    let currentId;
    library.forEach(item => {if(cloneCard.id == item.title){currentId = library.indexOf(item);}});

    if(library[currentId].haveRead == true){
            cloneCard.querySelector('.cardIsRead').textContent = 'Finished';
            cloneCard.querySelector('.cardIsRead').setAttribute('style', 'background: #5cff8d')
        } else {
            cloneCard.querySelector('.cardIsRead').textContent = 'Not read';
            cloneCard.querySelector('.cardIsRead').setAttribute('style', 'background: #f7bcbc; color: white')
    }
    
}

//toggles the card to Finished or Not read based on the previous input
function toggleStatus(cloneCard) {

    library.forEach(item => {if(cloneCard.id == item.title){if(item.haveRead == true){item.haveRead = false} else {item.haveRead = true}}});
    setCardStatus(cloneCard);
}










