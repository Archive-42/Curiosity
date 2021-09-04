/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Injectable} from '@angular/core';
import {NEVER, Observable, Subject, merge} from 'rxjs';
import {map, switchMap, take} from 'rxjs/operators';

import {ERR_SW_NOT_SUPPORTED, NgswCommChannel, PushEvent} from './low_level';


/**
 * Subscribe and listen to push notifications from the Service Worker.
 *
 * @publicApi
 */
@Injectable()
export class SwPush {
  /**
   * Emits the payloads of the received push notification messages.
   */
  readonly messages: Observable<object>;

  /**
   * Emits the payloads of the received push notification messages as well as the action the user
   * interacted with. If no action was used the action property will be an empty string `''`.
   *
   * Note that the `notification` property is **not** a [Notification][Mozilla Notification] object
   * but rather a
   * [NotificationOptions](https://notifications.spec.whatwg.org/#dictdef-notificationoptions)
   * object that also includes the `title` of the [Notification][Mozilla Notification] object.
   *
   * [Mozilla Notification]: https://developer.mozilla.org/en-US/docs/Web/API/Notification
   */
  readonly notificationClicks: Observable < {
    action: string;
    notification: NotificationOptions&{ title: string }
  }
  > ;

  /**
   * Emits the currently active
   * [PushSubscription](https://developer.mozilla.org/en-US/docs/Web/API/PushSubscription)
   * associated to the Service Worker registration or `null` if there is no subscription.
   */
  readonly subscription: Observable<PushSubscription|null>;

  /**
   * True if the Service Worker is enabled (supported by the browser and enabled via
   * `ServiceWorkerModule`).
   */
  get isEnabled(): boolean { return this.sw.isEnabled; }

  // TODO(issue/24571): remove '!'.
  private pushManager !: Observable<PushManager>;
  private subscriptionChanges = new Subject<PushSubscription|null>();

  constructor(private sw: NgswCommChannel) {
    if (!sw.isEnabled) {
      this.messages = NEVER;
      this.notificationClicks = NEVER;
      this.subscription = NEVER;
      return;
    }

    this.messages = this.sw.eventsOfType<PushEvent>('PUSH').pipe(map(message => message.data));

    this.notificationClicks =
        this.sw.eventsOfType('NOTIFICATION_CLICK').pipe(map((message: any) => message.data));

    this.pushManager = this.sw.registration.pipe(map(registration => registration.pushManager));

    const workerDrivenSubscriptions = this.pushManager.pipe(switchMap(pm => pm.getSubscription()));
    this.subscription = merge(workerDrivenSubscriptions, this.subscriptionChanges);
  }

  requestSubscription(options: {serverPublicKey: string}): Promise<PushSubscription> {
    if (!this.sw.isEnabled) {
      return Promise.reject(new Error(ERR_SW_NOT_SUPPORTED));
    }
    const pushOptions: PushSubscriptionOptionsInit = {userVisibleOnly: true};
    let key = this.decodeBase64(options.serverPublicKey.replace(/_/g, '/').replace(/-/g, '+'));
    let applicationServerKey = new Uint8Array(new ArrayBuffer(key.length));
    for (let i = 0; i < key.length; i++) {
      applicationServerKey[i] = key.charCodeAt(i);
    }
    pushOptions.applicationServerKey = applicationServerKey;

    return this.pushManager.pipe(switchMap(pm => pm.subscribe(pushOptions)), take(1))
        .toPromise()
        .then(sub => {
          this.subscriptionChanges.next(sub);
          return sub;
        });
  }

  unsubscribe(): Promise<void> {
    if (!this.sw.isEnabled) {
      return Promise.reject(new Error(ERR_SW_NOT_SUPPORTED));
    }

    const doUnsubscribe = (sub: PushSubscription | null) => {
      if (sub === null) {
        throw new Error('Not subscribed to push notifications.');
      }

      return sub.unsubscribe().then(success => {
        if (!success) {
          throw new Error('Unsubscribe failed!');
        }

        this.subscriptionChanges.next(null);
      });
    };

    return this.subscription.pipe(take(1), switchMap(doUnsubscribe)).toPromise();
  }

  private decodeBase64(input: string): string { return atob(input); }
}
