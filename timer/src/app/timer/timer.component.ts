import { TagPlaceholder } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { Subject, interval, Observable, fromEvent, Subscriber, Subscription } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {

  private timer: Subscription
  public waitEvent: Subscription;

  public process: boolean = false
  public waiting: boolean = false

  public waitCounter: number = 0
  public startTime: number = 0

  public seconds: number = 0
  public minutes: number = 0
  public hours: number = 0

  get _seconds() {
    if (this.seconds >= 10) return this.seconds
    return '0' + this.seconds
  }

  get _minutes() {
    if (this.minutes >= 10) return this.minutes
    return '0' + this.minutes
  }

  get _hours() {
    if (this.hours >= 10) return this.hours
    return '0' + this.hours
  }

  constructor() { }

  ngOnInit(): void {
    this.waitEvent = this.creatingWaitEvent().subscribe()
  }

  ngOnDestroy() {
    this.waitEvent.unsubscribe()
  }

  public generateNewTimer(startValue: number = 0): Observable<number> {
    return interval(1000).pipe(
      tap((e) => {
        const currentSeconds = e + startValue + 1

        this.seconds = currentSeconds % 60

        if (currentSeconds % 60 === 0 && currentSeconds !== 0) {
          this.minutes = currentSeconds / 60
        }

        if (this.minutes % 60 === 0 && this.minutes !== 0) {
          this.minutes = 0
          this.hours = ++this.minutes / 60
        }
      })
    )
  }

  public creatingWaitEvent(): Observable<Event> {
    return fromEvent(document.querySelector('.timer__button_wait'),'click').pipe(
      tap(() => {
        this.waitCounter = ++this.waitCounter
        console.log(this.waitCounter)
        if (this.waitCounter === 2) {
          this.timer.unsubscribe()
          this.process = false
          this.waiting = true
          this.startTime = this.seconds
          this.waitCounter = 0
        }
      }),
      delay(300),
      tap(() => {
        this.waitCounter = 0
      })
    )
  }

  public start(): void {
    if (this.process === true) return
    if (this.waiting === true) {
      this.timer = this.generateNewTimer(this.startTime).subscribe()
    } else {
      this.timer = this.generateNewTimer().subscribe()
    }
    this.process = true
  }

  public stop(): void {
    if (this.process === false) return
    this.destroyTimer()
    this.resetValues()
  }

  public reset(): void {
    if (this.process === false) return
    this.destroyTimer()
    this.resetValues()
    this.start()
  }

  public resetValues(): void {
    this.startTime = 0
    this.seconds = 0
    this.minutes = 0
    this.hours = 0
  }

  public destroyTimer(): void {
    this.process = false
    this.timer.unsubscribe()
    this.waitEvent.unsubscribe()
  }
}





