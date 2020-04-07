$(document).ready(function () {

    //Handlebars
    var htmlGiorno = $('#calendar-template').html();
    var templateGiorno = Handlebars.compile(htmlGiorno);

    //Dati presi da Moment
    // Stampare il mese di gennaio 2018
    // Tramite click stampare il mese successivo
    var mese = 0 ;

    // INIZIALIZZAZIONE CALENDARIO
    var dataIniziale = moment('2018-01-01');
    console.log(dataIniziale);
    stampaGiorniMese(dataIniziale);
    stampaFestivi();
    //CLICK SU MESE SUCCESSIVO
    $('.mese-successivo').click(function () {
        if(mese != 11 ) {
            mese = mese + 1 ;
            $('#calendar').empty();
            dataIniziale.add(1, 'M');
            stampaGiorniMese(dataIniziale);
            stampaFestivi();
            console.log(mese);
        }
    });
    //CLICK SU MESE PRECEDENTE
    $('.mese-precedente').click(function () {
        if(mese != 0 ) {
            mese = mese - 1 ;
            $('#calendar').empty();
            dataIniziale.subtract(1, 'M');
            stampaGiorniMese(dataIniziale);
            stampaFestivi();
        }

        console.log(mese);
    });


    // CHIAMATA AJAX
    function stampaFestivi() {
        $.ajax({
            url: 'https://flynn.boolean.careers/exercises/api/holidays',
            method: 'GET',
            data: {
                year: 2018,
                month: mese
            },
            success: function (data) {
                var giorniFestivi = data.response;
                for (var i = 0; i < giorniFestivi.length; i++) {
                    var giornoFestivo = giorniFestivi[i];
                    var nomeFestivita = giornoFestivo.name;
                    var dataFestivo = giornoFestivo.date;
                    console.log(nomeFestivita);
                    // console.log(nomeFestivita);
                    // console.log(dataFestivo);
                    $('#calendar li[data-day="'+ dataFestivo + '"]').addClass('festivo').append(' - ' + nomeFestivita)
                }
            }
        });
    }


    function stampaGiorniMese(meseDaStampare) {
        var standardDay = meseDaStampare.clone();
        var giorniMese = meseDaStampare.daysInMonth();
        var nomeMese = meseDaStampare.format('MMMM');
        $('#nome-mese').text(nomeMese); // Questo serve ad aggiornare il nome del mese nel top calendr
        //Giorno giorno con un ciclo stampo
        for (var i = 1; i <= giorniMese; i++) {
            // $('#calendar').append('<li>' + i + ' ' + nomeMese+ '</li>')

            var giornoDaInserire = {
                day: i + ' ' + nomeMese,
                dataDay: standardDay.format('YYYY-MM-DD')
            }

            var templateFinale = templateGiorno(giornoDaInserire);
            $('#calendar').append(templateFinale);
            standardDay.add(1, 'day');
        }
    }



});
