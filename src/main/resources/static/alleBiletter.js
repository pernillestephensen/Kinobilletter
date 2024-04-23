$(document).ready(function(){
    $.get("/hentAlle", function(billett){ //function() mottar data fra serveren
        formaterData(billett);
    });

    $("#hjem").click(function (){
            window.location.href="/index.html"
        }
    );
});


function formaterData(billett) {
    let ut = "<table class='table table-striped'><tr><th>Film</th><th>Antall</th><th>Fornavn</th>" +
        "<th>Etternavn</th><th>Telefon</th><th>E-mail</th>"+ "<th></th><th></th></tr>";
    for (const b of billett) {
        ut += "<tr><td>" + b.film + "</td><td>" + b.antall + "</td><td>" + b.fornavn + "</td>" +
            "<td>" + b.etternavn + "</td><td>" + b.telefonnummer + "</td><td>" + b.email + "</td>" +
            "<td><button class='btn btn-danger' onclick='slettEnBillett("+b.id+")'>Slett</button></td>" +
            "<td> <a class='btn btn-primary' href='endreBillett.html?id="+b.id+"'>Endre</a></td></tr>";
    }
    ut += "</table>";
    $("#billetter").html(ut);

}

function kjopBillett(){
    window.location.href = "/bestilling.html"
}
function slettEnBillett(id){
    const url = "/slettEnBillett?id="+id;
    $.get(url, function (){
       window.location.href = '/alleBilletter.html';
    });
}

function slett(){
    $.get("/slett", function (){
        window.location.href = '/alleBilletter.html';
    });

}