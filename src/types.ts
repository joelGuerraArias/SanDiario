export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  photoUrl: string;
  number: number | null;
  lastNumberSelectedDate?: string;
}

export interface WinnerInfo {
  user: User;
  drawTime: string;
}