
var ltype = "Home";
var roi = 7;
var amt;
var applicant;
var emi;
var duration;

document.getElementById("roi").value=roi;

function showElementById(elementId){
    document.getElementById(elementId).style="display:block";
}

function hideElementById(elementId){
    document.getElementById(elementId).style="display:none";

}

function showLoan(){
    showElementById("loanTab");
    hideElementById("depositTab");
}

function showDeposit(){
    showElementById("depositTab");
    hideElementById("loanTab");
}

function validateAmt(){
    amt = parseInt(document.getElementById("amt").value);
    if(amt == undefined || amt ==0 || isNaN(amt)){
        showElementById("validatoramt");            
    }else{
        hideElementById("validatoramt");
    }
}

function setLoanType(){
    ltype = document.getElementById("ltype").value;
    console.log(ltype); 
    if(ltype == "Home"){
        roi = 7;
    }
    else if(ltype == "Car"){
        roi=9;
    }else if(ltype =="Personal"){
        roi=12;
    }
    document.getElementById("roi").value=roi;
}



function isDataValid(amt,duration){
    var validData = false;

   
    if(ltype == "Home" && duration<=25){
        validData = true;
        hideElementById("errorDurMsg");

    }
    else if(ltype == "Car" && duration<=7){
        validData = true;
        hideElementById("errorDurMsg");

     }else if(ltype =="Personal" && duration<=5){
        validData = true;
        hideElementById("errorDurMsg");
    }

    if(amt == undefined || amt ==0 || isNaN(amt)){
        validData = false;
        showElementById("validatoramt");
    }else{
        validData = true;
        hideElementById("validatoramt");
    }

    if(duration == undefined || duration ==0 || isNaN(duration)){
        validData = false;
        showElementById("validatordur");
    }else{
        validData = true;
        hideElementById("validatordur");
    }

    if(ltype == "Home" && duration>25){
        validData = false;
        showElementById("errorDurMsg");
        document.getElementById("errorDurMsg").innerHTML="Home loan duration should not exceed 25 years";
    }
    else if(ltype == "Car" && duration>7){
        validData = false;
        showElementById("errorDurMsg");
        document.getElementById("errorDurMsg").innerHTML="Car loan duration should not exceed 7 years";

     }else if(ltype =="Personal" && duration>5){
        validData = false;
        showElementById("errorDurMsg");
        document.getElementById("errorDurMsg").innerHTML="Personal loan duration should not exceed 5 years";
    }

    if(validData)
        return true;
    else
        return false;

}


function calculate(){
    amt = parseInt(document.getElementById("amt").value);
    duration = parseInt(document.getElementById("dur").value);
    let result = isDataValid(amt,duration);
    
    console.log("amt "+amt+" dur "+duration);
    
    if(result){                 
        let rate =(roi/(12*100));
        const emi = (((amt*rate)*(Math.pow(1+rate,duration)))/(Math.pow(1+(rate),duration-1)));
        console.log("amt ",amt,"dur ",duration," roi",roi," emi "+emi);
        document.querySelector("#emi").innerHTML = "";
        document.querySelector("#emi").innerHTML = "Rs " + emi.toFixed(2)+"/-";
    }else{
        document.querySelector("#emi").innerHTML = "";
     
    }
}

function calculateDeposit(){
    amt = parseInt(document.getElementById("amt1").value);
    rod = 5;
    duration = parseInt(document.getElementById("dur1").value);
    
    const emi = (((amt*(rod/100))*(Math.pow(1+(rod/100),duration)))/(Math.pow(1+(roi/100),duration-1)));
    let matureAmt = amt+parseInt(((emi).toFixed(2)));
    console.log("amt ",amt,"dur ",duration," roi",rod," emi "+emi);
    document.querySelector("#mat").innerHTML = "Rs " +matureAmt +"/-";
}
