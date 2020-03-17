const firstName = document.getElementById('first-name');
const lastName = document. querySelector('#last-name');
const userGender = document.getElementsByName('gender');
const userMessage = document.querySelector('textarea');
const btn = document.querySelector('.submit-btn');
const banner = document.querySelector('.banner');
const closeBtn = document.querySelector('.close');

// click-ul pe submit btn
btn.addEventListener('click', (event) => {
    event.preventDefault();
    const regex= /^[a-z ,.'-]+$/i;
    if (!regex.test(firstName.value)) {
        firstName.style.borderColor = "lightcoral";
        alert('please enter a valid first name');
        return false;
    } else {
        firstName.style.borderColor = "lightseagreen";
    }

    if (!regex.test(lastName.value)) {
            alert('please enter a valid last name');
            lastName.style.borderColor = "lightcoral";
            return false;
    } else {
            lastName.style.borderColor = "lightseagreen";
    }

    if(userMessage.value.length < 10) {
        userMessage.style.borderColor = "lightcoral";
        alert('your message must be at least 10 characters.');
        return false; 
    } else {
        userMessage.style.borderColor = 'lightseagreen';
    }

    const title = getUserName(firstName,lastName);
    displayUsrMsg(title,userMessage);
    bannerMsg(firstName);
    elementOn(banner);
    console.log(':)');
});

// am vrut sa am o functie care sa capitalizeze numele, pentru afisarea in banner/usermsg la final
// din pacate, am semireusit. merge cu 'ana', 'ana ana', 'i.ana','ana-maria', 'o'donell', dar NU merge cu "ana o'donell"(-> Ana O'donell)
//nu cred sa fie firstName/surName care sa contina si spatiu si -, ' sau '.', dar... 
// tot as vrea sa stiu cum se poate face sa recunoasca/proceseze toate cazurile?
//de asemenea, mi se pare stufos cu for-ul care se repeta pt fiecare if/else if. se poate o scurtatura?

function capitalize(string) {
    if(string.indexOf(' ')>=0) {
        const splitStr = string.toLowerCase().split(' ');
        for (let i = 0; i < splitStr.length; i++) {
                splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].slice(1);     
        }
        return splitStr.join(' '); 
    }
    else if(string.indexOf('-')>=0) {
        const splitStr = string.toLowerCase().split('-');
        for (let i = 0; i < splitStr.length; i++) {
                splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].slice(1);     
        }
        return splitStr.join('-'); 
    }
    else if(string.indexOf('.')>=0) {
        const splitStr = string.toLowerCase().split('.');
        for (let i = 0; i < splitStr.length; i++) {
                splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].slice(1);     
        }
        return splitStr.join('.'); 
    }
    else if(string.indexOf("'")>=0) {
        const splitStr = string.toLowerCase().split("'");
        for (let i = 0; i < splitStr.length; i++) {
                splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].slice(1);     
        }
        return splitStr.join("'"); 
    }
    else {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}

// fct pt a obtine radio btn-ul selectat
function getGender() {
    for(let i=0; i< userGender.length; i++) {
        if(userGender[i].checked) {
        return userGender[i];
        }
    }
}

// fct pt a afisa/returna datele userului 
const getUserName = function (fName,lName) {
    const firstNameCapitalized = capitalize(fName.value);
    const lastNameCapitalized = capitalize(lName.value);
    const selectedGender = getGender().value;
    console.log(`${firstNameCapitalized} | ${lastNameCapitalized} | ${selectedGender}`);
    return `${firstNameCapitalized} ${lastNameCapitalized}, (${selectedGender}):`;
};


// fct pt a afisa mesajul userului in forma "Name,(gender): message" in locul formularului;
const displayUsrMsg =function (user,userMsg){
    const contactForm = document.querySelector('form');
    contactForm.innerHTML = `<div><h4>${user}</h4><p>"${userMsg.value}"</p></div>`;
    contactForm.setAttribute('class','usrmessg');
    return contactForm;
};

// fct pt a adauga prenumele userului la msg din banner
const bannerMsg = (user) => {
    const msg = document.querySelector('.banner-msg');
    return msg.innerHTML += capitalize(user.value);
};

// fct pt a face un element (bannerul) vizibil
function elementOn (element) {
    element.setAttribute('style','visibility: visible;');
}

//happy end function
closeBtn.addEventListener('click',function() {
    const newBody = document.querySelector('body');
    newBody.innerHTML=`<div></div>`;
    newBody.setAttribute('class','end');
    return newBody;
});
