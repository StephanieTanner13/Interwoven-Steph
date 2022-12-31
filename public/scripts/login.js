// const { status } = require("express/lib/response");

function onlogin() {
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    const localStorage = window.localStorage;

    fetch(`${location.protocol}//${location.host}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json, text/plain, */*',
        },
        body: JSON.stringify({ email: email, password: password }),
    })

        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Something went wrong');
            }
        })
        .then((data) => {
            console.log(data);
            localStorage.setItem('token', data.token);
            localStorage.setItem('isMod', data.isMod);
            localStorage.setItem('userId', data.userId);
            localStorage.setItem('isLoggedin', true);
            window.location.href = `${location.protocol}//${location.host}/views/profile.html`;
        }).catch((err) => {
            document.getElementById('error').innerHTML = 'Username and Password do not match!'
            console.log(err)
        });
    return false;
}
