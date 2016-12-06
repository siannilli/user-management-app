// The file for the current environment will overwrite this one during build
// Different environments can be found in config/environment.{dev|prod}.ts
// The build system defaults to the dev environment

export const environment = {
  production: false,
  debugMode: true,
  offline: true,
  authServiceUrl: 'http://localhost:3000/users/authenticate',
  userServiceUrl: 'http://localhost:3000/users/'
};
