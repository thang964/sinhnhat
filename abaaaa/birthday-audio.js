/**
 * Birthday Song Audio Generator
 * Fallback audio for when external audio sources fail
 */

class BirthdaySong {
    constructor() {
        this.audioContext = null;
        this.isPlaying = false;
        this.currentNote = 0;
        this.tempo = 120;
        this.nextNoteTime = 0.0;
        this.noteLength = 0.05;
        this.scheduleAheadTime = 0.1;
        this.intervalId = null;
        
        // Nốt nhạc "Happy Birthday"
        this.notes = [
            { note: 'G4', duration: 1 }, { note: 'G4', duration: 1 },
            { note: 'A4', duration: 2 }, { note: 'G4', duration: 2 },
            { note: 'C5', duration: 2 }, { note: 'B4', duration: 4 },
            { note: 'G4', duration: 1 }, { note: 'G4', duration: 1 },
            { note: 'A4', duration: 2 }, { note: 'G4', duration: 2 },
            { note: 'D5', duration: 2 }, { note: 'C5', duration: 4 },
            { note: 'G4', duration: 1 }, { note: 'G4', duration: 1 },
            { note: 'G5', duration: 2 }, { note: 'E5', duration: 2 },
            { note: 'C5', duration: 2 }, { note: 'B4', duration: 2 },
            { note: 'A4', duration: 2 }, { note: 'F5', duration: 1 },
            { note: 'F5', duration: 1 }, { note: 'E5', duration: 2 },
            { note: 'C5', duration: 2 }, { note: 'D5', duration: 2 },
            { note: 'C5', duration: 4 }
        ];
        
        // Ánh xạ tên nốt nhạc với tần số
        this.noteToFreq = {
            'C4': 261.63, 'C#4': 277.18, 'D4': 293.66, 'D#4': 311.13, 'E4': 329.63, 'F4': 349.23,
            'F#4': 369.99, 'G4': 392.00, 'G#4': 415.30, 'A4': 440.00, 'A#4': 466.16, 'B4': 493.88,
            'C5': 523.25, 'C#5': 554.37, 'D5': 587.33, 'D#5': 622.25, 'E5': 659.25, 'F5': 698.46,
            'F#5': 739.99, 'G5': 783.99, 'G#5': 830.61, 'A5': 880.00, 'A#5': 932.33, 'B5': 987.77
        };
    }
    
    init() {
        try {
            window.AudioContext = window.AudioContext || window.webkitAudioContext;
            this.audioContext = new AudioContext();
            return true;
        } catch(e) {
            console.error("Web Audio API không được hỗ trợ trong trình duyệt này.", e);
            return false;
        }
    }
    
    play() {
        if (!this.audioContext) {
            if (!this.init()) {
                return false;
            }
        }
        
        if (this.isPlaying) return true;
        
        if (this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
        
        this.isPlaying = true;
        this.currentNote = 0;
        this.nextNoteTime = this.audioContext.currentTime;
        this.scheduler();
        this.intervalId = setInterval(() => this.scheduler(), 25);
        
        return true;
    }
    
    stop() {
        this.isPlaying = false;
        clearInterval(this.intervalId);
    }
    
    scheduler() {
        while (this.nextNoteTime < this.audioContext.currentTime + this.scheduleAheadTime && this.isPlaying) {
            this.playNote(this.nextNoteTime);
            this.nextNote();
        }
    }
    
    nextNote() {
        // Tính thời gian cho nốt tiếp theo
        const secondsPerBeat = 60.0 / this.tempo;
        this.nextNoteTime += secondsPerBeat * (this.notes[this.currentNote].duration / 2);
        
        this.currentNote++;
        if (this.currentNote >= this.notes.length) {
            this.currentNote = 0; // Lặp lại bài hát
        }
    }
    
    playNote(time) {
        const osc = this.audioContext.createOscillator();
        const envelope = this.audioContext.createGain();
        
        osc.frequency.value = this.noteToFreq[this.notes[this.currentNote].note];
        
        envelope.gain.value = 0.0;
        envelope.gain.setValueAtTime(0, time);
        envelope.gain.linearRampToValueAtTime(0.5, time + this.noteLength);
        envelope.gain.linearRampToValueAtTime(0, time + this.noteLength * 2);
        
        osc.connect(envelope);
        envelope.connect(this.audioContext.destination);
        
        osc.start(time);
        osc.stop(time + this.noteLength * 3);
    }
}

// Thêm vào đối tượng window để có thể truy cập toàn cục
window.birthdaySongGenerator = new BirthdaySong();
