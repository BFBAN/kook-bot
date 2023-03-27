import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';
import config  from "../../config";

class SentryManagement {
  sentry = Sentry;

  constructor() {
    if (!config.sentry.dsn) return;
    this.init();
  }

  init () {
    this.sentry.init({
      dsn: config.sentry.dsn,
      tracesSampleRate: config.sentry.tracesSampleRate
    });
  }

  test () {
    setTimeout(() => {
      try {
        throw "error!";
      } catch (e) {
        this.sentry.captureException(e);
      }
    }, 100);

    const transaction = this.sentry.startTransaction({
      op: "test",
      name: "My First Test Transaction"
    });
    transaction.finish();
  }
}

export {
  Sentry,
  SentryManagement,
  Tracing
};

