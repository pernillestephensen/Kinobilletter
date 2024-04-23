$(function(){
    const id = window.location.search.substring(1);
    const url = "/hentEnBillett?"+id;
    $.get(url,function(billett){
        $("#id").val(billett.id);
        $("#antall").val(billett.antall);
        $("#fornavn").val(billett.fornavn);
        $("#etternavn").val(billett.etternavn);
        $("#telefonnummer").val(billett.telefonnummer);
        $("#email").val(billett.email);
        hentFilmene(billett.film);
    });

    $("#kjopBillett").click(function (){
        validerAntall(); validerFornavn(); validerEtternavn(); validerTelefonnummer(); validerEmail();

        if(validerAntall() && validerFornavn() && validerEtternavn() && validerTelefonnummer() && validerEmail()){
            endreBillett();
        }
    })
});

function hentFilmene(valgtFilm){
    $.get("/hentFilmer", function (filmer){
        formaterFilmer(filmer, valgtFilm);
    });
}

function formaterFilmer(filmer, valgtFilm) {
    let ut = "<select id='film' class='form-select form-select-md mb-3'>";
    for (const enFilm of filmer) {
        if (enFilm.film === valgtFilm) {
            ut += "<option selected>" + enFilm.film + "</option>";
        } else {
            ut += "<option>" + enFilm.film + "</option>";
        }
    }
    ut += "</select>";
    $("#film").html(ut);
}

function endreBillett() {
    const billett = {
        id: $("#id").val(),
        film: $("#film").find(":selected").val(),
        antall: $("#antall").val(),
        fornavn: $("#fornavn").val(),
        etternavn: $("#etternavn").val(),
        telefonnummer: $("#telefonnummer").val(),
        email: $("#email").val()
    };

    $.post("/endreEnBillett", billett, function() {
        window.location.href = 'alleBilletter.html';
    });
}

function avbryt(){
    window.location.href = 'alleBilletter.html';
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