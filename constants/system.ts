// it is a memory cache, for demo, record the system info

export enum Page {
  Traffic = 'TRAFFIC',
  Electricity = 'ELECTRICITY',
  Home = 'HOME',
}

export enum NotifyEvent {
  ShowAccidentXimenRdSec1,
  LowBackupStatus,
}

const systemStatus: {
  page: Page;
  notifyEvent: NotifyEvent | null;
} = {
  page: Page.Home,
  notifyEvent: null,
};

export default systemStatus;
