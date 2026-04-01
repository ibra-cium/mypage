export type GameState = 'IDLE' | 'PLAYING' | 'PAUSED' | 'GAME_OVER' | 'LEVEL_COMPLETE';

export interface Entity {
    x: number;
    y: number;
    width: number;
    height: number;
    velocityX: number;
    velocityY: number;
    color: string;
}

export interface Player extends Entity {
    lives: number;
    isJumping: boolean;
    isDashing: boolean;
    dashCooldown: number;
}

export interface Platform extends Entity {
    type: 'static' | 'moving' | 'disappearing';
    moveRange?: number;  // pixels to move left/right from start
    moveStartX?: number;
    disappearTimer?: number;   // ms until it fully disappears after player stands on it
    disappeared?: boolean;
    playerStandingTimer?: number; // ms player has been standing on this platform
}

export interface Coin extends Entity {
    collected: boolean;
}

export interface Enemy extends Entity {
    direction: number;
    isBoss?: boolean;
    bounceLeft?: number;   // left wall for bounce
    bounceRight?: number;  // right wall for bounce
}

export interface LevelConfig {
    platforms: Omit<Platform, 'velocityX' | 'velocityY'>[];
    coins: Omit<Coin, 'velocityX' | 'velocityY' | 'collected'>[];
    enemies: Omit<Enemy, 'velocityX' | 'velocityY'>[];
    bgTint: string;
    speedMultiplier: number;
}

const LEVEL_CONFIGS: LevelConfig[] = [
    // ── Level 1: Boot Sequence ──────────────────────────────────
    {
        bgTint: '#07080D',
        speedMultiplier: 1.0,
        platforms: [
            { x: 0, y: 300, width: 600, height: 20, color: '#181A2E', type: 'static' },
            { x: 100, y: 220, width: 100, height: 10, color: '#F5A623', type: 'static' },
            { x: 250, y: 160, width: 100, height: 10, color: '#F5A623', type: 'static' },
            { x: 400, y: 220, width: 100, height: 10, color: '#F5A623', type: 'static' },
        ],
        coins: [
            { x: 120, y: 190, width: 12, height: 12, color: '#7C3AED' },
            { x: 270, y: 130, width: 12, height: 12, color: '#7C3AED' },
            { x: 420, y: 190, width: 12, height: 12, color: '#7C3AED' },
        ],
        enemies: [
            { x: 300, y: 272, width: 20, height: 20, color: '#EF4444', direction: 1, bounceLeft: 250, bounceRight: 450 },
        ],
    },
    // ── Level 2: Stack Overflow ─────────────────────────────────
    {
        bgTint: '#100820',
        speedMultiplier: 1.4,
        platforms: [
            { x: 0, y: 300, width: 600, height: 20, color: '#181A2E', type: 'static' },
            { x: 60, y: 240, width: 90, height: 10, color: '#F5A623', type: 'static' },
            { x: 190, y: 195, width: 90, height: 10, color: '#F5A623', type: 'moving', moveStartX: 190, moveRange: 80 },
            { x: 310, y: 150, width: 90, height: 10, color: '#7C3AED', type: 'static' },
            { x: 400, y: 235, width: 90, height: 10, color: '#F5A623', type: 'moving', moveStartX: 400, moveRange: 60 },
            { x: 510, y: 190, width: 70, height: 10, color: '#F5A623', type: 'static' },
        ],
        coins: [
            { x: 75, y: 210, width: 12, height: 12, color: '#7C3AED' },
            { x: 220, y: 165, width: 12, height: 12, color: '#7C3AED' },
            { x: 330, y: 120, width: 12, height: 12, color: '#7C3AED' },
            { x: 430, y: 205, width: 12, height: 12, color: '#7C3AED' },
            { x: 530, y: 160, width: 12, height: 12, color: '#7C3AED' },
        ],
        enemies: [
            { x: 230, y: 272, width: 20, height: 20, color: '#EF4444', direction: 1, bounceLeft: 150, bounceRight: 380 },
            { x: 420, y: 272, width: 20, height: 20, color: '#EF4444', direction: -1, bounceLeft: 330, bounceRight: 580 },
        ],
    },
    // ── Level 3: AGI Endgame ────────────────────────────────────
    {
        bgTint: '#140A00',
        speedMultiplier: 1.8,
        platforms: [
            { x: 0, y: 300, width: 600, height: 20, color: '#181A2E', type: 'static' },
            { x: 40, y: 255, width: 80, height: 10, color: '#F5A623', type: 'static' },
            { x: 150, y: 210, width: 80, height: 10, color: '#F5A623', type: 'moving', moveStartX: 150, moveRange: 70 },
            { x: 270, y: 165, width: 80, height: 10, color: '#7C3AED', type: 'disappearing', disappearTimer: 2000 },
            { x: 360, y: 115, width: 80, height: 10, color: '#F5A623', type: 'static' },
            { x: 460, y: 165, width: 80, height: 10, color: '#F5A623', type: 'moving', moveStartX: 460, moveRange: 60 },
            { x: 240, y: 255, width: 70, height: 10, color: '#F5A623', type: 'static' },
            { x: 520, y: 240, width: 70, height: 10, color: '#F5A623', type: 'moving', moveStartX: 520, moveRange: 50 },
        ],
        coins: [
            { x: 50, y: 225, width: 12, height: 12, color: '#F5A623' },
            { x: 175, y: 180, width: 12, height: 12, color: '#F5A623' },
            { x: 285, y: 135, width: 12, height: 12, color: '#F5A623' },
            { x: 375, y: 85, width: 12, height: 12, color: '#F5A623' },
            { x: 475, y: 135, width: 12, height: 12, color: '#F5A623' },
            { x: 250, y: 225, width: 12, height: 12, color: '#F5A623' },
            { x: 535, y: 210, width: 12, height: 12, color: '#F5A623' },
        ],
        enemies: [
            { x: 60, y: 272, width: 20, height: 20, color: '#EF4444', direction: 1, bounceLeft: 10, bounceRight: 200 },
            { x: 300, y: 272, width: 20, height: 20, color: '#EF4444', direction: -1, bounceLeft: 200, bounceRight: 430 },
            { x: 450, y: 272, width: 20, height: 20, color: '#EF4444', direction: 1, bounceLeft: 370, bounceRight: 580 },
            // Boss enemy
            { x: 200, y: 272, width: 28, height: 28, color: '#F5A623', direction: 1, bounceLeft: 0, bounceRight: 572, isBoss: true },
        ],
    },
];

class SoundManager {
    private ctx: AudioContext | null = null;

    private init() {
        if (!this.ctx) {
            this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    private playTone(freq: number, type: OscillatorType, duration: number, volume: number = 0.1, sweep?: number) {
        this.init();
        if (!this.ctx) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        if (sweep) {
            osc.frequency.exponentialRampToValueAtTime(sweep, this.ctx.currentTime + duration);
        }

        gain.gain.setValueAtTime(volume, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + duration);
    }

    public playJump() { this.playTone(150, 'square', 0.1, 0.05, 600); }
    public playDash() { this.playTone(400, 'sawtooth', 0.15, 0.05, 50); }
    public playCoin() { this.playTone(880, 'triangle', 0.1, 0.08); setTimeout(() => this.playTone(1320, 'triangle', 0.15, 0.08), 50); }
    public playHurt() { this.playTone(100, 'sawtooth', 0.3, 0.12, 10); }
    public playLevelClear() {
        const now = 0.1;
        this.playTone(523.25, 'square', now, 0.05); // C5
        setTimeout(() => this.playTone(659.25, 'square', now, 0.05), 100); // E5
        setTimeout(() => this.playTone(783.99, 'square', now, 0.05), 200); // G5
        setTimeout(() => this.playTone(1046.50, 'square', 0.3, 0.05), 300); // C6
    }
    public playGameOver() { this.playTone(200, 'sawtooth', 0.5, 0.1, 20); }
    public playMenu() { this.playTone(440, 'sine', 0.05, 0.05); }
}

export class GameEngine {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private state: GameState = 'IDLE';
    private score: number = 0;
    private highScore: number = 0;
    private timer: number = 0;
    private level: number = 1;
    private lastTime: number = 0;
    private animationFrameId: number | null = null;
    private levelCompleteTimer: number = 0;

    private player: Player;
    private platforms: Platform[] = [];
    private coins: Coin[] = [];
    private enemies: Enemy[] = [];

    private keys: Record<string, boolean> = {};
    private sound: SoundManager = new SoundManager();

    private onStateChange?: (state: GameState) => void;
    private onScoreChange?: (score: number) => void;
    private onLivesChange?: (lives: number) => void;
    private onTimerChange?: (timer: number) => void;
    private onLevelChange?: (level: number) => void;
    private onCoinsChange?: (collected: number, total: number) => void;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Could not get canvas context');
        this.ctx = ctx;

        this.player = this.createPlayer();
        this.highScore = parseInt(localStorage.getItem('gba-portfolio-highscore') || '0', 10);

        this.setupKeyboard();
        this.loadLevel(1);
    }

    private createPlayer(): Player {
        return {
            x: 50,
            y: 200,
            width: 24,
            height: 32,
            velocityX: 0,
            velocityY: 0,
            color: '#F5A623',
            lives: 3,
            isJumping: false,
            isDashing: false,
            dashCooldown: 0,
        };
    }

    private loadLevel(levelNum: number) {
        const config = LEVEL_CONFIGS[levelNum - 1];
        if (!config) return;

        this.player.x = 50;
        this.player.y = 200;
        this.player.velocityX = 0;
        this.player.velocityY = 0;
        this.player.isJumping = false;
        this.player.isDashing = false;
        this.player.dashCooldown = 0;

        this.platforms = config.platforms.map(p => ({
            ...p,
            velocityX: p.type === 'moving' ? 1.5 : 0,
            velocityY: 0,
            disappeared: false,
            playerStandingTimer: 0,
        }));

        this.coins = config.coins.map(c => ({
            ...c,
            velocityX: 0,
            velocityY: 0,
            collected: false,
        }));

        this.enemies = config.enemies.map(e => ({
            ...e,
            velocityX: e.isBoss ? 3.5 * config.speedMultiplier : 2 * config.speedMultiplier,
            velocityY: 0,
        }));

        if (this.onLevelChange) this.onLevelChange(levelNum);
        if (this.onCoinsChange) this.onCoinsChange(0, this.coins.length);
    }

    private setupKeyboard() {
        window.addEventListener('keydown', (e) => {
            this.keys[e.code] = true;
            if (e.code === 'Enter') this.toggleStart();
            if (e.code === 'Backspace') this.reset();
        });
        window.addEventListener('keyup', (e) => {
            this.keys[e.code] = false;
        });
    }

    public setCallbacks(callbacks: {
        onStateChange?: (state: GameState) => void;
        onScoreChange?: (score: number) => void;
        onLivesChange?: (lives: number) => void;
        onTimerChange?: (timer: number) => void;
        onLevelChange?: (level: number) => void;
        onCoinsChange?: (collected: number, total: number) => void;
    }) {
        this.onStateChange = callbacks.onStateChange;
        this.onScoreChange = callbacks.onScoreChange;
        this.onLivesChange = callbacks.onLivesChange;
        this.onTimerChange = callbacks.onTimerChange;
        this.onLevelChange = callbacks.onLevelChange;
        this.onCoinsChange = callbacks.onCoinsChange;
    }

    public start() {
        if (this.state === 'IDLE' || this.state === 'GAME_OVER') {
            this.reset();
            this.updateState('PLAYING');
            this.lastTime = performance.now();
            this.loop(this.lastTime);
            this.sound.playMenu();
        }
    }

    public toggleStart() {
        this.sound.playMenu();
        if (this.state === 'IDLE' || this.state === 'GAME_OVER') {
            this.start();
        } else if (this.state === 'PLAYING') {
            this.updateState('PAUSED');
        } else if (this.state === 'PAUSED') {
            this.updateState('PLAYING');
        }
    }

    public reset() {
        this.player = this.createPlayer();
        this.score = 0;
        this.timer = 0;
        this.level = 1;
        this.levelCompleteTimer = 0;
        this.loadLevel(1);
        if (this.onScoreChange) this.onScoreChange(this.score);
        if (this.onLivesChange) this.onLivesChange(this.player.lives);
        if (this.onTimerChange) this.onTimerChange(this.timer);
    }

    private updateState(newState: GameState) {
        this.state = newState;
        if (this.onStateChange) this.onStateChange(newState);
    }

    private loop = (timestamp: number) => {
        if (this.state !== 'PLAYING' && this.state !== 'PAUSED' && this.state !== 'LEVEL_COMPLETE') {
            if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
            return;
        }

        const deltaTime = Math.min(timestamp - this.lastTime, 50); // cap at 50ms to avoid jumps
        this.lastTime = timestamp;

        if (this.state === 'PLAYING') {
            this.update(deltaTime);
        } else if (this.state === 'LEVEL_COMPLETE') {
            this.levelCompleteTimer += deltaTime;
            if (this.levelCompleteTimer >= 2000) {
                this.advanceLevel();
            }
        }

        this.draw();
        this.animationFrameId = requestAnimationFrame(this.loop);
    };

    private advanceLevel() {
        this.levelCompleteTimer = 0;
        if (this.level < LEVEL_CONFIGS.length) {
            this.level++;
            this.loadLevel(this.level);
            this.updateState('PLAYING');
        } else {
            // WIN condition — treat as special GAME_OVER with high score
            if (this.score > this.highScore) {
                this.highScore = this.score;
                localStorage.setItem('gba-portfolio-highscore', this.highScore.toString());
            }
            this.updateState('GAME_OVER');
            this.sound.playLevelClear();
        }
    }

    private update(deltaTime: number) {
        const config = LEVEL_CONFIGS[this.level - 1];
        const speedMult = config?.speedMultiplier ?? 1;

        // Timer
        this.timer += deltaTime / 1000;
        if (this.onTimerChange) this.onTimerChange(Math.floor(this.timer));

        // Dash cooldown
        if (this.player.dashCooldown > 0) this.player.dashCooldown--;

        // Player controls
        if (this.keys['ArrowLeft'] || this.keys['KeyA']) {
            this.player.velocityX = this.player.isDashing ? -12 : -4 * speedMult;
        } else if (this.keys['ArrowRight'] || this.keys['KeyD']) {
            this.player.velocityX = this.player.isDashing ? 12 : 4 * speedMult;
        } else {
            this.player.velocityX *= 0.8;
        }

        if ((this.keys['ArrowUp'] || this.keys['Space'] || this.keys['KeyW'] || this.keys['KeyZ']) && !this.player.isJumping) {
            this.player.velocityY = -10;
            this.player.isJumping = true;
            this.sound.playJump();
        }

        if ((this.keys['KeyX'] || this.keys['ShiftLeft']) && !this.player.isDashing && this.player.dashCooldown <= 0) {
            this.dash();
        }

        // Gravity
        this.player.velocityY += 0.5;

        // Apply velocity
        this.player.x += this.player.velocityX;
        this.player.y += this.player.velocityY;

        // Moving platform logic
        for (const p of this.platforms) {
            if (p.type === 'moving' && !p.disappeared) {
                const startX = p.moveStartX ?? p.x;
                const range = p.moveRange ?? 60;
                p.x += p.velocityX;
                if (p.x > startX + range || p.x < startX - range) {
                    p.velocityX *= -1;
                }
            }
        }

        let playerIsStanding = false;

        // Platform collision
        for (const p of this.platforms) {
            if (p.disappeared) continue;
            if (this.checkCollision(this.player, p)) {
                if (this.player.velocityY > 0 && this.player.y + this.player.height - this.player.velocityY <= p.y + 2) {
                    this.player.y = p.y - this.player.height;
                    this.player.velocityY = 0;
                    this.player.isJumping = false;

                    // Move player with moving platform
                    if (p.type === 'moving') {
                        this.player.x += p.velocityX;
                    }

                    // Disappearing platform logic
                    if (p.type === 'disappearing') {
                        playerIsStanding = true;
                        p.playerStandingTimer = (p.playerStandingTimer ?? 0) + deltaTime;
                        if (p.playerStandingTimer >= (p.disappearTimer ?? 2000)) {
                            p.disappeared = true;
                        }
                    }
                }
            } else if (p.type === 'disappearing' && (p.playerStandingTimer ?? 0) > 0) {
                // Player left the disappearing platform — reset its timer
                p.playerStandingTimer = Math.max(0, (p.playerStandingTimer ?? 0) - deltaTime * 0.5);
            }
        }

        if (!playerIsStanding) {
            // No-op — playerStandingTimer reset handled above per-platform
        }

        // Coin collection
        const collected = this.coins.filter(c => c.collected).length;
        for (const c of this.coins) {
            if (!c.collected && this.checkCollision(this.player, c)) {
                c.collected = true;
                this.score += 100;
                this.sound.playCoin();
                if (this.onScoreChange) this.onScoreChange(this.score);
                const newCollected = this.coins.filter(c2 => c2.collected).length;
                if (this.onCoinsChange) this.onCoinsChange(newCollected, this.coins.length);
            }
        }

        // Check all coins collected
        if (this.coins.length > 0 && this.coins.every(c => c.collected)) {
            this.score += this.level * 500; // level bonus
            if (this.onScoreChange) this.onScoreChange(this.score);
            this.updateState('LEVEL_COMPLETE');
            this.levelCompleteTimer = 0;
            this.sound.playLevelClear();
            return;
        }

        // Suppress unused variable warning
        void collected;

        // Enemy movement + collision
        for (const e of this.enemies) {
            const speed = e.isBoss ? 3.5 * speedMult : 2 * speedMult;
            e.x += speed * e.direction;
            const left = e.bounceLeft ?? 0;
            const right = e.bounceRight ?? (this.canvas.width - e.width);
            if (e.x < left || e.x + e.width > right) e.direction *= -1;

            if (this.checkCollision(this.player, e)) {
                this.player.lives--;
                this.sound.playHurt();
                if (this.onLivesChange) this.onLivesChange(this.player.lives);
                this.player.x = 50;
                this.player.y = 200;
                this.player.velocityX = 0;
                this.player.velocityY = 0;

                if (this.player.lives <= 0) {
                    this.updateState('GAME_OVER');
                    this.sound.playGameOver();
                    if (this.score > this.highScore) {
                        this.highScore = this.score;
                        localStorage.setItem('gba-portfolio-highscore', this.highScore.toString());
                    }
                }
            }
        }

        // Screen bounds
        if (this.player.x < 0) this.player.x = 0;
        if (this.player.x + this.player.width > this.canvas.width) this.player.x = this.canvas.width - this.player.width;
        if (this.player.y > this.canvas.height) {
            this.player.lives--;
            this.sound.playHurt();
            if (this.onLivesChange) this.onLivesChange(this.player.lives);
            this.player.x = 50;
            this.player.y = 200;
            this.player.velocityX = 0;
            this.player.velocityY = 0;
            if (this.player.lives <= 0) {
                this.updateState('GAME_OVER');
                this.sound.playGameOver();
            }
        }
    }

    private checkCollision(a: Entity, b: Entity): boolean {
        return a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y;
    }

    private draw() {
        const W = this.canvas.width;
        const H = this.canvas.height;
        const config = LEVEL_CONFIGS[this.level - 1];

        this.ctx.clearRect(0, 0, W, H);

        // BG tint per level
        this.ctx.fillStyle = config?.bgTint ?? '#07080D';
        this.ctx.fillRect(0, 0, W, H);

        // Subtle radial glow at center top
        if (this.level === 2) {
            const grad = this.ctx.createRadialGradient(W / 2, 0, 0, W / 2, 0, H * 0.8);
            grad.addColorStop(0, 'rgba(124,58,237,0.12)');
            grad.addColorStop(1, 'transparent');
            this.ctx.fillStyle = grad;
            this.ctx.fillRect(0, 0, W, H);
        } else if (this.level === 3) {
            const grad = this.ctx.createRadialGradient(W / 2, 0, 0, W / 2, 0, H * 0.8);
            grad.addColorStop(0, 'rgba(245,100,35,0.12)');
            grad.addColorStop(1, 'transparent');
            this.ctx.fillStyle = grad;
            this.ctx.fillRect(0, 0, W, H);
        }

        // Draw platforms
        for (const p of this.platforms) {
            if (p.disappeared) continue;

            // Disappearing platform — fade based on timer progress
            let alpha = 1;
            if (p.type === 'disappearing' && (p.playerStandingTimer ?? 0) > 0) {
                alpha = 1 - (p.playerStandingTimer ?? 0) / (p.disappearTimer ?? 2000);
            }
            this.ctx.globalAlpha = alpha;

            this.ctx.fillStyle = p.color;
            this.ctx.fillRect(p.x, p.y, p.width, p.height);

            this.ctx.shadowBlur = 5;
            this.ctx.shadowColor = p.color;
            this.ctx.strokeStyle = p.color;
            this.ctx.strokeRect(p.x, p.y, p.width, p.height);
            this.ctx.shadowBlur = 0;

            this.ctx.globalAlpha = 1;
        }

        // Draw coins
        for (const c of this.coins) {
            if (!c.collected) {
                this.ctx.fillStyle = c.color;
                this.ctx.beginPath();
                this.ctx.arc(c.x + c.width / 2, c.y + c.height / 2, c.width / 2, 0, Math.PI * 2);
                this.ctx.fill();

                this.ctx.shadowBlur = 10;
                this.ctx.shadowColor = c.color;
                this.ctx.strokeStyle = c.color;
                this.ctx.stroke();
                this.ctx.shadowBlur = 0;
            }
        }

        // Draw enemies
        for (const e of this.enemies) {
            this.ctx.fillStyle = e.color;
            this.ctx.fillRect(e.x, e.y, e.width, e.height);

            if (e.isBoss) {
                this.ctx.shadowBlur = 15;
                this.ctx.shadowColor = e.color;
                this.ctx.strokeStyle = e.color;
                this.ctx.lineWidth = 2;
                this.ctx.strokeRect(e.x, e.y, e.width, e.height);
                this.ctx.lineWidth = 1;
                this.ctx.shadowBlur = 0;
            }
        }

        // Draw player
        this.ctx.fillStyle = this.player.color;
        this.ctx.fillRect(this.player.x, this.player.y, this.player.width, this.player.height);

        // Player glow
        this.ctx.shadowBlur = 15;
        this.ctx.shadowColor = this.player.color;
        this.ctx.strokeStyle = this.player.color;
        this.ctx.strokeRect(this.player.x, this.player.y, this.player.width, this.player.height);
        this.ctx.shadowBlur = 0;

        // State overlays
        if (this.state === 'PAUSED') {
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
            this.ctx.fillRect(0, 0, W, H);
            this.ctx.fillStyle = '#F0EEF8';
            this.ctx.font = '20px "Press Start 2P"';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('PAUSED', W / 2, H / 2);
        }

        if (this.state === 'IDLE') {
            this.ctx.fillStyle = '#F0EEF8';
            this.ctx.font = '16px "Press Start 2P"';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('PRESS START', W / 2, H / 2);
        }

        if (this.state === 'LEVEL_COMPLETE') {
            const progress = Math.min(this.levelCompleteTimer / 2000, 1);
            this.ctx.fillStyle = `rgba(15, 16, 32, ${0.7 * progress})`;
            this.ctx.fillRect(0, 0, W, H);

            this.ctx.shadowBlur = 20;
            this.ctx.shadowColor = '#F5A623';
            this.ctx.fillStyle = '#F5A623';
            this.ctx.font = '22px "Press Start 2P"';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('LEVEL CLEAR!', W / 2, H / 2 - 20);
            this.ctx.shadowBlur = 0;

            this.ctx.fillStyle = '#F0EEF8';
            this.ctx.font = '10px "Press Start 2P"';
            if (this.level < LEVEL_CONFIGS.length) {
                this.ctx.fillText(`LEVEL ${this.level + 1} LOADING...`, W / 2, H / 2 + 20);
            } else {
                this.ctx.fillText('YOU WIN!', W / 2, H / 2 + 20);
            }
        }

        if (this.state === 'GAME_OVER') {
            const isWin = this.level >= LEVEL_CONFIGS.length;
            this.ctx.fillStyle = isWin ? 'rgba(245, 166, 35, 0.15)' : 'rgba(239, 68, 68, 0.15)';
            this.ctx.fillRect(0, 0, W, H);

            this.ctx.shadowBlur = 20;
            this.ctx.shadowColor = isWin ? '#F5A623' : '#EF4444';
            this.ctx.fillStyle = isWin ? '#F5A623' : '#EF4444';
            this.ctx.font = '22px "Press Start 2P"';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(isWin ? 'YOU WIN!' : 'GAME OVER', W / 2, H / 2 - 24);
            this.ctx.shadowBlur = 0;

            this.ctx.fillStyle = '#F0EEF8';
            this.ctx.font = '10px "Press Start 2P"';
            this.ctx.fillText(`SCORE: ${this.score}`, W / 2, H / 2 + 8);
            this.ctx.font = '8px "Press Start 2P"';
            this.ctx.fillStyle = '#6B7280';
            this.ctx.fillText('PRESS A TO RESTART', W / 2, H / 2 + 30);
        }
    }

    // Public methods for external controls
    public moveLeft() { this.keys['ArrowLeft'] = true; }
    public stopLeft() { this.keys['ArrowLeft'] = false; }
    public moveRight() { this.keys['ArrowRight'] = true; }
    public stopRight() { this.keys['ArrowRight'] = false; }
    public jump() {
        if (!this.player.isJumping) {
            this.player.velocityY = -10;
            this.player.isJumping = true;
            this.sound.playJump();
        }
        if (this.state === 'GAME_OVER' || this.state === 'IDLE') {
            this.start();
        }
    }
    public dash() {
        if (!this.player.isDashing && this.player.dashCooldown <= 0) {
            this.player.isDashing = true;
            this.player.dashCooldown = 30;
            this.player.velocityX *= 3;
            this.sound.playDash();
            setTimeout(() => {
                this.player.isDashing = false;
            }, 200);
        }
    }

    public getLevel(): number { return this.level; }
}
