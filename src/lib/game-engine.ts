export type GameState = 'IDLE' | 'PLAYING' | 'PAUSED' | 'GAME_OVER';

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
    type: 'static' | 'moving';
}

export interface Coin extends Entity {
    collected: boolean;
}

export interface Enemy extends Entity {
    direction: number;
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

    private player: Player;
    private platforms: Platform[] = [];
    private coins: Coin[] = [];
    private enemies: Enemy[] = [];

    private keys: Record<string, boolean> = {};

    private onStateChange?: (state: GameState) => void;
    private onScoreChange?: (score: number) => void;
    private onLivesChange?: (lives: number) => void;
    private onTimerChange?: (timer: number) => void;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Could not get canvas context');
        this.ctx = ctx;

        this.player = this.createPlayer();
        this.highScore = parseInt(localStorage.getItem('gba-portfolio-highscore') || '0', 10);

        this.setupKeyboard();
        this.reset();
    }

    private createPlayer(): Player {
        return {
            x: 50,
            y: 200,
            width: 24,
            height: 32,
            velocityX: 0,
            velocityY: 0,
            color: '#39FF14', // --color-neon-green
            lives: 3,
            isJumping: false,
            isDashing: false,
            dashCooldown: 0,
        };
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
    }) {
        this.onStateChange = callbacks.onStateChange;
        this.onScoreChange = callbacks.onScoreChange;
        this.onLivesChange = callbacks.onLivesChange;
        this.onTimerChange = callbacks.onTimerChange;
    }

    public start() {
        if (this.state === 'IDLE' || this.state === 'GAME_OVER') {
            this.reset();
            this.updateState('PLAYING');
            this.lastTime = performance.now();
            this.loop(this.lastTime);
        }
    }

    public toggleStart() {
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
        this.platforms = [
            { x: 0, y: 300, width: 600, height: 20, velocityX: 0, velocityY: 0, color: '#161B22', type: 'static' },
            { x: 100, y: 220, width: 100, height: 10, velocityX: 0, velocityY: 0, color: '#39FF14', type: 'static' },
            { x: 250, y: 160, width: 100, height: 10, velocityX: 0, velocityY: 0, color: '#39FF14', type: 'static' },
            { x: 400, y: 220, width: 100, height: 10, velocityX: 0, velocityY: 0, color: '#39FF14', type: 'static' },
        ];
        this.coins = [
            { x: 120, y: 190, width: 12, height: 12, velocityX: 0, velocityY: 0, color: '#00F5FF', collected: false },
            { x: 270, y: 130, width: 12, height: 12, velocityX: 0, velocityY: 0, color: '#00F5FF', collected: false },
            { x: 420, y: 190, width: 12, height: 12, velocityX: 0, velocityY: 0, color: '#00F5FF', collected: false },
        ];
        this.enemies = [
            { x: 300, y: 270, width: 20, height: 20, velocityX: 2, velocityY: 0, color: '#FF2D78', direction: 1 },
        ];

        if (this.onScoreChange) this.onScoreChange(this.score);
        if (this.onLivesChange) this.onLivesChange(this.player.lives);
        if (this.onTimerChange) this.onTimerChange(this.timer);
    }

    private updateState(newState: GameState) {
        this.state = newState;
        if (this.onStateChange) this.onStateChange(newState);
    }

    private loop = (timestamp: number) => {
        if (this.state !== 'PLAYING' && this.state !== 'PAUSED') {
            if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
            return;
        }

        const deltaTime = timestamp - this.lastTime;
        this.lastTime = timestamp;

        if (this.state === 'PLAYING') {
            this.update(deltaTime);
        }

        this.draw();
        this.animationFrameId = requestAnimationFrame(this.loop);
    };

    private update(deltaTime: number) {
        // Timer
        this.timer += deltaTime / 1000;
        if (this.onTimerChange) this.onTimerChange(Math.floor(this.timer));

        // Dash cooldown
        if (this.player.dashCooldown > 0) this.player.dashCooldown--;

        // Player controls
        if (this.keys['ArrowLeft'] || this.keys['KeyA']) {
            this.player.velocityX = this.player.isDashing ? -12 : -4;
        } else if (this.keys['ArrowRight'] || this.keys['KeyD']) {
            this.player.velocityX = this.player.isDashing ? 12 : 4;
        } else {
            this.player.velocityX *= 0.8;
        }

        if ((this.keys['ArrowUp'] || this.keys['Space'] || this.keys['KeyW'] || this.keys['KeyZ']) && !this.player.isJumping) {
            this.player.velocityY = -10;
            this.player.isJumping = true;
        }

        if ((this.keys['KeyX'] || this.keys['ShiftLeft']) && !this.player.isDashing && this.player.dashCooldown <= 0) {
            this.dash();
        }

        // Gravity
        this.player.velocityY += 0.5;

        // Apply velocity
        this.player.x += this.player.velocityX;
        this.player.y += this.player.velocityY;

        // Platform collision
        for (const p of this.platforms) {
            if (this.checkCollision(this.player, p)) {
                if (this.player.velocityY > 0 && this.player.y + this.player.height - this.player.velocityY <= p.y) {
                    this.player.y = p.y - this.player.height;
                    this.player.velocityY = 0;
                    this.player.isJumping = false;
                }
            }
        }

        // Coin collection
        for (const c of this.coins) {
            if (!c.collected && this.checkCollision(this.player, c)) {
                c.collected = true;
                this.score += 100;
                if (this.onScoreChange) this.onScoreChange(this.score);
            }
        }

        // Enemy collision
        for (const e of this.enemies) {
            // Simple enemy AI
            e.x += e.velocityX * e.direction;
            if (e.x < 250 || e.x > 450) e.direction *= -1;

            if (this.checkCollision(this.player, e)) {
                this.player.lives--;
                if (this.onLivesChange) this.onLivesChange(this.player.lives);
                this.player.x = 50;
                this.player.y = 200;

                if (this.player.lives <= 0) {
                    this.updateState('GAME_OVER');
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
            if (this.onLivesChange) this.onLivesChange(this.player.lives);
            this.player.x = 50;
            this.player.y = 200;
            if (this.player.lives <= 0) this.updateState('GAME_OVER');
        }
    }

    private checkCollision(a: Entity, b: Entity): boolean {
        return a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y;
    }

    private draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw background
        this.ctx.fillStyle = '#080B0F';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw platforms
        for (const p of this.platforms) {
            this.ctx.fillStyle = p.color;
            this.ctx.fillRect(p.x, p.y, p.width, p.height);

            // Add slight neon glow to platforms
            this.ctx.shadowBlur = 5;
            this.ctx.shadowColor = p.color;
            this.ctx.strokeRect(p.x, p.y, p.width, p.height);
            this.ctx.shadowBlur = 0;
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
                this.ctx.stroke();
                this.ctx.shadowBlur = 0;
            }
        }

        // Draw enemies
        for (const e of this.enemies) {
            this.ctx.fillStyle = e.color;
            this.ctx.fillRect(e.x, e.y, e.width, e.height);
        }

        // Draw player
        this.ctx.fillStyle = this.player.color;
        this.ctx.fillRect(this.player.x, this.player.y, this.player.width, this.player.height);

        // Player glow
        this.ctx.shadowBlur = 15;
        this.ctx.shadowColor = this.player.color;
        this.ctx.strokeRect(this.player.x, this.player.y, this.player.width, this.player.height);
        this.ctx.shadowBlur = 0;

        if (this.state === 'PAUSED') {
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.fillStyle = '#E6EDF3';
            this.ctx.font = '20px "Press Start 2P"';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('PAUSED', this.canvas.width / 2, this.canvas.height / 2);
        }

        if (this.state === 'IDLE') {
            this.ctx.fillStyle = '#E6EDF3';
            this.ctx.font = '16px "Press Start 2P"';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('PRESS START', this.canvas.width / 2, this.canvas.height / 2);
        }

        if (this.state === 'GAME_OVER') {
            this.ctx.fillStyle = 'rgba(255, 45, 120, 0.2)';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.fillStyle = '#FF2D78';
            this.ctx.font = '24px "Press Start 2P"';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('GAME OVER', this.canvas.width / 2, this.canvas.height / 2 - 20);
            this.ctx.font = '12px "Press Start 2P"';
            this.ctx.fillText('PRESS A TO RESTART', this.canvas.width / 2, this.canvas.height / 2 + 20);
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
        }
        if (this.state === 'GAME_OVER' || this.state === 'IDLE') {
            this.start();
        }
    }
    public dash() {
        if (!this.player.isDashing && this.player.dashCooldown <= 0) {
            this.player.isDashing = true;
            this.player.dashCooldown = 30; // frames
            this.player.velocityX *= 3;
            setTimeout(() => {
                this.player.isDashing = false;
            }, 200);
        }
    }
}
