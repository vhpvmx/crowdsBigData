var viewer = new Cesium.Viewer('cesiumContainer');
var scene = viewer.scene;
var handler;


//Cesium.BingMapsApi.defaultKey : 'mo40heJ3oiiqvQwJgb5O~Z4IKF2NcW-gP3LhaLLx74Q~Aok2eJa6KZhUO2Fvewea6ZBo2R6xcj0zA-zcH8kEqkZhafotmmvnuoGQ2Lx0NaMx';
/***
var bing = new Cesium.BingMapsImageryProvider({
    //url : '//dev.virtualearth.net',
    key : 'mo40heJ3oiiqvQwJgb5O~Z4IKF2NcW-gP3LhaLLx74Q~Aok2eJa6KZhUO2Fvewea6ZBo2R6xcj0zA-zcH8kEqkZhafotmmvnuoGQ2Lx0NaMx',
    mapStyle : Cesium.BingMapsStyle.AERIAL
});
***/


function initAgents() {
    //////////////////////////////////////////////////////////////////////////////////
    //Label used to show coordinates
    //////////////////////////////////////////////////////////////////////////////////
    var entity = viewer.entities.add({
        label : {
            show : false
        }
    });

    // Mouse over the globe to see the cartographic position
    handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
    handler.setInputAction(function(movement) {
        var cartesian = viewer.camera.pickEllipsoid(movement.endPosition, scene.globe.ellipsoid);
        if (cartesian) {
            var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
            var longitudeString = Cesium.Math.toDegrees(cartographic.longitude).toFixed(4);
            var latitudeString = Cesium.Math.toDegrees(cartographic.latitude).toFixed(4);

            entity.position = cartesian;
            entity.label.show = true;
            entity.label.text = '(' + longitudeString + ', ' + latitudeString + ')';
        } else {
            entity.label.show = false;
        }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    //////////////////////////////////////////////////////////////////////////////////
    
    
    
    //////////////////////////////////////////////////////////////////////////////////
    //Load data Agents 
    //////////////////////////////////////////////////////////////////////////////////
    //var dataSource = Cesium.CzmlDataSource.load('../../SampleData/czml2.json');
    var dataSource = Cesium.CzmlDataSource.load('../../SampleData/join.czml');
    //var dataSource = Cesium.CzmlDataSource.load('../../SampleData/points3.czml');

    
    viewer.dataSources.add(dataSource).then(function(ds) {
        viewer.trackedEntity = ds.entities.getById('agent10');
    });
    
    //////////////////////////////////////////////////////////////////////////////////
    
    
    //////////////////////////////////////////////////////////////////////////////////
    //Display a rectangle for the area of interest
    //////////////////////////////////////////////////////////////////////////////////
    var west = 116.30;
    var south = 39.90;
    var east = 116.43;
    var north = 40.02;

    var rectangle = Cesium.Rectangle.fromDegrees(west, south, east, north);
    

     viewer.camera.flyTo({
        destination : rectangle
    });


    // Show the rectangle.  Not required; just for show.
    viewer.entities.add({
        rectangle : {
            coordinates : rectangle,
            fill : true,
            outline : true,
            material : Cesium.Color.BLUE.withAlpha(0.2),
            outlineWidth : 2.0,
            outlineColor : Cesium.Color.WHITE
        }
    });
    
    //////////////////////////////////////////////////////////////////////////////////
}


Sandcastle.addToolbarMenu([{
    text : 'Init',
    onselect : function() {
        initAgents();
        Sandcastle.highlight(initAgents);
    }
}]);


Sandcastle.reset = function () {
    viewer.entities.removeAll();
};






