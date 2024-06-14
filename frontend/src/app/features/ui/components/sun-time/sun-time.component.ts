import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'sun-time',
  templateUrl: './sun-time.component.html',
  styleUrls: ['./sun-time.component.scss']
})
export class SunTimeComponent {
  @Input()
  options?: any;

  @ViewChild('sunPathCanvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private sunriseMs: number | undefined;
  private sunsetMs: number | undefined;
  private animationFrameId: number | undefined;
  private currentSunAngle: number = Math.PI; // Start angle (180 degrees)
  private targetSunAngle: number = Math.PI; // Initial target angle

  ngOnInit() {
    if (!this.options || !this.options.sunrise || !this.options.sunset) {
      return;
    }

    this.sunriseMs = this.options.sunrise * 1000;
    this.sunsetMs = this.options.sunset * 1000;
  }

  ngAfterViewInit() {
    this.updateTargetSunAngle();
    this.animateSun();
  }

  ngOnDestroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  updateTargetSunAngle() {
    const now = Date.now();

    if (!this.sunriseMs || !this.sunsetMs) {
      return;
    }

    const totalDayDuration = this.sunsetMs - this.sunriseMs;
    const timeSinceSunrise = now - this.sunriseMs;
    const sunPositionRatio = Math.min(Math.max(timeSinceSunrise / totalDayDuration, 0), 1);

    this.targetSunAngle = Math.PI + sunPositionRatio * Math.PI; // Update target angle based on the current time
  }

  animateSun() {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    // Linear interpolation for smooth animation
    this.currentSunAngle += (this.targetSunAngle - this.currentSunAngle) * 0.05;

    // Clear the canvas before drawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Center of the canvas
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const radius = Math.min(cx, cy) - 10;

    // Draw the sun path arc
    ctx.beginPath();
    ctx.arc(cx, cy, radius, Math.PI, 2 * Math.PI);
    ctx.strokeStyle = 'orange';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw the sun
    const sunX = cx + radius * Math.cos(this.currentSunAngle);
    const sunY = cy + radius * Math.sin(this.currentSunAngle);

    ctx.beginPath();
    ctx.arc(sunX, sunY, 10, 0, 2 * Math.PI);
    ctx.fillStyle = 'yellow';
    ctx.fill();
    ctx.strokeStyle = 'orange';
    ctx.stroke();

    // Continue the animation
    this.animationFrameId = requestAnimationFrame(() => this.animateSun());
  }
}
