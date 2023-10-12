window.onload = function(){
    $('#onload').fadeOut();
    $('body').removeClass('hidden');
}

const signup_form = document.querySelector('#signup_form')
signup_form.addEventListener('submit', (e)=>{
    e.preventDefault()
    const name = document.querySelector('#name').value;
    const second_name = document.querySelector('#second_name').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const man = document.getElementById('man_sex').checked;
    const woman = document.getElementById('woman_sex').checked;


    const Users = JSON.parse(localStorage.getItem('users')) || []
    const isUserRegistered = Users.find(user => user.email === email)
    if(isUserRegistered){
        return alert('EL usuario registrado ya existe')
    }

    const sex = man ? 'Hombre' : (woman ? 'Mujer' : '');

    Users.push({name: name, second_name: second_name, email: email, password: password, sex: sex})
    localStorage.setItem('users', JSON.stringify(Users))
    return alert('Te has registrado con éxito'),
    window.location.href = 'Login.html'

})