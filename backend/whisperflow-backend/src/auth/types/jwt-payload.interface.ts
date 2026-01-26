export interface JwtPayload {
  firebaseId: string;
  iat?: number;
  exp?: number;
}
