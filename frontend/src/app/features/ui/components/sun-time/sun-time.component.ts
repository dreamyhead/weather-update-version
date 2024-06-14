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
  
  ngOnInit() {
    if (!this.options) {
      return;
    }

    this.sunriseMs = this.options.sunrise * 1000;
    this.sunsetMs = this.options.sunset * 1000;
  }

  ngAfterViewInit() {
    this.drawSunTime();
  }

  drawSunTime() {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    
    if (!ctx || !this.sunriseMs || !this.sunsetMs) {
      return;
    }

    const now = Date.now();

    // Center of the canvas
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const radius = Math.min(cx, cy) - 10;

    // Calculate sun position
    const totalDayDuration = this.sunsetMs - this.sunriseMs;
    const timeSinceSunrise = now - this.sunriseMs;

    const sunPositionRatio = Math.min(Math.max(timeSinceSunrise / totalDayDuration, 0), 1);

    // Clear the canvas before drawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the sun path arc
    ctx.beginPath();
    ctx.arc(cx, cy, radius, Math.PI, 2 * Math.PI);
    ctx.strokeStyle = 'orange';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw the sun
    const sunAngle = Math.PI + sunPositionRatio * Math.PI;
    const sunX = cx + radius * Math.cos(sunAngle);
    const sunY = cy + radius * Math.sin(sunAngle);

    ctx.beginPath();
    ctx.arc(sunX, sunY, 10, 0, 2 * Math.PI);
    ctx.fillStyle = 'yellow';
    ctx.fill();
    ctx.strokeStyle = 'orange';
    ctx.stroke();

    // Request next frame for animation
    this.animationFrameId = requestAnimationFrame(() => this.drawSunTime());
  }

  ngOnDestroy() {
    // Cleanup animation frame when component is destroyed
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
}
