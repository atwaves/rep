Kernel.Geometry.Constructive.Wall = function ( properties ){
	
	
	this._id = properties.id;
	this._name = properties.name;


	// Тип стены [ несущая - межкомнатная - перегородка ]
	this._type = properties.type;


	// Угол поворота стены
	this._angle = properties.angle;


	// ??
	this._segmentation_type = properties.segmentation_type;

	//console.info (this._segmentation_type);

	// Толщина стены
	this._thickness = properties.thickness;




	this._inside_surface_height = properties.inside_surface_height;
	this._outside_surface_height = properties.outside_surface_height;


	this._inside_surface_length = properties.inside_surface_length;
	this._outside_surface_length = properties.outside_surface_length;



	// Уровень стены
	this._level = properties.level;
	this._level_height = Kernel._active_project.GetLevelPosition ( this._level );  



	// Местоположение в глобальной системе координат - центр стены [ z = level + wall height ]
	this._global_position = properties.global_position;


	this._inserted_objects_ids = properties.inserted_objects;

	// Встроенные объекты стены [ двери, окна, вентиляционные отверстия, отверстия под трубы ]
	this._inserted_objects = [];

//	this.inserted_objects_ids = [
//	
//		{ 
//			object_type: null,
//		 	id: null
//		},
//		
//		{ 
//			object_type: null,
//		 	id: null
//		},
//		
//		{ 
//			object_type: null,
//		 	id: null
//		},
//	
//	
//	];


	this._object3d = new THREE.Object3D();


	this._surfaces_shapes = [];


	this._surfaces_geometry = [];


	this._surfaces_meshes = [];






	// SHAPES
	this._inside_surface_shape;
	this._outside_surface_shape;


	this._top_surface_shape;
	this._bottom_surface_shape;

	this._left_surface_shape;
	this._right_surface_shape;





	// GEOMETRY
	this._inside_surface_geometry;
	this._outside_surface_geometry;


	this._top_surface_geometry;
	this._bottom_surface_geometry;

	this._left_surface_geometry;
	this._right_surface_geometry;

	this._fillers_geometry = [];




	// MESHES
	this._inside_surface_mesh;
	this._outside_surface_mesh;


	this._top_surface_mesh;
	this._bottom_surface_mesh;

	this._left_surface_mesh;
	this._right_surface_mesh;


	this._fillers_meshes = [];


	
	
	
	// OFFSET
	// SWITCH WALL SEGMENTATION TYPE

	this._surface_diff = this._outside_surface_length - this._inside_surface_length;
	
	
	
	this._surface_offset = 0;



	switch ( this._segmentation_type ){

		case 1: { 

			break;
		}



		case 2: { break;}

		case 3: { break;}
		case 4: { break;}

		case 5: { 

			this._surface_offset -= this._surface_diff/2;

			break;
		}

		case 6: { 

			this._surface_offset += this._surface_diff/2;


			break;
		}

	}

	//console.warn ( "__________________________________________OFFSET " + this._surface_offset );


	
	
	
	
	
	
	
	
	
	
	
	
	// Get inserted objects
	
	this._inserted_objects = [];
	
	
	
//	console.info ( "this WALL"  );
//	console.info ( this );
//	
//	
//	console.info ( " this._inserted_objects " );
//	console.info ( this._inserted_objects );
	
	//this._inserted_objects = [];
	
	
	
	
	// Construct wall
	
	this.Construct ();
	
	
	
	
	return this;

}




// Prototype methods

Kernel.Geometry.Constructive.Wall.prototype = {
    
        constructor: Kernel.Geometry.Constructive.Wall,
    
	
		Boom: function (){
		
			alert ("Boom");
		
		
		},
	
	
		// Main construct method
	
		Construct: function (){
			
			
			//alert ( " Construct " );
			
			
			
			
			
			
			// Set GLOBAL Y - [VERTICAL] POSITION
			
			this._global_position.y = Kernel._active_project.GetLevelPosition ( this._level ) + this._outside_surface_height / 2;
			
			
			
			
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
			
			
				this.ConstructFillerGeometry ();
			
			
			
			}
			
			
			
			// Construct meshes
			
			this.ConstructMeshes ();
			
			
			
			
			
			
			
			
			
			
			
			
			// Construct THREE.Object3D
			
			this.ConstructObject3D ();
			
			
			
			
			
			
			
			
			
			// Add to project scene
			
			this.AddToScene ();
			
			this.AddToObjects ();
			

			
			
			
			/// BLAKLBKAKKGAKJFJAJFDAJFJAJFJAJ
			
			// Construct edge helpers
			
			
			this.ConstructEdgeHelpers ();
			
			this.ConstructVolumeText ();

		
		},
	
		
	
	
	
		
		// Construct shapes for each surface
		
		ConstructShapes: function (){
			
			
			var this_wall = this;
			
			
			var isl = this_wall._inside_surface_length;
			var ish = this_wall._inside_surface_height;

			var osl = this_wall._outside_surface_length;
			var osh = this_wall._outside_surface_height;

			var th = this_wall._thickness;




			// Init inside & outside surfaces shapes - THREE.SHAPE



			// Construct inside surface shape

			var iss = new THREE.Shape();

			iss.moveTo( -isl/2, ish/2 );
			iss.lineTo( isl/2, ish/2 );
			iss.lineTo( isl/2, -ish/2 );
			iss.lineTo( -isl/2, -ish/2 );

			iss.lineTo( -isl/2, ish/2 );



			// Construct outside surface shape

			var oss = new THREE.Shape();

			oss.moveTo( -osl/2, osh/2 );
			oss.lineTo( osl/2, osh/2 );
			oss.lineTo( osl/2, -osh/2 );
			oss.lineTo( -osl/2, -osh/2 );

			oss.lineTo( -osl/2, osh/2 );


			// Inside & outside surfaces shapes
			
			if ( this._inserted_objects.length ) {
				
				$.each ( this._inserted_objects, function ( key, value ){
					
					iss.holes.push ( this_wall.AddHolePath ( value, 'inside' ) );
					oss.holes.push ( this_wall.AddHolePath ( value, 'outside' ) );

				});	

			}

			this._inside_surface_shape = iss;

			this._outside_surface_shape = oss;
	
		},
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
		// Special
		// Construct top surface
		
		
		
		ConstructTopShape: function ( ism_pos, osm_pos ){
			
			var point1 = { x: null, y: null };
			var point2 = { x: null, y: null };
			var point3 = { x: null, y: null };
			var point4 = { x: null, y: null };
			
			point1.x = ism_pos.x - this._inside_surface_length/2;
			point1.y = ism_pos.y;
			
			point2.x = ism_pos.x + this._inside_surface_length/2;
			point2.y = ism_pos.y;
			
			point3.x = osm_pos.x + this._outside_surface_length/2;
			point3.y = osm_pos.y;
			
			point4.x = osm_pos.x - this._outside_surface_length/2;
			point4.y = osm_pos.y;
			
			
			
			console.info ("                              Points");
			console.info ("                              ");
			console.info ("                              ");
			console.info ("                              ");
			
			
			console.info (this._inside_surface_length );
			console.info (point1);
			console.info (point2);
			console.info (point3);
			console.info (point4);
			
			console.info ("                              ");
			console.info ("                              ");
			console.info ("                              ");
			
			
			// Construct top surface shape
			
			var tss = new THREE.Shape();
			
			
			
			

			tss.moveTo( point1.x, point1.y );
			tss.lineTo( point2.x, point2.y );
			tss.lineTo( point3.x, point3.y );
			tss.lineTo( point4.x, point4.y );

			//tss.lineTo( point1.x, point1.y );
			
			
			
			
			this._top_surface_shape = tss;
			
			
			
			
		},
	
	ConstructTopGeometry: function ( top_shape ){
		
		// Construct inside surface geometry from shape
			
		this._top_surface_geometry = new THREE.BufferGeometry().fromGeometry ( new THREE.ShapeGeometry( this._top_surface_shape ) );
		
		
		
	},
	
	
	ConstructTopMesh: function ( top_geometry ){
		
		this._top_surface_mesh = new THREE.Mesh ( this._top_surface_geometry, this.SetMaterial ( THREE.FrontSide ) );
		
		
	},
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
		ConstructGeometry: function (){

			// Construct inside surface geometry from shape
			
			this._inside_surface_geometry = new THREE.BufferGeometry().fromGeometry ( new THREE.ShapeGeometry( this._inside_surface_shape ) );
			

			// Construct outside surface geometry from shape
		
			this._outside_surface_geometry = new THREE.BufferGeometry().fromGeometry ( new THREE.ShapeGeometry( this._outside_surface_shape ) );


		},
		
		
		
		
		
		
		
		
		
	
		// Construct geometry - Sub method Construct filler geometry
	
		ConstructFillerGeometry: function ( ){
			
			
			var this_wall = this;
			

			$.each ( this._inserted_objects, function ( key, value ){
			
				if ( value.global_type == 1 || value.global_type == 2 ){
				
					var PARR1 = [];
					var PARR2 = [];


					var dx = this_wall._global_position.x - value.global_position.x;
					var dy = this_wall._global_position.y - value.global_position.y;
					var dz = this_wall._global_position.z - value.global_position.z;
					

					
					var XZ_DIFF = Math.sqrt ( Math.pow( dx, 2) + Math.pow ( dz, 2) ) ;
					


					
					// CHECK FOR + -
					
					
					var iogpx = value.global_position.x;
					var iogpz = value.global_position.z;

					var wgpx = this_wall._global_position.x;
					var wgpz = this_wall._global_position.z;





					// Angle is -90
					
					if ( this_wall._angle == - 90 ){

						if ( iogpz < wgpz ){
							XZ_DIFF =  - XZ_DIFF;
						}

						if ( iogpz > wgpz ){
							XZ_DIFF =  XZ_DIFF;
						}	
					}
					
					
					
					
					
					// Angle is 270
					
					if ( this_wall._angle == 270 ){
						
						if ( iogpz < wgpz ){
							XZ_DIFF =  - XZ_DIFF;
						}

						else if ( iogpz > wgpz ){
							XZ_DIFF =  XZ_DIFF ;
						}
					}
					
					
					
					
					// Angle is "90" or "-270"
					
					if ( this_wall._angle == 90 || this_wall._angle == - 270 ){
						
						if ( iogpz < wgpz ){
							XZ_DIFF =  XZ_DIFF;
						}

						else if ( iogpz > wgpz ){
							XZ_DIFF = - XZ_DIFF;
						}

					}




					// Angle is -180

					if ( this_wall._angle == -180 ){

						if ( iogpx < wgpx ){
							XZ_DIFF =  - XZ_DIFF;
						}

						else if ( iogpx > wgpx ){
							XZ_DIFF = XZ_DIFF;
						}
					}




					// Angle is 0
			
					if ( this_wall._angle == 0 ){
						
						if ( iogpx < wgpx ){
							XZ_DIFF = -XZ_DIFF ;
						}
		
						else if ( iogpx > wgpx ){
							XZ_DIFF = XZ_DIFF ;
						}
					}
				
				
					
					// Angle is 180
					
					if ( this_wall._angle == 180 ){
						
						if ( iogpx < wgpx ){
							XZ_DIFF = XZ_DIFF ;
						}
		
						else if ( iogpx > wgpx ){
							XZ_DIFF = - XZ_DIFF ;
						}		
					}
					

					var PARR1 = [ 

						new THREE.Vector3( 0 + XZ_DIFF - value.width/2, 0 - dy - value.height/2, - this_wall._thickness/2 ),

						new THREE.Vector3( 0 + XZ_DIFF - value.width/2, 0 - dy + value.height/2, - this_wall._thickness/2 ),	

						new THREE.Vector3( 0 + XZ_DIFF + value.width/2, 0 - dy + value.height/2, - this_wall._thickness/2 ),

						new THREE.Vector3( 0 + XZ_DIFF + value.width/2, 0 - dy - value.height/2, - this_wall._thickness/2 )

					];
					
					
					
					var PARR1 = [ 

						new THREE.Vector3( 0 + XZ_DIFF - value.width/2, - this_wall._thickness/2, - 0 - dy - value.height/2 ),

						new THREE.Vector3( 0 + XZ_DIFF - value.width/2, - this_wall._thickness/2, 0 - dy + value.height/2 ),	

						new THREE.Vector3( 0 + XZ_DIFF + value.width/2, - this_wall._thickness/2, 0 - dy + value.height/2 ),

						new THREE.Vector3( 0 + XZ_DIFF + value.width/2, - this_wall._thickness/2, 0 - dy - value.height/2 )

					];
					
					
					
					
					

					var PARR2 = [ 

						new THREE.Vector3( 0 + XZ_DIFF - value.width/2, 0 - dy - value.height/2, this_wall._thickness/2 ),

						new THREE.Vector3( 0 + XZ_DIFF - value.width/2, 0 - dy + value.height/2, this_wall._thickness/2 ),	

						new THREE.Vector3( 0 + XZ_DIFF + value.width/2, 0 - dy + value.height/2, this_wall._thickness/2 ),

						new THREE.Vector3( 0 + XZ_DIFF + value.width/2, 0 - dy - value.height/2, this_wall._thickness/2 )



					];



					var PARR2 = [ 

						new THREE.Vector3( 0 + XZ_DIFF - value.width/2, this_wall._thickness/2, 0 - dy - value.height/2 ),

						new THREE.Vector3( 0 + XZ_DIFF - value.width/2, this_wall._thickness/2, 0 - dy + value.height/2 ),	

						new THREE.Vector3( 0 + XZ_DIFF + value.width/2, this_wall._thickness/2, 0 - dy + value.height/2 ),

						new THREE.Vector3( 0 + XZ_DIFF + value.width/2, this_wall._thickness/2, 0 - dy - value.height/2  )



					];
					
					
					
					var fillerGeometry = new THREE.Geometry();

					this_wall.AddVertices ( fillerGeometry, PARR1, PARR2 );


					


					var face;


					for ( var i = 0; i < fillerGeometry.vertices.length; i+= 2 ){

						if ( i < fillerGeometry.vertices.length - 2 ){


							face = new THREE.Face3(i,i+2,i+3);
							face.normal.set(0,0,1);
							fillerGeometry.faces.push( face );

							//console.warn (face);


							face = new THREE.Face3(i,i+3,i+1);
							face.normal.set(0,0,1);
							fillerGeometry.faces.push( face );


						}

						else {
							
							
							var isRectangle = true;



							// Construct bottom filler mesh
							
							// if above floor height > 0 -> construct bottom filler mesh
							
							
							
							$.each ( this_wall._inserted_objects, function ( key, value ){
								
								//if ( this_wall._level_height >= value.)
							
								
								
							});
							
							
							
							
							
							
							
							
							
								
							if ( isRectangle ){

								var face;

								face = new THREE.Face3(i,0,1);
								face.normal.set(0,0,1);
								fillerGeometry.faces.push( face );


								face = new THREE.Face3(i,1,i+1);
								face.normal.set(0,0,1);
								fillerGeometry.faces.push( face );
							}


						}



					}
					
					
					this_wall._fillers_geometry.push ( fillerGeometry );

				}
			
			
			});
			
			

		
		},
		
		
		
		
		
		
		
		
		
		
		
		
		
		
	
		ConstructMeshes: function (){
			
			
			
			var this_wall = this;
		
			this_wall._inside_surface_mesh = new THREE.Mesh ( this._inside_surface_geometry, this_wall.SetMaterial ( THREE.FrontSide ) );
			this_wall._outside_surface_mesh = new THREE.Mesh ( this._outside_surface_geometry, this_wall.SetMaterial ( THREE.BackSide ) );
			
			
			var fillerMaterial = new THREE.MeshLambertMaterial( { color: 0xfafafa, wireframe: false, transparent: false, opacity: 1, side: THREE.BackSide } );
			
			
			
			$.each ( this_wall._fillers_geometry, function ( key, value ){
				
				
				
				var fillerMesh = new THREE.Mesh( value, this_wall.SetMaterial ( THREE.BackSide ) );
				
				
				//fillerMesh.rotation.x = 90 * Math.PI / 180;
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				var x = new Kernel.Geometry.Auxiliary.EdgeHelper ( fillerMesh, 0x707070 );
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				

//				fillerMesh.position.x = 0;
//				fillerMesh.position.y = 0;
				//fillerMesh.position.z += this_wall._thickness / 2;
				
				this_wall._fillers_meshes.push ( fillerMesh );
				
			
			});
			
			
			
			
		
		
		},
	
	
	
		SetMaterial: function ( viewside ){
			
			
			

			return new THREE.MeshLambertMaterial( { color: 0xFFFFFF, side: viewside,  
				
				
				
				
				// polygonOffset: true,
		        // polygonOffsetFactor: 0.1,
		        // polygonOffsetUnits: 2.0
				
				polygonOffset: true,
		        polygonOffsetFactor: 1,
		        polygonOffsetUnits: 3
				
				
		
		
		});
		
		
		
		
		


		},
	
	
		ConstructEdgeHelpers: function (){
		
			this._inside_surface_mesh_edge_helper = new Kernel.Geometry.Auxiliary.EdgeHelper ( this._inside_surface_mesh, 0x707070 );	
			this._outside_surface_mesh_edge_helper = new Kernel.Geometry.Auxiliary.EdgeHelper ( this._outside_surface_mesh, 0x707070 );
		
		},

		ConstructObject3D: function (){
			
			
			var this_wall = this;

		  	var object3d_temp = new THREE.Object3D();


			// ADD INSIDE SURFACE MESH



			//console.error ( this._inside_surface_mesh.position );

			this._inside_surface_mesh.position.y -= this._thickness/2;
			this._inside_surface_mesh.rotation.x = 90 * Math.PI/180;


			object3d_temp.add ( this._inside_surface_mesh );


			// ADD OUTSIDE SURFACE MESH
			this._outside_surface_mesh.position.y += this._thickness/2;
			this._outside_surface_mesh.rotation.x = 90 * Math.PI/180;

			object3d_temp.add ( this._outside_surface_mesh );



			// FILLERS MESHES


			//console.info ( this._fillers_meshes );

			if ( this._fillers_meshes ){

				$.each ( this._fillers_meshes, function ( key, value ){


					
					//alert (" FILLERS MESHES ");
					
					
					// console.info ( "                              value" );
					// console.info ( "                              value" );
					// console.info ( "                              value" );
					// console.info ( "                              value" );
					// console.info ( "                              value" );
					// console.info ( value.name = "_FILLER_MESH_" );
					// console.info ( "                              value" );
					// console.info ( "                              value" );
					// console.info ( "                              value" );
					// console.info ( "                              value" );
					// console.info ( "                              value" );
					
					
					
					//value.rotation.y = 90 * Math.PI/180;
					
					
					

					//value.position.z += this_wall._thickness/2;

					object3d_temp.add ( value );


				});


			}
			
			
			
			// console.info ( "                              OBJECT3D" );
			// console.info ( "                              value" );
			// console.info ( "                              value" );
			// console.info ( "                              value" );
			// console.info ( "                              value" );
			// console.info ( object3d_temp );
			// console.info ( "                              value" );
			// console.info ( "                              value" );
			// console.info ( "                              value" );
			// console.info ( "                              value" );
			// console.info ( "                              value" );
			
			
			



			// SWITCH WALL SEGMENTATION TYPE

			var diff = this._outside_surface_length - this._inside_surface_length;
			var offset = 0;



			switch ( this._segmentation_type ){

				case 1: { 





					break;
				}



				case 2: { break;}

				case 3: { break;}
				case 4: { break;}

				case 5: { 

					offset -= diff/2;
					//alert (" STYPE = 5" );



					break;
				}

				case 6: { 

					offset += diff/2;
					//alert (" STYPE = 6" );

					break;
				}

			}




			this._inside_surface_mesh.position.x += offset;		

			
			
			
			
			
			
			// Construct top surfaces
			
			this.ConstructTopShape ( this._inside_surface_mesh.position, this._outside_surface_mesh.position );
			this.ConstructTopGeometry ( this._top_surface_shape );
			this.ConstructTopMesh ( this._top_surface_geometry );
			
			
			object3d_temp.add ( this._top_surface_mesh  );
			this._top_surface_mesh.position.z += this._inside_surface_height/2;
			
			
			
			
			
			
			
			
			
			
			// MODIFY FILLERS MESHES
			
			
			
			
			
			
			
			

			//object3d_temp.add ( this.ConstructVolumeText ());


			
			object3d_temp.position.x = this._global_position.x;
			object3d_temp.position.y = Kernel._active_project.GetLevelPosition ( this._level ) + this._outside_surface_height / 2;
			object3d_temp.position.z = this._global_position.z;
			
			
			
			
			object3d_temp.rotation.z = this._angle * Math.PI/180;
			
			
			
			object3d_temp.rotation.x = -90 * Math.PI/180;
			//object3d_temp.rotation.z = 180 * Math.PI/180;
			
			
			
			
			
			this._object3d = object3d_temp;
			
			
			this._object3d._aux_type = 1;
			this._object3d._aux_id = this._id;
			
			// var axisHelper = new THREE.AxisHelper( 1500 );
			// axisHelper.position = this._object3d.position;
			// Kernel._active_project._scene.add( axisHelper );
			
			//return object3d_temp;
		
		
		},
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
		// Add hole path to shape
		
		AddHolePath: function( inserted_object, surface ){
			 
			
			var dx = this._global_position.x - inserted_object.global_position.x;
			var dz = this._global_position.z - inserted_object.global_position.z;
		
		
		
			// Horizontal position difference	
			
			var XZ_DIFF = Math.sqrt ( Math.pow( dx, 2) + Math.pow ( dz, 2));
			
		
			console.info ( " Diff in plane " );
			console.info ( XZ_DIFF );
		
		
			var iogpx = inserted_object.global_position.x;
			var iogpz = inserted_object.global_position.z;
			
			var wgpx = this._global_position.x;
			var wgpz = this._global_position.z;
		
		
		
			// Set by the angle
			// Angle is -90
			
			if ( this._angle == - 90 ){
			
				if ( iogpz < wgpz ){
					XZ_DIFF =  - XZ_DIFF;
				}
				
				if ( iogpz > wgpz ){
					XZ_DIFF =  XZ_DIFF ;
				}

			}
			
			
			
			
			// Angle is 270
			
			if ( this._angle == 270 ){
				
				if ( iogpz < wgpz ){
					XZ_DIFF =  - XZ_DIFF;
				}

				else if ( iogpz > wgpz ){
					XZ_DIFF =  XZ_DIFF ;
				}
			}
			
			
			
			
			
			// Angle is 90, 270, -270
			
			if ( this._angle == 90 || this._angle == - 270 ){
				
				if ( iogpz < wgpz ){
					XZ_DIFF =  XZ_DIFF ;
				}

				else if ( iogpz > wgpz ){
					XZ_DIFF =  - XZ_DIFF ;
				}

			}
			
			
			
			
			// Angle is -180
			
			if ( this._angle == -180 ){
				
				if ( iogpx < wgpx ){
					XZ_DIFF =  - XZ_DIFF ;
				}

				else if ( iogpx > wgpx ){
					XZ_DIFF = XZ_DIFF ;
				}
			}
			
			
			
			// Angle is 0
			
			if ( this._angle == 0 ){
				
				if ( iogpx < wgpx ){
					XZ_DIFF = - XZ_DIFF ;
				}

				else if ( iogpx > wgpx ){
					XZ_DIFF = XZ_DIFF ;
				}
			}
		
		
			
			// Angle is 180
			
			if ( this._angle == 180 ){
				
				if ( iogpx < wgpx ){
					XZ_DIFF = XZ_DIFF ;
				}

				else if ( iogpx > wgpx ){
					XZ_DIFF = - XZ_DIFF ;
				}
				
			}
		
		
		
		
			// Vertical position difference	
		
			var wall_y_center = this._level_height + this._inside_surface_height/2;
			var dy = wall_y_center - inserted_object.global_position.y;
		
			
			
			var INS_OBJ_WIDTH = inserted_object.width;
			var INS_OBJ_HEIGHT = inserted_object.height;
			
			
			
			
			
			// Check surface to offset
			
			var SURFACE_OFFSET = 0;
			
			if ( surface == 'inside' ){
				
				SURFACE_OFFSET = this._surface_offset;
		
			}
			
		
			var holePoints = [
				
				
				// Bottom points
				new THREE.Vector2( 0 + XZ_DIFF - INS_OBJ_WIDTH/2 - SURFACE_OFFSET , 0 - dy - INS_OBJ_HEIGHT/2 ), 
				new THREE.Vector2( 0 + XZ_DIFF + INS_OBJ_WIDTH/2 - SURFACE_OFFSET, 0 - dy - INS_OBJ_HEIGHT/2 ),
				
				
				// Top points
				new THREE.Vector2( 0 + XZ_DIFF + INS_OBJ_WIDTH/2 - SURFACE_OFFSET, 0 - dy + INS_OBJ_HEIGHT/2 ),
				new THREE.Vector2( 0 + XZ_DIFF - INS_OBJ_WIDTH/2 - SURFACE_OFFSET, 0 - dy + INS_OBJ_HEIGHT/2 )

			];
			
	

			return new THREE.Shape ( holePoints );
			

			

		
		},
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
	
		// Add vertices sub function to constructFillerGeometry
	
		AddVertices: function ( geometry, array1, array2 ){
			
			for ( var i = 0 ; i < array1.length ; i++ ){
		
				geometry.vertices.push ( array1[i] );
				geometry.vertices.push ( array2[i] );

			}
			
		
		
		
		
		},
	
	
	
	
	
	
	
	
	
	
	
	
	
	
		AddToScene: function (){
		
			Kernel._active_project._scene.add( this._object3d );
			
		},
	
		AddToObjects: function (){
		
			//Kernel._active_project._objects.push ( this._object3d );
		
			Kernel._active_project._objects.push( this._inside_surface_mesh );
			
			
			Kernel._active_project._objects.push( this._outside_surface_mesh );
			
			
		},
	
	
	
	
	
	
	
	
	// AUXILIARY FUNCTIONS
	
	
	// construct volume text
	
	ConstructVolumeText: function ( ){
		
		
		
		
		var text = this._id,

				height = 10,
				size = 50,
				hover = 10,

				curveSegments = 4,

				bevelThickness = 2,
				bevelSize = 1.5,
				bevelSegments = 3,
				bevelEnabled = true,

				font = "droid sans", // helvetiker, optimer, gentilis, droid sans, droid serif
				weight = "normal", // normal bold
				style = "normal"; // normal italic

			var mirror = true;

			var fontMap = {

				"helvetiker": 0,
				"optimer": 1,
				"gentilis": 2,
				"droid sans": 3,
				"droid serif": 4

			};

			var weightMap = {

				"normal": 0,
				"bold": 1

			};
		
		
		
		
		
		
		
	
		textGeo = new THREE.TextGeometry( text, {

					size: size,
					height: height,
					curveSegments: curveSegments,

					font: font,
					weight: weight,
					style: style,

					bevelThickness: bevelThickness,
					bevelSize: bevelSize,
					bevelEnabled: bevelEnabled,

					material: 0,
					extrudeMaterial: 1

				});

				textGeo.computeBoundingBox();
				textGeo.computeVertexNormals();

				// "fix" side normals by removing z-component of normals for side faces
				// (this doesn't work well for beveled geometry as then we lose nice curvature around z-axis)

				if ( ! bevelEnabled ) {

					var triangleAreaHeuristics = 0.1 * ( height * size );

					for ( var i = 0; i < textGeo.faces.length; i ++ ) {

						var face = textGeo.faces[ i ];

						if ( face.materialIndex == 1 ) {

							for ( var j = 0; j < face.vertexNormals.length; j ++ ) {

								face.vertexNormals[ j ].z = 0;
								face.vertexNormals[ j ].normalize();

							}

							var va = textGeo.vertices[ face.a ];
							var vb = textGeo.vertices[ face.b ];
							var vc = textGeo.vertices[ face.c ];

							var s = THREE.GeometryUtils.triangleArea( va, vb, vc );

							if ( s > triangleAreaHeuristics ) {

								for ( var j = 0; j < face.vertexNormals.length; j ++ ) {

									face.vertexNormals[ j ].copy( face.normal );

								}

							}

						}

					}

				}

				var centerOffset = -0.5 * ( textGeo.boundingBox.max.x - textGeo.boundingBox.min.x );
		
		
		
		var material = new THREE.MeshLambertMaterial( { color: 0x000000, wireframe: false, transparent: false, opacity: 1, side: THREE.DoubleSide } );
		
		
		
		

		textMesh1 = new THREE.Mesh( textGeo, material );
		
		
		
		//console.info ( this._level_height );

		textMesh1.position.x = this._global_position.x;
		textMesh1.position.y = this._level_height + this._outside_surface_height;
		textMesh1.position.z = this._global_position.z;

		textMesh1.rotation.x = 0;
		textMesh1.rotation.y = Math.PI * 2;
		
		
		
		
		
		
		
		
//		var textShapes = THREE.FontUtils.generateShapes( text, options );
//		var text = new THREE.ShapeGeometry( textShapes );
//		var textMesh = new THREE.Mesh( text, new THREE.MeshBasicMaterial( { color: 0xff0000 } ) ) ;
//		
//		
//		
		Kernel._active_project._scene.add( textMesh1 );

		
		//return textMesh1;
		
		
		
		
		
		
		
	
	
	}
    


}













