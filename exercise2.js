function zipInfo() {


    var client = new XMLHttpRequest();

    /*get zip code from text area */
    var zip_code = document.getElementById("zip").value;

    /* Country */
    var country = document.getElementById("country").value;

    var history = country + " - " + zip_code;

    search_history(history)

    updateSearchHistoryUi();


    /*
    Object.keys(localStorage).forEach(function(key){
        console.log(localStorage.getItem(key));
    }); */

    if (country == "Finland"){
        var country_abbreviation = "FI";
    }
    if (country == "Germany"){
        var country_abbreviation = "DE";
    }
    if (country == "France"){
        var country_abbreviation = "FR";
    }
    if (country == "Sweden"){
        var country_abbreviation = "SE";
    }

    /*request*/
    client.open("GET", "http://api.zippopotam.us/" + country_abbreviation + "/" + zip_code, true);


    client.onreadystatechange = function () {
        if (client.readyState == 4) {

            var table = document.getElementById("table");
            obj = JSON.parse(client.responseText);


            init_lng= parseInt(obj['places'][0]['longitude']);
            init_lat= parseInt(obj['places'][0]['latitude']);

            /* map settings */
            var mapProp= {
                center:new google.maps.LatLng(init_lat,init_lng),
                zoom:7,
            };

            var marker = [];

            /* new map*/
            var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);


            /*debug to see full response
            var element = document.getElementById("response");
            element.textContent = "vastaus: " + client.responseText;
            */

            /* iterate all places and put them to table */
            for (let i = 0; i < obj['places'].length; i++) {


                var row = table.insertRow(1);
                var cell_1 = row.insertCell(0);
                var cell_2 = row.insertCell(1);
                var cell_3 = row.insertCell(2);

                cell_1.innerHTML = obj['places'][i]['place name'];
                cell_2.innerHTML = obj['places'][i]['longitude'];
                cell_3.innerHTML = obj['places'][i]['latitude'];

                /* lat and lng for marker*/
                var lat = parseFloat(document.getElementById("table").rows[1].cells[2].innerHTML);
                var long = parseFloat(document.getElementById("table").rows[1].cells[1].innerHTML);


                /* marker to map */
                var myLatlng = new google.maps.LatLng(lat,long);

                marker[i] = new google.maps.Marker({
                    position: myLatlng,
                    title: document.getElementById("table").rows[1].cells[0].innerHTML,
                    id: i,
                    map: map
                });


            }
        }

    };
    client.send();

}

/*search history*/
function search_history(searchParam) {
    const maxHistoryLength = 10;
    const history = JSON.parse(localStorage.getItem('searchHistory') || '[]');
    const isHistoryMax =  history.length === maxHistoryLength;
    const workingHistory = isHistoryMax ? history.slice(1) : history;
    const updatedHistory = workingHistory.concat(searchParam);

    localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
}

function updateSearchHistoryUi(){
    const history = JSON.parse(localStorage.getItem('searchHistory') || '[]');

    $('#history_list').empty().append(history.map(v => `
    <li> ${v} </li>
  `).join(''));
}



