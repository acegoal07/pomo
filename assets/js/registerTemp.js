window.onload = function() {
    const registerForm = document.querySelector('#registration-form').addEventListener("submit", async (event) => {
        event.preventDefault();
        await fetch('assets/php/register.php', {
           method: 'POST',
           body: new FormData(event.target)
        }).then(response => {
            if (response.success === true) {
                alert('Registration successful!');
            } else {
                alert('Error: ' + response.status);
            }
        });
    });
}

/*need to code the logic for the confirm password and also fix it up, but basics are here for now. Making an account worked, and if
user already exists, it will return an error.*/