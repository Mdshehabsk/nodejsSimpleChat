

const input = document.getElementById('input');
const socket = io()
async function submitmessage(id){
    const message = input.value;
    const response = await fetch('/message',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            message,
            id
        })
    })
}
const messageDiv = document.querySelector('.message-section')
const you = document.querySelector('#you').innerHTML
const me = document.querySelector('#me').innerHTML
socket.on('message',data=>{
    const message = document.createElement('div')
          message.className = you !== data.sender ? 'my-msg message' : 'your-msg message'
          message.innerHTML = `<p>${data.message}</p>`
          you == data.receiver && me == data.sender ? messageDiv.prepend(message) : null
          you == data.sender && me == data.receiver ? messageDiv.prepend(message) : null
    
})










