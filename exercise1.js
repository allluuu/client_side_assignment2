$(document).ready(function(){
    $("input").focus(function(){
        $(this).css("background-color", "#cccccc");
    });
    $("input").blur(function(){
        $(this).css("background-color", "#fffbfd");
    });
    <!--show and hide information section -->
    $("#Hide").click(function(){
        $(".information_section").slideToggle();
    });
});
<!-- change name of button -->
function changeName() {
    var change = document.getElementById("hide_button");
    if (change.innerHTML === "Hide"){
        change.innerHTML = "Show";
        console.log("changed to show")
    }else{
        change.textContent = "Hide";
        console.log("changed to hide")

    }

}

function getSubsrtings(){
    <!-- create bar code -->
    var barCode = $('#TextArea').val();

    <!-- payees iban-->
    iban = barCode.substring(1,17);
    var element = document.querySelector('div.IBAN');
    element.textContent = "Payee's IBAN: " + iban;
    //console.log("add iban to screen");

    <!--ammount-->
    ammount = barCode.substring(17,25);
    var element = document.querySelector('div.Ammount');

    <!-- remove leading zeros -->
    ammount =  ammount.replace(/^0+/, '');

    <!-- separate whole and decimal numbers -->
    var decimal = ammount.substring(ammount.length-2, ammount.length);
    var whole = ammount.substring(0, ammount.length-2);
    //console.log(ammount);

    // If no ammount in code
    if (! ammount) {

        element.textContent ="Ammount to be paid: 0,00";

    } else {

        element.textContent ="Ammount to be paid: " + whole + "," + decimal;
    }
    //console.log("ammount to info box");


    <!--reference-->
    reference = barCode.substring(25,48);
    var element = document.querySelector('div.Reference');


    rf_code = reference.substring(0,2);

    //remove rf_code from beginning
    reference = reference.substring(2, reference.length);
    //console.log(reference);

    <!--remove zeros-->
    reference = reference.replace(/^0+/, '');

    <!--If  version 5-->
    if (barCode.charAt(0) == 5){

        element.textContent ="Payment reference: RF" + rf_code + " "+ reference;
    }


    if (barCode.charAt(0) == 4){

        element.textContent ="Payment reference: " + reference;

    }

    //console.log("reference to info");


    <!--Date-->
    date = barCode.substring(48,54);
    var element = document.querySelector('div.Date');
    if (/^0+$/.test(date)) {
        element.textContent = "Due date: None";
        //console.log(date)
    }else {
        var dd = date.substring(4, 6);
        var mm = date.substring(2, 4);
        var yy = date.substring(0, 2);
        element.textContent = "Due date: " + dd + "." + mm + "." + "20" + yy;
    }
    //console.log("date to info");


    $("#barcode").JsBarcode(barCode);
}


