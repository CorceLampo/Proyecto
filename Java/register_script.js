window.onload = function(){
    $('#onload').fadeOut();
    $('body').removeClass('hidden');
}

const signupForm = document.querySelector('#signup_form')
signupForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const name = document.querySelector('#name').value
    const second_name = document.querySelector('#second_name')
    const email = document.querySelector('#email').value
    const password = document.querySelector('#password').value

    const Users = JSON.parse(localStorage.getItem('users')) || []
    const isUserRegistered = Users.find(user => user.email === email)
    if(isUserRegistered){
        return alert('EL usuario registrado ya existe')
    }

    Users.push({name: name, second_name: second_name, email: email, password: password})
    localStorage.setItem('users', JSON.stringify(Users))
    return alert('Te has registrado con éxito'),
    window.location.href = 'Login.html'

})