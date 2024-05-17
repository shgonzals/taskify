import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './modules/sidebar/sidebar.component';
import { ListComponent } from './components/list/list.component';
import { inject } from '@vercel/analytics';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { setupOpenTelemetry } from './otel/otel.config';
import { trace, SpanStatusCode } from '@opentelemetry/api';
import { loggerProvider } from './otel/otel.config';
import { LoggerService } from './services/logger.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, ListComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private tracer = trace.getTracer('angular-tracer');
  private logger = loggerProvider.getLogger('angular-logger');

  constructor(private loggerService: LoggerService) {
    setupOpenTelemetry();
  }

  ngOnInit() {
    inject();
    this.loggerService.emit('Application initialized');

    const span = this.tracer.startSpan('initialize');

    try {
      // Simulate some work
      this.doWork();
    } catch (error) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: (error as Error).message,
      });
    } finally {
      span.end();
    }
  }

  doWork() {
    const span = this.tracer.startSpan('doWork');
    // Simulate some work by sleeping
    setTimeout(() => {
      this.logger.emit({
        severityText: 'info',
        body: 'Work completed',
      });

      this.logger.emit({
        severityText: 'error',
        body: 'Work completed',
      });

      span.end();
    }, 1000);
  }
}
