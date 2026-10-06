export type BookableSession = {
  id: string;
  title: string;
  time: string;
  location: string;
  capacity: number;
};

// Placeholder sessions - edit freely. `id` is stored with each booking.
export const bookableSessions: BookableSession[] = [
  { id: "mon-easy-social", title: "Monday · Easy Social", time: "Mon 18:30", location: "Kelvingrove Park", capacity: 30 },
  { id: "wed-track-intervals", title: "Wednesday · Track Intervals", time: "Wed 19:00", location: "Bellahouston Track", capacity: 30 },
  { id: "sat-long-run", title: "Saturday · Long Run", time: "Sat 09:00", location: "Pollok Park", capacity: 30 },
  { id: "sun-recovery-run", title: "Sunday · Recovery Run", time: "Sun 09:30", location: "Glasgow Green", capacity: 30 },
];
