let audioContext;
function init() {
    // Create an audio context
    audioContext = new AudioContext();
}
init();

function playFailSound() {
    playSound('sawtooth', 0.1);
}

function playAnotherSound() {
    playSound('triangle', 0.1);
}

function playSuccessSound() {
    playSound('sine', 0.5, 880);
    setTimeout(function () {
        playSound('sine', 0.5, 880);
    }, 800);
}

function playSound(type, gain, frequency = 440) {

    // Create an oscillator for the fail sound
    let oscillator = audioContext.createOscillator();
    oscillator.type = type;

    // Create a gain node to control the volume
    let gainNode = audioContext.createGain();
    gainNode.gain.value = gain;

    oscillator.frequency.value = frequency;

    // Connect the oscillator to the gain node and the gain node to the destination
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Function to play the fail sound
    function _playSound() {
        oscillator.start(0);
        setTimeout(function () {
            oscillator.stop(0);
        }, 500);
    }

    _playSound();
}


function speakWord_Gen(word, _rate = 0.4, _voice = "UK English Female") {
    var voiceProvider = "default";

    //TODO
    let testTvMode = true;
    let log = "";

    try {

        if (_rate < 0.3)
            _rate = 0.3;

        let wordEl = document.getElementById("word");
        // Check if the user is using the Tizen Browser
        if (navigator.userAgent.indexOf('Tizen') !== -1 || testTvMode) {
            console.log('User is using the Tizen Browser'); //alert('Tizen');
            if (typeof window.responsiveVoice !== 'undefined' && typeof window.responsiveVoice.speak === 'function' || testTvMode) {
                voiceProvider = "responsiveVoice" + "-Tizen";
                responsiveVoice_apiRequests++;                        
                wordEl.innerText += log = `[start]${_rate}`
                //pitch (range 0 to 2), rate (range 0 to 1.5), volume (range 0 to 1)
                // responsiveVoice.speak(word, "UK English Male", {pitch: 0.75, rate: 0.75}); 
                responsiveVoice.speak(word, _voice, { pitch: 1, rate: _rate });
                wordEl.innerText += `[end]${_rate}`
            } else {
                voiceProvider = "undefined. something went wrong in Tizen!";
            }
        } else if ('speechSynthesis' in window && typeof window.speechSynthesis.speak === 'function') {
            var msg = new SpeechSynthesisUtterance(word);
            msg.rate = 0; //msg.pitch = 0;
            window.speechSynthesis.speak(msg);
        } else {
            voiceProvider = "NONE!";
        }
    }
    catch (err) {
        responsiveVoice_apiRequests--;
        alert(err);
        // document.getElementById("word").innerText = char + "**** (" + count + ") - provider: " + voiceProvider + " error: " + err;
    }

    //show a hint
    // var char = word.charAt(0);
    // document.getElementById("word").innerText = char + "**** (" + count + ") - provider: " + voiceProvider + ` responsiveVoice_apiRequests: ${responsiveVoice_apiRequests} ${log}`;
}