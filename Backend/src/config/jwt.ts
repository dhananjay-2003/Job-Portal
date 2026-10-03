const jwtAccessTokenSecret = String(process.env.JWT_ACCESS_TOKEN);
const jwtRefreshTokenSecret = String(process.env.JWT_REFRESH_TOKEN);
const accessTokenExpiry = parseInt(process.env.JWT_ACCESS_TOKEN_EXPIRY || '');
const refreshTokenExpiry = parseInt(process.env.JWT_REFRESH_TOKEN_EXPIRY || '');
const jwtIssuer = String(process.env.JWT_ISSUER);
const jwtAudience = String(process.env.JWT_AUDIENCE);

if (!jwtAccessTokenSecret) {
  throw new Error('Jwt Access Token Missing !.....');
}

if (!jwtRefreshTokenSecret) {
  throw new Error('Jwt Refresh Token Missing !....');
}

export const jwtConfig = {
  //Token Secret
  jwtAccessTokenSecret,
  jwtRefreshTokenSecret,

  //Token Expiry
  accessTokenExpiry,
  refreshTokenExpiry,

  //Token Users
  jwtIssuer: jwtIssuer ?? 'jobportal',
  jwtAudience: jwtAudience ?? 'jobportal',
};
