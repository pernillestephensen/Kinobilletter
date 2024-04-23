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

    $("#seBilletter").click(function (){
        window.location.href = "/alleBilletter.html"
    });

    $("#hjem").click(function (){
        window.location.href="/index.html"
        }
    );
});

function hentFilmene(){
    $.get("/hentFilmer", function (filmer){
        formaterFilmer(filmer);
    })
}

function formaterFilmer(filmer){
    let ut = "<select id='valgtFilm' class='form-select form-select-md mb-3'>";
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
        registrertBillett();
    });

    $("#valgtFilm").val("");
    $("#antall").val("");
    $("#fornavn").val("");
    $("#etternavn").val("");
    $("#telefonnummer").val("");
    $("#email").val("");

}

function registrertBillett(){
    $.get("/hentAlle", function (billett){
        console.log(billett);
        let ut = "";
        for(const b of billett) {
            ut += b.antall + " billetter for '" + b.film + "' er registrert." + "<br>"
        }
        $("#registrertBillett").html(ut);
    });
}



