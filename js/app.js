const apiUrl = 'http://localhost:3002/books'
let connection = new WebSocket('ws://localhost:8080')

const renderMessage = (message) => {
  const messageDiplay = document.getElementById('messages')
  messageDiplay.innerHTML = message
}

connection.addEventListener('message', message => {
  let incomingMessage = JSON.parse(message.data)
 renderMessage(incomingMessage.message)
})

const displayBooks = async () => {
  const displayElement = document.getElementById('display')
  const data = await ( await fetch(apiUrl, { credentials: 'include' })).json()

  data.books.forEach(book => {
    const displayBookElement = document.createElement('div')
    let html = `<p>${book.title}, by ${book.author}.`
    displayBookElement.innerHTML = html
    displayElement.appendChild(displayBookElement)
  });
}

const submitHandler = async (event) => {
  event.preventDefault()
  let author = event.target.author.value
  let title = event.target.title.value
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Accept': 'appliation/json',
      'Content-type': 'application/json'
    },
    body: JSON.stringify({title: title, author: author})
  })
}

document.addEventListener('DOMContentLoaded', () => {
  displayBooks()
  const createBookForm = document.getElementById('create-book')
  createBookForm.addEventListener('submit', submitHandler)
  window.connection = connection
})