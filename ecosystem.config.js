module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
      name      : 'pipescheme',
      script    : 'server.js',
      env: {
        COMMON_VARIABLE: 'true'
      },
      env_production : {
        NODE_ENV: 'production'
      },
      env_development : {
        NODE_ENV: 'development'
      },
      env_maintenance : {
        NODE_ENV: 'maintenance'
      }  
    },
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    production : {
      user : 'deploy',
      host : '138.197.20.29',
      ref  : 'origin/master',
      repo : 'http://github.com/ultraturtle0/pipescheme.git',
      path : '/var/www/pipescheme',
      'post-deploy' : '\
        npm install; \
        bower install; \
        mongod; \
        mkdir /var/www/media/pipescheme; \
        pm2 start ecosystem.config.js --env production',
      env  : {
        NODE_ENV: 'production'
      }
    },
    maintenance : {
      user : 'deploy',
      host : '138.197.20.29',
      ref  : 'origin/master',
      repo : 'http://github.com/ultraturtle0/pipescheme.git',
      path : '/var/www/pipescheme',
      'post-deploy' : '\
        npm install; \
        bower install; \
        mongod; \
        pm2 start ecosystem.config.js --env maintenance',
      env  : {
        NODE_ENV: 'maintenance'
      }
    }
  }
};
