// Project class


var radX ;
var radY;

Kernel.Project = function ( id ){
    
    
	this._id = id;
	

	// THREE JS ELEMENTS

	// Container
	
	this._container;
	this._is_container_set = false;
	
	

	// Scene
	
	this._scene;
	
	

	
	// Camera
	
	this._screen_width;
	this._screen_height;

	this._view_angle;

	this._aspect;
	this._near;
	this._far;
	this._camera;
	
	


	// Renderer
	
	this._renderer;
	
	
	
	
	// Lights
	
	this._lights = [];
	
	this._ambient_light;
	
	
	
	// Controls
	
	this._controls;
	
	
	
	
	// Project vars & arrays

	this._globals = [];
	
	this._walls = [];
	this._doors = [];
	this._windows = [];
	
	
	this._levels = [];
    
    
    

}


Kernel.Project.prototype = {
    
    constructor: Kernel.Project,
    
	
	// Load data from database
    
    AjaxLoadData: function( id ){
		
		// ЗАГЛУШКА
		
//		$.get ( " URL ", { id: id } )
//			.done ( function ( data ) {
//				
//				this._levels = data.levels;
//			
//				this._blocks = data.blocks;
//				this._walls = data.walls;
//				
//		
//		
//		
//		
//		});
    	
		
		
		
		// Уровни
		this._levels = Project_Levels;
		
		
		
		// Перекрытия
		this._floors = Project_Floors;
		
		
		
		// Стены
        this._walls = Project_Walls;
		
		
		
		// Окна
		this._windows = Project_Windows;
		
		
		
		// Двери
		this._doors = Project_Doors;
		
		
		// Проемы
		this._holes = Project_Holes;
		
		
		// Spacehelpers
		
		this._spacehlpers = Project_Spacehelpers;
		
		
    
    },
    
	
	// Set view container
	
	SetContainer: function ( dom_element ){
		
		this._container = dom_element;
		this._isContainerSet = true;
	
	
	},
	
	
	// Construct project
	
	Construct: function (){
	
		
		
		
		// FROM DATA
		
		
		// Each level in levels
		
		$.each ( this._levels, function ( key, value ){
			
			
			new Kernel.Geometry.Constructive.Level ( value );
			
			
		});
		
		
		
		// Each floor in floors
		
		$.each ( this._floors, function ( key, value ){
			
			
			new Kernel.Geometry.Constructive.Floor ( value );
			
			
		});
		
		
		
		
		
		// Each wall in walls
		$.each ( this._walls, function ( key, value ){
		
			
			
			new Kernel.Geometry.Constructive.Wall ( value );
			
			//console.info ( wall );
			
			
			//wall.boom();

			
			
		});
		
		
		// Each spacehelper
		
		
		$.each ( this._spacehelpers, function ( key, value ){
		
			
			
			new Kernel.Geometry.Auxiliary.SpaceHelper ( value.points, value.levelHeight, value.height, value.color );
			

			
		});
		
		
		
		
		
		
		
		// each door in doors
		
		
		
		// each window in windows
		
		
		
		
		
	
	
	},
	
	// Scene init
	
	InitScene: function (){
		
		
		
		
		if ( this._isContainerSet ){
		
			
			console.info (" CONTAINER IS SET" );
			
			
			// Scene init
			this._scene = new THREE.Scene();
			
			this._objects = [];
			
			
			
			// Camera init
		
			this.SetScreenDimensions();
			
			
			
			this._view_angle = 45;
			
			this._aspect = this._screen_width / this._screen_height;
			this._near = 2;
			
			this._far = 1500000;
			
			
			this._camera = new THREE.PerspectiveCamera( this._view_angle, this._aspect, this._near, this._far );
			
			
			this._camera.position.set ( 0, 10000, 12000 );
			
			
			
			this._camera.lookAt( Kernel._active_project._scene.position );
			
			
			
			
			
			
			
			
			
			
			
            //this._camera.position.set ( -1000, -100, 0 );
			
			
			this._scene.add ( this._camera );
			
			
			//console.info (this._camera);
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			// Renderer init
			
			this._renderer = new THREE.WebGLRenderer({
				antialias: true
			});

			this._renderer.shadowMapEnabled = true;

			this._renderer.shadowMapType = THREE.PCFSoftShadowMap;
			this._renderer.setClearColor(0xB0B0B0, 1);
			this._renderer.setClearColor(0xF8FBFC, 1);
			
			this._renderer.setClearColor(0xD3D5D6, 1);
			this._renderer.setClearColor(0xD8DADB, 1);
			
			
			
			
			
			//console.error ( this._renderer );
			
			
			this._renderer.setSize( this._screen_width, this._screen_height );
			
		
		
			this._container.appendChild( this._renderer.domElement );
			
			
			//console.error ( this._renderer.domElement );
			//this._renderer.autoClearColor = false;
			//this._renderer.setClearColor( 0xFFFFFF );
			
			
			///document.body.appendChild(renderer.domElement);
			
			
			
			
			
			// Lights init
			
			this._lights[0] = new THREE.DirectionalLight( 0xffffff, 1, 100000 );
			
			
			
			
			
			this._lights[1] = new THREE.HemisphereLight( 0xffffff, 0.5, 10000 );
			this._lights[2] = new THREE.PointLight( 0xffffff, 1, 10000 );

			this._lights[3] = new THREE.PointLight( 0xffffff, 1, 0 );



			this._lights[0].castShadow = true;
			this._lights[0].shadowDarkness = 0.2;
			this._lights[0].shadowMapHeight = 1024;
			this._lights[0].shadowMapWidth = 1024;

			this._lights[0].position.set( -3000, -3000, 5000);

			this._lights[0].shadowCameraVisible = true;
			this._lights[1].position.set( 0, 0, 15000 );
			this._lights[2].position.set( -1000, -2000, -1000 );

			this._lights[3].position.set( 2000, 2000, 6000 ); 


			//this._scene.add(this._lights[1]);
//			this._scene.add(this._lights[2]);
//			this._scene.add(this._lights[1]);


			//var ambientLight = new THREE.AmbientLight(0xc1c1c1);
			this._ambient_light = new THREE.AmbientLight(0xc1c1c1);
			this._ambient_light = new THREE.AmbientLight(0xeeeeee);
			
			//this._ambient_light = new THREE.AmbientLight( 0xbbbbbb );
			

			this._ambient_light = new THREE.AmbientLight(0xfafafa);
			
			
			
			
			
			//////////////////////////////
			
			
			
		   // var hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
           // // hemiLight.color.setHSV( 0.6, 0.75, 0.5 );
           // // hemiLight.groundColor.setHSV( 0.095, 0.5, 0.5 );
            // hemiLight.position.set( 0, 500, 0 );
            // //this._scene.add( hemiLight );

            // var dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
            // dirLight.position.set( 10000, 0, 0 );
            // dirLight.position.multiplyScalar( 1);
            // dirLight.name = "dirlight";
            // dirLight.shadowCameraVisible = true;

            // this._scene.add( dirLight );

            // dirLight.castShadow = false;
            // dirLight.shadowMapWidth = dirLight.shadowMapHeight = 1024*2;

            // var d = 300;

            // dirLight.shadowCameraLeft = -d;
            // dirLight.shadowCameraRight = d;
            // dirLight.shadowCameraTop = d;
            // dirLight.shadowCameraBottom = -d;

            // dirLight.shadowCameraFar = 3500;
            // dirLight.shadowBias = -0.0001;
            // dirLight.shadowDarkness = 0.35;
			
			
			////////////////////////////////
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			var axisHelper = new THREE.AxisHelper( 1500 );
			this._scene.add( axisHelper );
			
			
			
			
			
			
			
			
			
			this._scene.add( this._ambient_light ); 
			
			
			
			/////////////
			Kernel._active_project = this;
			
			
			
			// Controls init
			Kernel._active_project._controls = new THREE.OrbitControls( Kernel._active_project._camera );
            
            Kernel._active_project._controls.enabled = true;
            
            Kernel._active_project._controls.addEventListener( 'change', Kernel._active_project.Render );
			
			
			Kernel._active_project._controls.rotateSpeed = 1.1;
			
			Kernel._active_project._controls.keyPanSpeed = 1.2;
			//Kernel._active_project._controls.minPolarAngle = Math.PI/4;
			

			//Kernel._active_project._controls.maxPolarAngle = Math.PI/2;
			
			
			
			
            
//            console.warn (scope);
//            console.warn (scope);
//            console.warn (scope);
//            console.warn (scope);
//            console.warn (scope);
			
//			this._controls = new THREE.OrbitControls( this._camera );
//			
//			this._controls.noRotate = false;
			
			
//		 	this._controls.mouseButtons = { 
//				
//				PAN: THREE.MOUSE.LEFT, 
//				ZOOM: THREE.MOUSE.MIDDLE, 
//				ORBIT: THREE.MOUSE.RIGHT
//				
//			};
			
			
			//this._controls.addEventListener( 'change', this.Render ( this ) );
    		
			
			//this.Render ( this );
			
			
			 var material = new THREE.LineBasicMaterial({
        color: 0x0000ff
    });
			
			
//            var geometry = new THREE.Geometry();
////            geometry.vertices.push(new THREE.Vector3(-10000, 0, 0));
////            geometry.vertices.push(new THREE.Vector3(0, 10000, 0));
////            geometry.vertices.push(new THREE.Vector3(10000, 0, 0));
//            
//            
//            
//            geometry.vertices.push(new THREE.Vector3(-5000, 5000, 0));
//            geometry.vertices.push(new THREE.Vector3( 5000, 5000, 0));
//            geometry.vertices.push(new THREE.Vector3( 5000, -5000, 0));
//			geometry.vertices.push(new THREE.Vector3( -5000, -5000, 0));
//			
//			
//			var line = new THREE.Line(geometry, material);
//			
//			
//			this._scene.add(line);
			
			
			
			
			
			
			var gridXY = new THREE.GridHelper(10000, 1000);
			gridXY.position.set( 0,0,0 );
			//gridXY.rotation.x = Math.PI/2;
			
			//gridXY.rotation.x = Math.PI/180;
			
			
			gridXY.setColors( new THREE.Color(0xFFFFFF), new THREE.Color(0xCCCCCC) );
			
			
			//gridXY.zIndex = 1;
			gridXY.zIndex = 0;
			this._scene.add( gridXY ); 
			
			
			
			
			
			
			
			
    		//this._renderer.render(this._scene, this._camera);
            
			
			Kernel._active_project.Animate ( );
            //Kernel._active_project.Render ( );
			
		
		}
	
	},
	
	

	
	// Set screen dimensions
	
	SetScreenDimensions: function (){
		
		
		//alert (" sadadadadaD");
		
		this._screen_width = window.innerWidth;
		
		this._screen_height = window.innerHeight;
	

	},
	
	
	
	// Animate

	Animate: function (){
		
		
		requestAnimationFrame( Kernel._active_project.Animate );

		Kernel._active_project._controls.update();

		Kernel._active_project.Render();

	
	},
	
	
	
	// Render
	
	Render: function (  ){
		
//		$.each ( Kernel._active_project._scene, function ( key, value ){
//		
//		
//			//console.info ( value );
//		
//		
//		
//		})
		
		
//		var timer = Date.now() * 0.001;
////
//		Kernel._active_project._camera.position.x = Math.sin( timer ) * 1000;
//		Kernel._active_project._camera.position.y = Math.cos( timer ) * 1000;
//		
//		
//		Kernel._active_project._camera.position.z = 1000;
		

		
		
		
		
		Kernel._active_project._camera.updateMatrix();
//		
//		
//		console.log ("                           XXX                        ");
//		console.log ("                           XXX                        ");
//		console.log ("                           XXX                        ");
//		console.log ("                           XXX                        ");
//		console.log ("                           XXX                        ");
		
		
//		Kernel._active_project._camera.rotation.z = 90 * Math.PI / 180;
		
		
		
//		Kernel._active_project._camera.position.z = Math.cos( timer ) * 200;
		
		
		
//		Kernel._active_project._camera.lookAt( Kernel._active_project._scene.position );
		
		
		
		
		
		
		
//	var r = 10000;	
//		
//		
//	radX += .01;
//    radY += .001;
//    /*
//      quote 
//      http://www.gaea.jcn.nihon-u.ac.jp/~kawane/mathformula/02figure/formula0204/form020413.xhtml
//    */
//    var x = r * Math.sin(radX) * Math.cos(radY);
//    var y = r * Math.sin(radX) * Math.sin(radY);
//    var z = r * Math.cos(radX);
//    
//    Kernel._active_project._camera.position.x = x;
//		Kernel._active_project._camera.position.y = y;
//		Kernel._active_project._camera.position.z = z;
		
//    Kernel._active_project._camera.lookAt(new THREE.Vector3(0,0,0));
		
		
//		console.error ( Kernel._active_project._camera.position );
		
		
		
		
		
		
		
		
		
		
		
		
		Kernel._active_project._renderer.render( Kernel._active_project._scene, Kernel._active_project._camera );
		
		
		
		
		
		
		
		
	  	
		
		
		
		
		
		
		
		
		
		
	
	},
	
	
	// Listen
	
	Listen: function (){
		
		
		$( this._renderer.domElement ).bind( "mousedown", function ( event ){
			
			
			event.preventDefault ();
	
			Kernel._active_project.HandleMouseDown ( event );
	
		});
		
	
	
		$( this._renderer.domElement ).bind( "mousemove", function ( event ){
            
            
//            console.info ( "Kernel._active_project._camera.position");
//            
//            console.info ( "");
//            console.info ( "");
//            console.info ( Kernel._active_project._camera.position);
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
		
//		Kernel._active_project._camera.rotation._z = 0;
//		Kernel._active_project._camera.rotation._x = 0;
		
		
//		Kernel._active_project._camera.rotation.set( Kernel._active_project._camera.rotation._x, -0.5, 0.5);
//		Kernel._active_project._camera.up.set (0, 0, 0 );
		
		//Kernel._active_project._camera.rotation.set( -1.5, 0, 3 );
		
		//Kernel._active_project._camera.rotation.z += Math.PI / 3;
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
		
//		console.log ( Kernel._active_project._camera.rotation );
//		console.log ( "                     								"  );
//		console.log ( "                     								"  );
//		console.log ( "                     								"  );
//		console.log ( "                     								"  );
//		console.log ( "                     								"  );
			
			
			
			
			
			
			
			
			

		});



		$( this._renderer.domElement ).bind( "mouseup", function ( event ){

			

		});
		
		

		
		$( window ).bind ( "resize", function ( event ){
		
    
            Kernel._active_project.HandleWindowResize();
            
		
		});
		
		
		
		
		
		
		
		
		
		
		
//		
//        window.addEventListener( 'resize', function ( event ){
//		
//			
//            Kernel._active_project.handleWindowResize();
//            
//            
//            //scope
//            
//            
//			//this.setScreenDimensions();
//		
//			//console.info ( Project1 );
//		
//		
//			//console.warn ( event.currentTarget.activeProject.setScreenDimensions() );
//		
//		
//		
//		}, false );
		
	
	
	},
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	// Handlers
	
	HandleActiveTool: function ( event ){
	
	
	
	
	
	
	
	
	
	},
	
	
	
	
	
	
	
	
	
	
	
	
	
	HandleMouseDown: function ( event ){
		
	console.log ( "                                     camera position "  );
		
		console.log ( "                     								"  );
		console.log ( "                     								"  );
		console.log ( "                     								"  );
		
		console.log ( Kernel._active_project._camera.position );
		
		Kernel._active_project.Intersect ();
		
		
		
		
	
	
	},
	
	
	Intersect: function (){
		
		
	
		var raycaster = new THREE.Raycaster(); // create once
		var mouse = new THREE.Vector2(); // create once

		

		mouse.x = ( event.clientX / Kernel._active_project._screen_width ) * 2 - 1;
		mouse.y = - ( event.clientY / Kernel._active_project._screen_height ) * 2 + 1;

		raycaster.setFromCamera( mouse, Kernel._active_project._camera );

		var intersects = raycaster.intersectObjects( Kernel._active_project._objects );
		
		
		if ( intersects.length ){
            
            
            
            intersects[0].object.parent.updateMatrixWorld();
            
            var vector = new THREE.Vector3();
            vector.setFromMatrixPosition( intersects[0].object.matrixWorld );
            
            console.info ( "vector" );
            console.info ( vector );
            
		
			console.info ( intersects[0] );
		
		
		}
		
		
	
	
	
	},
	
	
	
	
	HandleWindowResize: function (  ){
	

		Kernel._active_project.SetScreenDimensions();
		
		Kernel._active_project._camera.aspect = Kernel._active_project._screen_width / Kernel._active_project._screen_height ;
        
        Kernel._active_project._camera.updateProjectionMatrix();
        
		Kernel._active_project._renderer.setSize( Kernel._active_project._screen_width, Kernel._active_project._screen_height );
		
        Kernel._active_project.Render();
	
	},
	
	
	
	

	AddWall: function (  ){
		
		
//		
//		console.info ( wall );
//		
//		this.Walls.push( wall );
//		
//		console.info ( "Project.Walls" );
//		console.info ( this.Walls );
		
		
		//alert ("add wall");
		
		var wall_properties = { id: this._walls.length + 1 };
		
		this._walls.push ( Kernel.Constructive.Wall( wall_properties ) );
	
	
	
	},
	
	RemoveWall: function ( by_what, by_what_value ){
	
		
		
		this.Walls.push( "wall1" );
		
		console.info ( "Project.Walls" );
		console.info ( this.Walls );
		
		
		
		for (var i = 0; i < this.Walls.length; i++) {
			
			
			if ( this.Walls[i][by_what] === by_what_value ) {
				
				this.Walls[i].remove();

//				return this.Walls[i];
			}
    	}
		
		
		
		
	
	
	},
	
	
	
	
	
	
	
	
	
	
	// Get level position
	
	GetLevelPosition: function ( id ){
		
		
		//console.log ( id );
		
		var height;
		
    	$.each( Kernel._active_project._levels, function( key, value){
			
			
			//console.log ( value.height );
			
			if( value.id === id ){
				
//				alert ("asdadad");
//				
				height =  value.height;
				
			}
				
		});
		
		return height;
		
	},
	
	
	
	
	
	
	
	
	// Get object from elements array by any id
	
	GetObjectByKey: function( array, key, value ){
		
		
		
		
		
		
		// console.warn ( array );
		
		
		
		// console.warn ( "key - " + key );
		
		// console.warn ( "value - " + value );
	
	 	for (var i = 0; i < array.length; i++) {
			if ( array[i][key] === value ) {

				
				
				//alert ( array[i] );
				
				
				//console.error ( array[i] );
				
				
				if ( array == Kernel._active_project._doors){
					
					
					array[i].global_type = 1;
					
					
					
				}

				
				
				else if ( array == Kernel._active_project._windows){
				
					array[i].global_type = 2;
				
				}
				
				
				
				return array[i];
				
				
			}
    	}
	
	
	},
	
	
	
	
	
	

	
	// Get inserted objects for wall
	
	GetInsertedObjects: function ( inserted_objects_ids ){
	
		
		var inserted_objects_temp = [];
		
		$.each ( inserted_objects_ids, function ( key, value ){


			switch ( value.type ){

					
					
				// Get object from [ doors ]

				case 1: { inserted_objects_temp.push ( Kernel._active_project.GetObjectByKey ( array = Kernel._active_project._doors, key = 'id', value = value.id ) ); break; }


				// Get object from [ windows ]	

				case 2: { inserted_objects_temp.push ( Kernel._active_project.GetObjectByKey ( array = Kernel._active_project._windows, key = 'id', value = value.id ) ); break; }
					
					
				// Get object from [ holes ]	

				case 3: { inserted_objects_temp.push ( Kernel._active_project.GetObjectByKey ( array = Kernel._active_project._holes, key = 'id', value = value.id ) ); break; }	
					
					
					

			}


		});

		
		
		
		return inserted_objects_temp;

	
	}
	
	

}