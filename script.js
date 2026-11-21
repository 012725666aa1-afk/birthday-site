// 1. توليد قلوب متطايرة في الخلفية
const heartsContainer = document.getElementById('hearts-container');
const heartIcons = ['❤️', '💖', '✨', '💕', '🌸'];

function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('floating-heart');
    heart.innerText = heartIcons[Math.floor(Math.random() * heartIcons.length)];
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
    heartsContainer.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 7000);
}
setInterval(createHeart, 600);

// 2. زر المفاجأة وإطلاق القصاصات
const surpriseBtn = document.getElementById('surprise-btn');
surpriseBtn.addEventListener('click', () => {
    confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
    });
    playBirthdayMelody();
    document.querySelector('.letter-section').scrollIntoView({ behavior: 'smooth' });
});

// 3. فتح وإغلاق ظرف الرسالة
const envelope = document.getElementById('envelope');
envelope.addEventListener('click', () => {
    envelope.classList.toggle('open');
});

// 4. إطفاء شمعة عيد الميلاد
const cake = document.getElementById('cake');
const flame = document.getElementById('flame');
const wishMsg = document.getElementById('wish-msg');

cake.addEventListener('click', () => {
    if (!flame.classList.contains('out')) {
        flame.classList.add('out');
        wishMsg.innerText = 'يارب كل أمانيك تتحقق السنة دي يا حبيبي! 🎉❤️';
        confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.7 }
        });
    }
});

// 5. عزف لحن عيد الميلاد (Happy Birthday) بدون الحاجة لملف صوت خارجي
let isPlaying = false;
const musicBtn = document.getElementById('music-btn');

function playBirthdayMelody() {
    if (isPlaying) return;
    isPlaying = true;
    musicBtn.innerText = '🔊';

    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const notes = [
        { freq: 261.63, dur: 0.3 }, { freq: 261.63, dur: 0.3 }, { freq: 293.66, dur: 0.6 },
        { freq: 261.63, dur: 0.6 }, { freq: 349.23, dur: 0.6 }, { freq: 329.63, dur: 1.0 },
        { freq: 261.63, dur: 0.3 }, { freq: 261.63, dur: 0.3 }, { freq: 293.66, dur: 0.6 },
        { freq: 261.63, dur: 0.6 }, { freq: 392.00, dur: 0.6 }, { freq: 349.23, dur: 1.0 }
    ];

    let time = ctx.currentTime;
    notes.forEach(note => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(note.freq, time);
        gain.gain.setValueAtTime(0.15, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + note.dur);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(time);
        osc.stop(time + note.dur);
        time += note.dur + 0.05;
    });

    setTimeout(() => {
        isPlaying = false;
        musicBtn.innerText = '🎵';
    }, 6500);
}

musicBtn.addEventListener('click', playBirthdayMelody);