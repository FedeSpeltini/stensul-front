let answer;
let radios;
const init = () => {
    // Do not remove
    generateQuestionId();
    document.getElementById("loader-view").style.display = "none";
    
    document.getElementById("quiz").style.display = "none";
    // document.getElementById("submit-button").disabled = true;
};

// Do not modify the code mentioned below
const generateQuestionId = () => {
    const id = randomIntInRange(0, 6);
    document.getElementById('current-question-id').value = id.toString();
};

const randomIntInRange = (min, max, notIn) => {
    const value = Math.floor(Math.random() * (max - min + 1) + min);
    if (notIn && notIn.includes(value)) {
        return randomIntInRange(min, max, notIn);
    } else {
        return value;
    }
};
// Do not modify

const startClick = () => {
    document.getElementById("loader-view").style.display = "block";
    document.getElementById("pre-quiz").style.display = "none";
    makeRequest();
}

const sumbitClick = () => {
    console.log("entre al submit");
    // radios = document.getElementsByTagName('input');
    //console.log(radios);

    radiosFinal = document.getElementsByTagName('input');
    labelFinal = document.getElementsByTagName('label');

    console.log(labelFinal);
    if(radiosFinal[answer].checked)
    {
        console.log("correcto");
        labelFinal[answer].style.color = "green";
        labelFinal[answer].style.background = "#22a97a";
    }
    else
    {
        idRadio = obtainCheckedIdRadio();
        if (idRadio != null)
        {
            labelFinal[idRadio].style.color = "red";
            labelFinal[answer].style.color = "green";
            labelFinal[answer].style.background = "#22a97a";
            labelFinal[idRadio].style.background = "#a93c32";
            
        }
        
        console.log("incorrecto");
    }
}


let http_request = false;

const makeRequest =() => {

    http_request = false;

    if (window.XMLHttpRequest) { // Mozilla, Safari,...
        http_request = new XMLHttpRequest();
        if (http_request.overrideMimeType) {
            http_request.overrideMimeType('text/xml');
            // Ver nota sobre esta linea al final
        }
    } else if (window.ActiveXObject) { // IE
        try {
            http_request = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                http_request = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {}
        }
    }

    if (!http_request) {
        alert('Falla :( No es posible crear una instancia XMLHTTP');
        return false;
    }    
    http_request.onreadystatechange = alertContents;
    http_request.open('GET', `https://jsonmock.hackerrank.com/api/questions/${document.getElementById('current-question-id').value}`, true);
    http_request.send();

}

const alertContents = () => {

    if (http_request.readyState == 4) {
        document.getElementById("loader-view").style.display = "none";
        document.getElementById("quiz").style.display = "block";
        // document.getElementById("submit-button").disabled = true;

        if (http_request.status == 200) {
            const data = JSON.parse(http_request.response).data;
            console.log(data);
            document.getElementById('question').textContent = data.question;
            createList(data.options)
            answer = data.answer;
            console.log(`answer is {0}`, answer)
        } else {
            alert('We have a problem with the petition.');
        }
    }

}

const createList =  (list) => {
    let ol = document.createElement ("ul");
    //ol.style = "none";
    for (let i = 0; i < list.length ; i++) {
        let li = document.createElement ("li");
        const radio = document.createElement ("input");
        radio.type = "radio";
        radio.id = (i).toString();
        //radio.className = "option";
        const radioLabel = document.createElement ("label");
        radioLabel.id = (i).toString();
        //radioLabel.className = "option";
        radioLabel.textContent = list[i];

        li.appendChild (radio);
        li.appendChild (radioLabel);
        ol.appendChild (li);
    }

    const container = document.getElementById ("options-container");
    container.appendChild (ol);
}

const findRadios = () => {
    return document.getElementsByTagName('input')
}

const obtainCheckedIdRadio = () => {

    radios = findRadios()
    for( i = 0; i < radios.length; i++ ) {
        if( radios[i].checked) {

            return  i
             
        }
    }
    return null;
}

const selectRadio = (e) => {
    
    radios = findRadios()
    for( i = 0; i < radios.length; i++ ) {
        if( radios[i].checked  && i != e.toElement.attributes.id.value) {
             radios[i].checked = false;
             
        }
    }
    //document.getElementById("submit-button").disabled = false;
}

init();
