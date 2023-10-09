window.onload = function(){
    $('#onload').fadeOut();
    $('body').removeClass('hidden');
}

document.addEventListener('DOMContentLoaded', function() {
    let hideInfoBtns = document.querySelectorAll('.card');
    let hideInfoElements = document.querySelectorAll('.card_info');

    hideInfoBtns.forEach((button, index) => {
        button.addEventListener('click', function() {
            hideInfoElements[index].classList.toggle('show');
        });
    });
});


document.addEventListener('DOMContentLoaded', function() {

const user = JSON.parse(localStorage.getItem('login_sucess')) || false

const logout = document.querySelector('#logout')
logout.addEventListener('click', ()=>{
    return alert('Sesión cerrada correctamente')
    localStorage.removeItem('login_sucess')
})})
