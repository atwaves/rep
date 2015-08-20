Kernel.Geometry.Constructive.Floor = function ( properties ){

	
	this._id = properties.id;
	
	// Тип перекрытия
	this._type = properties.type;


	// Угол поворота перекрытия
	this._angle = properties.angle;
	
	
	this._width = properties.width;
	this._length = properties.length;
	
	this._thickness = properties.thickness;
	
	
	this._global_position = properties.global_position;
	
	
	
	
	
	
	
	
	
	
	// Level properties
	
	this._level = properties.level;
	this._level_height = Kernel._active_project.GetLevelPosition ( 	this._level );  
	
	
	
	
	
	// Holes
	
	this._holes_ids = properties.holes;
	this._holes = [];
	
	
	
	
	
	// Inserted objects
	
	this._inserted_objects_ids = properties.inserted_objects;
	this._inserted_objects = [];
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	// Three js objects properties
	
	this._object3d = new THREE.Object3D();


	
	
	
	// Surfaces
	
	this._surfaces_shapes = [];
	this._surfaces_geometry = [];
	this._surfaces_meshes = [];






	// Shapes

	this._top_surface_shape;
	this._bottom_surface_shape;
	
	this._front_surface_shape;
	this._back_surface_shape;

	this._left_surface_shape;
	this._right_surface_shape;




	
	// Geometry
	
	this._front_surface_geometry;
	this._back_surface_geometry;


	this._top_surface_geometry;
	this._bottom_surface_geometry;

	this._left_surface_geometry;
	this._right_surface_geometry;

	
	this._fillers_geometry = [];



	

	// Meshes
	
	this._front_surface_mesh;
	this._back_surface_mesh;


	this._top_surface_mesh;
	this._bottom_surface_mesh;

	this._left_surface_mesh;
	this._right_surface_mesh;


	this._fillers_meshes = [];
	
	
	



	this.Construct();

	return this;


}





Kernel.Geometry.Constructive.Floor.prototype = {
    
	
	
	
	
	
	
	
	
        constructor: Kernel.Geometry.Constructive.Floor,
	
	
	
		
	
	
	
	
	
	
	
	
	
		// Main construct
		
		Construct: function (){
		
			
			
			
			
			// Set GLOBAL Z POSITION
			
			this._global_position.y = Kernel._active_project.GetLevelPosition ( this._level ) + this._thickness / 2;
			
			
			

			// Get inserted objects
			
			
			if ( this._inserted_objects_ids.length ){
				
				
				this._inserted_objects = Kernel._active_project.GetInsertedObjects ( this._inserted_objects_ids );
				
				
			}
			
			
			
			
			
			// Construct shapes

			this.ConstructShapes ();
			
			
			// Construct geometry
			
			this.ConstructGeometry ();
			
			
			
			
			
			
			// Construct fillers geometry
			
			if ( this._inserted_objects.length ){
			
			
				this.ConstructFillersGeometry ();
				
				
				// console.group ( this._fillers_geometry);
				console.info ( this._fillers_geometry);
			
			
			}
			
			
			
			// Construct meshes
			
			this.ConstructMeshes ();
			
			
			
			
			
			
			
			
			
			
			
			
			// Construct THREE.Object3D
			
			this.ConstructObject3D ();
			
			
			
			
			
			
			
			
			
			// Add to project scene
			
			this.AddToScene ();
			
			this.AddToObjects ();
			

			

			
			
			
			
			// Construct edge helpers
			
			
			this.ConstructEdgeHelpers ();
//			
//			
//			
//			// Construct voluem text
//			
//			this.ConstructVolumeText ();
			
			
			
			
			
		
		
		},
	
	
		ConstructShapes: function (){
			
			
			
			var this_floor = this;
			
			var w = this._width;
			var l = this._length;
			
			var th = this._thickness;
			
			
			
			
			// Construct top surface shape
			
			var tss = new THREE.Shape();
			
			
			
			
			
			

			
			
			
			
			tss.moveTo( -w/2, l/2 );
			tss.lineTo( w/2, l/2 );
			tss.lineTo( w/2, -l/2 );
			tss.lineTo( -w/2, -l/2 );

			tss.lineTo( -w/2, l/2 );
			
			
			
			// Construct bottom surface shape
			
			var bss = tss;
			
			
			// Construct front surface shape
			
			var fss = new THREE.Shape();
			
			fss.moveTo( -w/2, th/2 );
			fss.lineTo( w/2, th/2 );
			fss.lineTo( w/2, -th/2 );
			fss.lineTo( -w/2, -th/2 );

			fss.lineTo( -w/2, th/2 );
			
			
			
			// Construct back surface shape
			
			var bkss = fss;
//			
//			bkss.moveTo( -w/2, th/2 );
//			bkss.lineTo( w/2, th/2 );
//			bkss.lineTo( w/2, -th/2 );
//			bkss.lineTo( -w/2, -th/2 );
//
//			bkss.lineTo( -w/2, th/2 );
			
			
			// Construct left surface shape
			
			var lss = new THREE.Shape();
			
			lss.moveTo( -l/2, th/2 );
			lss.lineTo( l/2, th/2 );
			lss.lineTo( l/2, -th/2 );
			lss.lineTo( -l/2, -th/2 );

			lss.lineTo( -l/2, th/2 );
			
			
			
			
			// Construct right surface shape
			
			var rss = lss;
			
			if ( this_floor._inserted_objects.length ){
				
				$.each ( this_floor._inserted_objects, function ( key, value ){
					
					// console.info ( "gggggggggggggggggggggggggggggggggggg value" );
					
					// console.info ( value );
					
					//console.trace ( value );
				
					tss.holes.push ( this_floor.AddHolePath ( value ) );
					//bss.holes.push ( this_floor.AddHolePath ( value ) );	
				
				
				});
				
				
				
			}
			
			
			
			this._top_surface_shape = tss;
			this._bottom_surface_shape = bss;

			this._front_surface_shape = fss;
			this._back_surface_shape = bkss;

			this._left_surface_shape = lss;
			this._right_surface_shape = rss;
		
		
		
		},
	
	
		AddHolePath: function ( inserted_object ){
		
			
			
			
			
			
			
			var dx = inserted_object.global_position.x - this._global_position.x;
			var dz = inserted_object.global_position.z - this._global_position.z;
			
			
			// Set plane difference
			
			//var plane_difference = Math.sqrt ( Math.pow( dx, 2) + Math.pow ( dy, 2) ) ;
			
			
			var INS_OBJ_WIDTH = inserted_object.width;
			var INS_OBJ_HEIGHT = inserted_object.length;
			
			
			// alert ( dx );
			// alert ( dy );
			
			
			var holePoints = [
				
				
				// Bottom points
				new THREE.Vector2( 0 + dx - INS_OBJ_WIDTH/2 , 0 + dz - INS_OBJ_HEIGHT/2 ),
				new THREE.Vector2( 0 + dx + INS_OBJ_WIDTH/2 , 0 + dz - INS_OBJ_HEIGHT/2 ),
				
				// Top points
				new THREE.Vector2( 0 + dx + INS_OBJ_WIDTH/2 , 0 + dz + INS_OBJ_HEIGHT/2 ),
				new THREE.Vector2( 0 + dx - INS_OBJ_WIDTH/2 , 0 + dz + INS_OBJ_HEIGHT/2 ),
				
				
				// new THREE.Vector2( 0 + dx - INS_OBJ_WIDTH/2 , 0 + dy - INS_OBJ_HEIGHT/2 )
				
			
				
				
				
				

			];
			
	

			return new THREE.Shape ( holePoints );
			
		
		
		
		},
	
	
	
	
		// Construct geometry
	
		ConstructGeometry: function (){
			
			
			
			
			
			
		
			// Construct top surface geometry from shape
			
			this._top_surface_geometry = new THREE.BufferGeometry().fromGeometry ( new THREE.ShapeGeometry( this._top_surface_shape ) );
			
			
			// Construct bottom surface geometry from shape
			
			this._bottom_surface_geometry = new THREE.BufferGeometry().fromGeometry ( new THREE.ShapeGeometry( this._bottom_surface_shape ) );
			
			
			
			
			
			
			
			
			
			// Construct front surface geometry from shape
			
			this._front_surface_geometry = new THREE.BufferGeometry().fromGeometry ( new THREE.ShapeGeometry( this._front_surface_shape ) );
			
			
			
			
			// Construct back surface geometry from shape
			
			this._back_surface_geometry = new THREE.BufferGeometry().fromGeometry ( new THREE.ShapeGeometry( this._back_surface_shape ) );
			
			
			
			// Construct front surface geometry from shape
			
			this._left_surface_geometry = new THREE.BufferGeometry().fromGeometry ( new THREE.ShapeGeometry( this._left_surface_shape ) );
			
			
			
			
			// Construct back surface geometry from shape
			
			this._right_surface_geometry = new THREE.BufferGeometry().fromGeometry ( new THREE.ShapeGeometry( this._right_surface_shape ) );
			
			
			
			
			
			var this_floor = this;
			
			var fillers_geometry = [];
		
		},
	
	
	
	
	
	
	
	
	
		// Construct fillers geometry
		
		ConstructFillersGeometry: function (){
			
			var this_floor = this;
			
			
			$.each ( this_floor._inserted_objects, function ( key, value ){
				
				
				var dx = value.global_position.x - this_floor._global_position.x;
				var dz = value.global_position.z - this_floor._global_position.z;
				
				
				console.info ("              dx");
				console.info ("              ");
				console.info ("              ");
				console.info ("              ");
				console.info ( dx );
				console.info ("              dz");
				console.info ("              ");
				console.info ("              ");
				console.info ("              ");
				console.info ( dz );
				
				
				
				
				var PARR1 = [];
				var PARR2 = [];
				
				
				
				var PARR1 = [ 

					new THREE.Vector3( 0 + dx - value.width/2, 0 - this_floor._thickness/2,  0 + dz + value.length/2 ),
					
					new THREE.Vector3( 0 + dx + value.width/2,  0 - this_floor._thickness/2, 0 + dz + value.length/2 ),
					
					new THREE.Vector3( 0 + dx + value.width/2, 0 - this_floor._thickness/2, 0 + dz - value.length/2 ),
					
					new THREE.Vector3( 0 + dx - value.width/2,  0 - this_floor._thickness/2, 0 + dz - value.length/2 )
					


				];
				
				
				var PARR1 = [ 

					new THREE.Vector3( 0 + dx - value.width/2, 0 + dz + value.length/2 , 0 - this_floor._thickness/2 ),
					
					new THREE.Vector3( 0 + dx + value.width/2, 0 + dz + value.length/2 , 0 - this_floor._thickness/2 ),
					
					new THREE.Vector3( 0 + dx + value.width/2, 0 + dz - value.length/2 , 0 - this_floor._thickness/2  ),
					
					new THREE.Vector3( 0 + dx - value.width/2, 0 + dz - value.length/2 ,  0 - this_floor._thickness/2 )
					


				];
				
				
				
				
				
				
				
				
				
				
				var PARR2 = [ 
					
					
					new THREE.Vector3( 0 + dx - value.width/2, 0 + this_floor._thickness/2 ,  0 + dz + value.length/2 ),
					
					new THREE.Vector3( 0 + dx + value.width/2, 0 + this_floor._thickness/2 ,  0 + dz + value.length/2 ),
					
					new THREE.Vector3( 0 + dx + value.width/2, 0 + this_floor._thickness/2 , 0 + dz - value.length/2 ),
					
					new THREE.Vector3( 0 + dx - value.width/2,  0 + this_floor._thickness/2, 0 + dz - value.length/2 )
					
				];
				
				
				var PARR2 = [ 
					
					
					new THREE.Vector3( 0 + dx - value.width/2, 0 + dz + value.length/2,  0 + this_floor._thickness/2 ),
					
					new THREE.Vector3( 0 + dx + value.width/2, 0 + dz + value.length/2 , 0 + this_floor._thickness/2 ),
					
					new THREE.Vector3( 0 + dx + value.width/2, 0 + dz - value.length/2 ,  0 + this_floor._thickness/2 ),
					
					new THREE.Vector3( 0 + dx - value.width/2,  0 + dz - value.length/2, 0 + this_floor._thickness/2 )
					
				];
				
				
				
				
				var fillersGeometry = new THREE.Geometry();

				this_floor.AddVertices ( fillersGeometry, PARR1, PARR2 );

				console.info ( "            fillersGeometry            " );	
				console.info ( fillersGeometry );	


				var face;


				for ( var i = 0; i < fillersGeometry.vertices.length; i+= 2 ){

					if ( i < fillersGeometry.vertices.length - 2 ){


						face = new THREE.Face3(i,i+2,i+3);
						face.normal.set(0,0,1);
						fillersGeometry.faces.push( face );

						//console.warn (face);


						face = new THREE.Face3(i,i+3,i+1);
						face.normal.set(0,0,1);
						fillersGeometry.faces.push( face );


					}

					else {
						
						
						var isRectangle = true;

						if ( isRectangle ){

							var face;

							face = new THREE.Face3(i,0,1);
							face.normal.set(0,0,1);
							fillersGeometry.faces.push( face );


							face = new THREE.Face3(i,1,i+1);
							face.normal.set(0,0,1);
							fillersGeometry.faces.push( face );
						}


					}



				}
				
				
				this_floor._fillers_geometry.push ( fillersGeometry );
				
				
				
			});
			
		
		
		
		},
	
		// Add vertices 
		// Add vertices sub function to constructFillerGeometry
	
		AddVertices: function ( geometry, array1, array2 ){
			
			for ( var i = 0 ; i < array1.length ; i++ ){
		
				geometry.vertices.push ( array1[i] );
				geometry.vertices.push ( array2[i] );

			}
			
		
		
		
		
		},
		
	
	
	
	
	
	
	
	
	
	
	
		
		// Construct meshes
	
		ConstructMeshes: function (){
		
			
			
			
			
			
			
			
			var this_floor = this;
			
			
			
			
			// Top surface mesh
			
			this_floor._top_surface_mesh = new THREE.Mesh ( this_floor._top_surface_geometry, this_floor.SetMaterial ( THREE.FrontSide ) );
			
			
			
			
			
			
			
			// Bottom surface mesh
			
			this_floor._bottom_surface_mesh = new THREE.Mesh ( this_floor._bottom_surface_geometry, this_floor.SetMaterial ( THREE.BackSide ) );
			
			
			
			
			
			
			// Front surface mesh
			
			this_floor._front_surface_mesh = new THREE.Mesh ( this_floor._front_surface_geometry, this_floor.SetMaterial ( THREE.FrontSide ) );
			
			
			
			
			
			
			// Back surface mesh
			
			this_floor._back_surface_mesh = new THREE.Mesh ( this_floor._back_surface_geometry, this_floor.SetMaterial ( THREE.BackSide ) );
			
			
			
			
			
			// Left surface mesh
			
			this_floor._left_surface_mesh = new THREE.Mesh ( this_floor._left_surface_geometry, this_floor.SetMaterial ( THREE.BackSide  ) );
			
			
			
			
			
			
			// Right surface mesh
			
			this_floor._right_surface_mesh = new THREE.Mesh ( this_floor._right_surface_geometry, this_floor.SetMaterial ( THREE.BackSide  ) );
			
			
			
			
			
			// Fillers meshes
			
			console.info ( "this_floor._fillers_geometry" );
			console.info ( " " );
			console.info ( " " );
			console.info ( " " );
			console.info ( this_floor._fillers_geometry );
			
			
			$.each ( this_floor._fillers_geometry, function ( key, value ){
				
				
				
				var fillerMesh = new THREE.Mesh( value, this_floor.SetMaterial ( THREE.DoubleSide ) );
				
				
				this_floor._fillers_meshes.push ( fillerMesh );
				
				
				
				
				
				
			});
			
			// console.info ( "this_floor._fillers_meshes" );
			// console.info ( " " );
			// console.info ( " " );
			// console.info ( " " );
			// console.info ( this_floor._fillers_meshes );
			
			
			
			
			
			
			
		
		
		},
		
	
	
	
	
	
	
	
	
	
	
		// Construct object3D
	
		ConstructObject3D: function (){
			
			
			
			
			
			var this_floor = this;
			
			var object3d_temp = new THREE.Object3D();
			
			
			
			
			
			
			
			
			// Set position of top surface mesh
			
			this_floor._top_surface_mesh.position.z += this_floor._thickness/2 ;
			
			
			
			
			// Add top surface mesh to object3d
			
			object3d_temp.add ( this_floor._top_surface_mesh );
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			// Set position of bottom surface mesh
			
			
			this_floor._bottom_surface_mesh.position.z -= this_floor._thickness/2;
			
			
			
			
			
			
			// Add bottom surface mesh to object3d
			
			
			object3d_temp.add ( this_floor._bottom_surface_mesh );
			
			
			
			
			
			
			
			
			
			
			
			
			// Set position of front surface mesh
			
			
			//this_floor._front_surface_mesh.position.z += this_floor._thickness/2 *12;
			
			this_floor._front_surface_mesh.rotation.x = 180 * Math.PI / 360;
			
			this_floor._front_surface_mesh.position.y = - this_floor._length / 2;
			
			
			// Add front surface mesh to object3d
			
			
			object3d_temp.add ( this_floor._front_surface_mesh );
			
			
			
			
			
			
			
			
			
			
			// Set position of back surface mesh
			
			
			//this_floor._front_surface_mesh.position.z += this_floor._thickness/2 *12;
			
			this_floor._back_surface_mesh.rotation.x = 180 * Math.PI / 360;
			
			this_floor._back_surface_mesh.position.y = this_floor._length / 2;
			
			
			// Add front surface mesh to object3d
			
			
			object3d_temp.add ( this_floor._back_surface_mesh );
			
			
			
			
			
			
			
			
			
			
			
			// Set position of left surface mesh
			
			
			//this_floor._front_surface_mesh.position.z += this_floor._thickness/2 *12;
			
			this_floor._left_surface_mesh.rotation.x = 180 * Math.PI / 360;
			this_floor._left_surface_mesh.rotation.y = 180 * Math.PI / 360;
			
			this_floor._left_surface_mesh.position.x = - this_floor._width / 2;
			
			
			// Add front surface mesh to object3d
			
			
			object3d_temp.add ( this_floor._left_surface_mesh );
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			// Set position of right surface mesh
			
			
			//this_floor._front_surface_mesh.position.z += this_floor._thickness/2 *12;
			
			this_floor._right_surface_mesh.rotation.x = 180 * Math.PI / 360;
			this_floor._right_surface_mesh.rotation.y = - 180 * Math.PI / 360;
			
			this_floor._right_surface_mesh.position.x = this_floor._width / 2;
			
			
			// Add front surface mesh to object3d
			
			
			object3d_temp.add ( this_floor._right_surface_mesh );
			
			
			
			
			
			
			
			
			// Add fillers surface meshes to object3d
			
			
			$.each ( this_floor._fillers_meshes, function ( key, value ){
				
				
				object3d_temp.add ( value );
				
				
				
				
			} );
			
			
			
			
			
			
			
			
			
//			alert ( this_floor._global_position.x );
//			
//			alert ( this_floor._global_position.y );
//			alert ( this_floor._global_position.z);
//			
			
			object3d_temp.position.x = this_floor._global_position.x;
			object3d_temp.position.y = this_floor._global_position.y;
			
			
			object3d_temp.position.z = this_floor._global_position.z ;
			
			
			
			object3d_temp.rotation.x = 		180 * Math.PI / 360;								
			
			
			this_floor._object3d = object3d_temp;
			
			
			this_floor._object3d._aux_type = 1;
			this_floor._object3d._aux_id = this._id;
		
		
		},
	
	
	
	
	
	
		// Add to scene
	
		AddToScene: function (){
		
			Kernel._active_project._scene.add( this._object3d );
			
		},
	
	
	
	
	
	
	
	
	
	
	
	
	
	
		// Add to objects
	
		AddToObjects: function (){
		
			//Kernel._active_project._objects.push ( this._object3d );
		
			Kernel._active_project._objects.push( this._top_surface_mesh );
			
			
			Kernel._active_project._objects.push( this._bottom_surface_mesh );
			
			
		},
	
		
	
	
	
	
	
	
	
	
	
		
		// Construct edge helpers
	
		ConstructEdgeHelpers: function (){
			
			
			
			
		
			this._top_surface_mesh_edge_helper = new Kernel.Geometry.Auxiliary.EdgeHelper ( this._top_surface_mesh, 0x707070 );
			
			this._bottom_surface_mesh_edge_helper = new Kernel.Geometry.Auxiliary.EdgeHelper ( this._bottom_surface_mesh, 0x707070 );
			
			
			this._front_surface_mesh_edge_helper = new Kernel.Geometry.Auxiliary.EdgeHelper ( this._front_surface_mesh, 0x707070 );
			
			this._back_surface_mesh_edge_helper = new Kernel.Geometry.Auxiliary.EdgeHelper ( this._back_surface_mesh, 0x707070 );
			
			this._left_surface_mesh_edge_helper = new Kernel.Geometry.Auxiliary.EdgeHelper ( this._left_surface_mesh, 0x707070 );
			
			this._right_surface_mesh_edge_helper = new Kernel.Geometry.Auxiliary.EdgeHelper ( this._right_surface_mesh, 0x707070 );
			
			$.each ( this._fillers_meshes, function ( key, value ){
				
				
				new Kernel.Geometry.Auxiliary.EdgeHelper ( value, 0x707070 );
				
				
			});
			
		
		},
		
		
	
	
		// Set material
		
		SetMaterial: function ( viewside ){

			//return new THREE.MeshLambertMaterial( { color: 0xE4F8FF, side: viewside });
			
			return new THREE.MeshLambertMaterial( { color: 0xFFFFFF, side: viewside,  
				
				polygonOffset: true,
		        polygonOffsetFactor: 1,
		        polygonOffsetUnits: 3

			});

		}
	
		
	
	
		
}