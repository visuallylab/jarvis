// it is a memory cache, for demo, record the system info

export enum SystemPage {
  Traffic = 'TRAFFIC',
  Electricity = 'ELECTRICITY',
  Home = 'HOME',
}

export enum NotifyEvent {
  ShowAccidentXimenRdSec1,
  LowBackupStatus,
}

const systemStatus: {
  page: SystemPage;
  notifyEvent: NotifyEvent | null;
} = {
  page: SystemPage.Home,
  notifyEvent: null,
};

export default systemStatus;
