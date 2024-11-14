function speakText() {
    const textElement = document.getElementById('textToSpeak');
    if (textElement) {
        const text = textElement.innerText;
        const utterance = new SpeechSynthesisUtterance(text);
        let voices = window.speechSynthesis.getVoices();

        console.log('Voices loaded:', voices.length);

        // Check if voices are loaded
        if (voices.length === 0) {
            window.speechSynthesis.onvoiceschanged = function() {
                voices = window.speechSynthesis.getVoices();
                console.log('Voices changed:', voices.length);
                if (voices.length > 0) {
                    utterance.voice = voices[0]; // Use the first available voice
                    window.speechSynthesis.speak(utterance);
                } else {
                    console.error('No voices available.');
                }
            };
        } else {
            utterance.voice = voices[0]; // Use the first available voice
            window.speechSynthesis.speak(utterance);
        }
    } else {
        console.error('Element with id "textToSpeak" not found.');
    }
}

function stopSpeaking() {
    window.speechSynthesis.cancel();
    console.log('Speech synthesis stopped.');
}

document.addEventListener('DOMContentLoaded', (event) => {
    const playButton = document.getElementById('play');
    if (playButton) {
        playButton.onclick = speakText;
    } else {
        console.error('Button with id "play" not found.');
    }

    const stopButton = document.getElementById('stop');
    if (stopButton) {
        stopButton.onclick = stopSpeaking;
    } else {
        console.error('Button with id "stop" not found.');
    }
});