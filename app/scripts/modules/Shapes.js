(function(global) {
  'use strict';
  global.Shapes = {
    VERSION:'0.0.1'
  };

  var createShape = function(attributes) {

   attributes._id = attributes._id;
   name = attributes.name;
   attributes.nodes = attributes.nodes;
   var roadAttr;
   var amenityAttr;
   var buildingAttr;
   var naturalAttr;

   if (typeof attributes == roadAttr){
     createRoad(attributes);
   }

   else if (typeof attributes == amenityAttr){
     createRoad(attributes);
   }

   else if (typeof attributes == buildingAttr){
     createRoad(attributes);
   }

   else if (typeof attributes == naturalAttr){
     createRoad(attributes);
   }

  /* var tableauOrig = [{x:1, y:10}, {x:2, y:20}, {x:3, y: 30}]; --> attributes.nodes
   var tableauFormaté = tableauOrig.map(function(obj){
     var rObj = {};
     rObj[obj.clé] = obj.valeur;
     return rObj;
   });
   // tableauFormaté vaut maintenant [{1:10}, {2:20}, {3:30}],
   // tableauOrig vaut toujours [{clé:1, valeur:10}, {clé:2, valeur:20}, {clé:3, valeur: 30}] */

   var nodesTrie = attributes.nodes.map(function(obj){
     var rObj = {};
     rObj[obj.y] = String(obj.x) + " " + String(obj.y);
     var a3 = Object.keys(rObj).map(function (k) { 
      return rObj[k];
    })
     return a3;
   });


   var shape = {};

   shape.toSvgPath = function() { // public methods accessing hidden parameters.

     var stringReturn = "";
     var cpt=0;

     for (var i = 0; i < nodesTrie.length; i++) {
        if (i == 0) {
          stringReturn += "M " + String(nodesTrie[i]);
        }
        else {
          stringReturn += " L " + String(nodesTrie[i]);
        }
     }

     return stringReturn;
   };

   shape.getName = function() { // public methods accessing hidden parameters.
     return name;
   };

   shape.toString = function() {
    return "Name :" + getName + "; id : " + attributes._id;
  }

  shape.id = attributes._id;

   return shape; // return the newly created object.
  };



   function createRoad(roadAttr) {
    return Object.create(createShape, {
     building: {
          value: roadAttr.building
      },
      highway: {
          value: roadAttr.highway
      },
      getCategory: {
          value: function() {
              return roadAttr.highway;
          },
      }
    });

  }

  function createAmenity(amenityAttr) {
    return Object.create(createShape, {
      _id: {
          value: amenityAttr._id
      },
      nodes: {
          value: amenityAttr._nodes
      },
      amenity: {
          value: amenityAttr._amenity
      },
      getType: {
          value: function() {
              return String(amenityAttr.amenity);
          },
      }
    });
  }

  function createNatural(naturalAttr) {
    return Object.create(createShape, {
      _id: {
          value: naturalAttr._id
      },
      nodes: {
          value: naturalAttr.nodes
      },
      name: {
          value: naturalAttr.name
      },
      natural: {
          value: naturalAttr.natural
      },
      getType: {
          value : function() {
              return String(naturalAttr.natural);
          },
      }
    });
  }

  function createBuilding(buildingAttr) {
    return Object.create(createShape, {
      _id: {
          value: buildingAttr._id
      },
      nodes: {
          value: buildingAttr.nodes
      },
      getArea: {
          value: function() {
            //return buildingAttr.area;
            var area = 0;
            for (var i = 0; i < buildingAttr.nodes.length; i++) {
              if (i != buildingAttr.nodes.length - 1) {
                area += (buildingAttr.nodes[i].x * buildingAttr.nodes[i+1].y) - (buildingAttr.nodes[i].y * buildingAttr.nodes[i+1].x);
              } else {
                area += (buildingAttr.nodes[i].x * buildingAttr.nodes[0].y) - (buildingAttr.nodes[i].y * buildingAttr.nodes[0].x);
              }
            }
            return Math.abs(area / 2);  
          },
      }
    });
  }

  global.Shapes.createShape = createShape;
  global.Shapes.createRoad = createRoad; // Or createRoad ??
  global.Shapes.createAmenity = createAmenity;
  global.Shapes.createBuilding = createBuilding;
  global.Shapes.createNatural = createNatural;


}(this));

