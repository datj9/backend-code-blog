export default interface IJwtPayload {
  readonly id: string;
  readonly email: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly isAuthor: boolean;
  readonly iat?: number;
  readonly exp?: number;
}
