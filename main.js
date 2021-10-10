var camera = document.getElementById("camera");

Webcam.set({
    width:350,
    height:200,
    image_format:"jpeg",
    jpeg_quality:90
});

Webcam.attach('#camera');

function take_photo(){
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = "<img id = 'captured_image' src = '" + data_uri + "'>"
    })
}

console.log("ML5 Version: ", ml5.version);

var classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/aw2fT1pLL/model.json", modelLoaded);

function modelLoaded(){
    console.log("Model Loaded");
}

function check_image(){
    var img = document.getElementById("captured_image");
    classifier.classify(img, gotResult);
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "The computers first prediction is " + prediction1;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1+","+"I dont know what to put here so I will put this, hdjasgkbfjhsdbjsdfjnmbzvmnbczxmnvbdyjgfuyaewgrouyqwetriuyqwetriuyq32t56713764587162354761325eq4876ryteawgfaytdsfjghdasfghewqtyrqewtyrfasdfggteywrytqewr632547861532476513284751325486712354765231i4765321i746518723645!@#$@#&$*@#&!$(*&#@!%*&$#*^(&!%#*(^&*$(#&^*#$%!)#$*@#$&(@&#$*!(&$*!#@(&$~(&~*&~(*~&*(~&~(*@&$~@#)&$~@)#($*)#@%&$*(&#%!#$*(%&#($!s");
    synth.speak(utterThis);
}

function gotResult(error, results){
    if(error){
        console.error(error);
    }
    else{

        prediction1 = results[0].label;
        speak();

        console.log(results);
        document.getElementById("prediction").innerHTML = results[0].label;
        document.getElementById("prediction_percentage").innerHTML = results[0].confidence.toFixed(3);

        if(results[0].label == "hi"){
            document.getElementById("outcome_emoji").innerHTML = "&#9995;";
        }
        if(results[0].label == "thumbs up"){
            document.getElementById("outcome_emoji").innerHTML = "&#128077;";
        }
        if(results[0].label == "peace"){
            document.getElementById("outcome_emoji").innerHTML = "&#9996;";
        }
    }
}