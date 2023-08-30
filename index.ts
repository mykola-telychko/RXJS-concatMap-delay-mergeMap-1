import { of } from 'rxjs';
import { concatMap, delay, mergeMap } from 'rxjs/operators';

// Example 1: Demonstrating the difference between concatMap and mergeMap
// Note the difference between concatMap and mergeMap. Because concatMap does not subscribe to the next observable until the previous completes, the value from the source delayed by 2000ms will be emitted first. Contrast this with mergeMap which subscribes immediately to inner observables, the observable with the lesser delay (1000ms) will emit, followed by the observable which takes 2000ms to complete.

//emit delay value
const src$ = of(2000, 1000);
// map value from source into inner observable, when complete emit result and move to next
const example = src$.pipe(
  concatMap((val) => of(`Delayed by: ${val}ms`).pipe(delay(val)))
);
//output: With concatMap: Delayed by: 2000ms, With concatMap: Delayed by: 1000ms
const subscribe = example.subscribe((val) =>
  console.log(`With concatMap: ${val}`)
);

// showing the difference between concatMap and mergeMap
const mergeMapExample = src$
  .pipe(
    // just so we can log this after the first example has run
    delay(5000),
    mergeMap((val) => of(`Delayed by: ${val}ms`).pipe(delay(val)))
  )
  .subscribe((val) => console.log(`With mergeMap: ${val}`));
