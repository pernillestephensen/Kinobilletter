$(document).ready(function(){
    hentFilmene();
$("#kjopBillett").click(function (){
    validerAntall();
    validerFornavn();
    validerEtternavn();
    validerTelefonnummer();
    validerEmail();

    if(validerAntall() && validerFornavn() && validerEtternavn() && validerTelefonnummer() && validerEmail()){
        registrer();
    }
})
});

function hentFilmene(){
    $.get("/hentFilmer", function (filmer){
        formaterFilmer(filmer);
    })
}

function formaterFilmer(filmer){
    let ut = "<select id='valgtFilm' class='form-control'>";
    for(const enFilm of filmer){
        ut+="<option>"+ enFilm.film + "</option>";
    }
    ut+="</select>";
    $("#film").html(ut);
}


function validerInput(inputId, feilmeldingId, feilmeldingTekst) {
    const inputElement = document.getElementById(inputId);
    const feilmeldingElement = $("#" + feilmeldingId);

    if (!inputElement.checkValidity()) {
        feilmeldingElement.html(feilmeldingTekst);
        return false;
    } else {
        feilmeldingElement.html("");
        return true;
    }

}


function validerAntall() {
    return validerInput("antall", "feilantall", "Vennligst velg antall");
}

function validerFornavn() {
    return validerInput("fornavn", "feilfornavn", "Vennligst skriv inn fornavn");
}

function validerEtternavn() {
    return validerInput("etternavn", "feiletternavn", "Vennligst skriv inn etternavn");
}

function validerTelefonnummer() {
    const telefonnummerRegex = /^\d{8}$/;
    const telefonnummer = $("#telefonnummer").val();

    if (!telefonnummer || telefonnummer.length !== 8) {
        $("#feiltelefonnummer").html("Vennligst skriv inn et gyldig telefonnummer på 8 sifre");
        return false;
    }

    if (!telefonnummerRegex.test(telefonnummer)) {
        $("#feiltelefonnummer").html("Vennligst skriv inn et gyldig telefonnummer på 8 sifre");
        return false;
    } else {
        $("#feiltelefonnummer").html("");
        return true;
    }
}

function validerEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mail = $("#email").val();

    if (!mail) {
        $("#feilemail").html("Vennligst skriv inn en gyldig e-postadresse");
        return false;
    }

    if (!emailRegex.test(mail)) {
        $("#feilemail").html("Vennligst skriv inn en gyldig e-postadresse");
        return false;
    } else {
        $("#feilemail").html("");
        return true;
    }

}

function registrer(){
        const billett = {
            film: $("#valgtFilm").val(),
            antall: $("#antall").val(),
            fornavn: $("#fornavn").val(),
            etternavn: $("#etternavn").val(),
            telefonnummer: $("#telefonnummer").val(),
            email: $("#email").val()}

        $.post("/lagre", billett, function(){
            hentAlle();
        });

        $("#valgtFilm").val("");
        $("#antall").val("");
        $("#fornavn").val("");
        $("#etternavn").val("");
        $("#telefonnummer").val("");
        $("#email").val("");

}

function hentAlle(){
    $.get("/hentAlle", function(billett){ //function() mottar data fra serveren
        formaterData(billett);
    });
}



function formaterData(billett) {
   let ut = "<table class='table table-striped'><tr><th>Film</th><th>Antall</th><th>Fornavn</th>" +
        "<th>Etternavn</th><th>Telefon</th><th>E-mail</th>"+ "<th></th></tr>";
    for (const b of billett) {
        ut += "<tr><td>" + b.film + "</td><td>" + b.antall + "</td><td>" + b.fornavn + "</td>" +
            "<td>" + b.etternavn + "</td><td>" + b.telefonnummer + "</td><td>" + b.email + "</td>" +
            "<td><button class='btn btn-danger' onclick='slettEnBillett("+billett.id+")'>Slett</button></td></tr>";
    }
    ut += "</table>";
    $("#billetter").html(ut);
}

function slettEnBillett(id){
    const url = "/slettEnBillett?id="+id;
    $.get(url, function (){
        window.location.href = "/"
    });
}

function slett(){
    $.get("/slett", function (){
        hentAlle();
    });

}

