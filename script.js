// 🔊 Speak function
function speak(text) {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    speech.rate = 1;
    window.speechSynthesis.speak(speech);
}

// 🖥️ Update screen + voice together
function updateStatus(text) {
    document.getElementById("status").innerText = text;
    speak(text);
}

// ⏱️ Countdown timer (returns a Promise for async/await)
function countdown(seconds) {
    return new Promise(resolve => {
        let i = seconds;
        const interval = setInterval(() => {
            document.getElementById("status").innerText = "Time left: " + i + " sec";
            i--;
            if (i < 0) {
                clearInterval(interval);
                resolve();
            }
        }, 1000);
    });
}

// 🏋️ List of exercises (easy to extend)
const exercises = [
    { name: "Warm up", duration: 3 },               // seconds
    { name: "Jumping Jacks", reps: 10, duration: 5 },
    { name: "Push Ups", reps: 10, duration: 5 },
    { name: "Rest", duration: 10 },
    { name: "Squats", reps: 10, duration: 5 }
];

// 🏋️ Main workout flow
async function startWorkout() {
    updateStatus("Workout Started!");

    for (let ex of exercises) {
        if (ex.reps) {
            updateStatus(`Do ${ex.reps} ${ex.name}`);
        } else {
            updateStatus(`${ex.name} for ${ex.duration} seconds`);
        }
        await countdown(ex.duration);
    }

    updateStatus("Workout complete. Great job!");
}