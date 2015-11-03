(function(global) {
  'use strict';
  global.SpeedCheck = {};

  function SpeedCheckError(message){
    this.message = message;
  }

  function createSpeedCheck() {
      return Object.create(Object.prototype, {
          speed: {
              get: function() {
                  return this._speed || 0;
              },
              set: function(speed) {
                  if (speed < 0) {
                      throw {
                          name: 'SpeedCheckError',
                          message: 'Vitesse négative. Vous roulez a contre sens?'
                      };
                  }
                  this.validateInfraction(speed);
                  this._speed = speed;
              }
          },
          licencePlate: {
              get: function() {
                  return this._licencePlate || '???';
              },
              set: function(licencePlate) {
                  if (!this.validatePlate(licencePlate)) {
                      throw {
                          name: 'SpeedCheckError',
                          message: 'Plaque non reconnue. Vous avez de la chance.'
                      };
                  }
                  this._licencePlate = licencePlate;
              }
          },
         toString: {
              get: function() {
                  if (this.infraction){
                    return "Véhicule " + this._licencePlate + " roule à " + this._speed + "km/h. Infraction!";}

                  else{
                    return "Véhicule " + this._licencePlate + " roule à " + this._speed + "km/h. Ça va, circulez...";}
                }
          },
          infraction: {
              get: function() {
                  return this._infraction || false;
              }
          },
          validatePlate: {
              value: function(plate) {
                throw new SpeedCheckError('The "createSpeedCheck" should not be instantiated. It should be specialized.');
              }
          },
          validateInfraction: {
              value: function(speed) {
                throw new SpeedCheckError('The "createSpeedCheck" should not be instantiated. It should be specialized.');
              },
          }
      });
  }
  function createSpeedCheckFR() {
    return Object.create(createSpeedCheck(), {
      validatePlate: {
          value: function(plate) {
            return (plate.match(/[A-Z]{2}\d{3}[A-Z]{2}/) !== null);
          }
      },
      validateInfraction: {
          value: function(speed) {
              this._infraction = (speed > 130) ? true : false;
          },
      }
    });
  }
  function createSpeedCheckBE() {
    return Object.create(createSpeedCheck(), {
      validatePlate: {
          value: function(plate) {
              return (plate.match(/\d-[A-Z]{3}-\d{3}/) !== null);
          }
      },
      validateInfraction: {
          value: function(speed) {
              this._infraction = (speed > 120) ? true : false;
          },
      }
    });
  }

  // Expose public API
  global.createSpeedCheck = createSpeedCheck;
  global.SpeedCheckError = SpeedCheckError;
  global.createSpeedCheckFR = createSpeedCheckFR;
  global.createSpeedCheckBE = createSpeedCheckBE;


}(this));
