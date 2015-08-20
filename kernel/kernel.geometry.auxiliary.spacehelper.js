Kernel.Geometry.Auxiliary.SpaceHelper = function ( points, levelHeight, height, color ){
	
	
	this._bottom_shape;
	this._bottom_geometry;
	this._bottom_mesh;
	
	this._object3d = new THREE.Object3D();
	
	this._points = points;
	
	
	this._color;
	this._edge_helper_mesh;
	this._wfh;
	
	this._level_height = levelHeight;
	this._height = height;
	
	this._color = color;
	
	

	this.Construct();
	this.AddToScene();

	return this;
	
	
}


// Edge helper prototypes
Kernel.Geometry.Auxiliary.SpaceHelper.prototype = {
    
        constructor: Kernel.Geometry.Auxiliary.SpaceHelper,
	
		// Construct
		Construct: function ( ){
			
			this.ConstructBottomShape();
			this.ConstructBottomGeometry();
			this.ConstructBottomMesh();
			this.ConstructObject3D();
			this.AddToScene();
			
			
			
		},
		
		
		
		
		
		
		
		
		
		
		ConstructBottomShape: function (){
			
			
			
			var bs = new THREE.Shape();
			
			$.each ( this._points, function ( key, value ){
				
				if ( key == 0 ){
					
					bs.moveTo( value.x, value.z );
					
				}
				
				bs.lineTo( value.x, value.z );
				
				
				
				
			});
			
			
			this._bottom_shape = bs;

			
		},
		
		ConstructBottomGeometry: function (){
			
			this._bottom_geometry = new THREE.BufferGeometry().fromGeometry ( new THREE.ShapeGeometry( this._bottom_shape ) );
			
		},
		
		
		ConstructBottomMesh: function (){
			
			
			console.info ( "                                         this._bottom_geometry" );
			
			console.info ( this._bottom_geometry );
			
			
			this._bottom_mesh = new THREE.Mesh ( this._bottom_geometry, this.SetMaterial ( THREE.DoubleSide ) );
			
		},
		
		
		ConstructObject3D: function (){
			
			
			this._bottom_mesh.rotation.x = 180 * Math.PI/360;
			// this
			
			this._bottom_mesh.position.y = this._level_height;
			
			this._object3d.add ( this._bottom_mesh );
			
			
		},
		
		
		AddToScene: function (){
			
			Kernel._active_project._scene.add( this._object3d );
			
			
		},
		
		
		SetMaterial: function ( viewside ){
			
			return new THREE.MeshLambertMaterial( { color: this._color, side: viewside,  
				
				transparent: true,
				opacity: 0.35,
				
					
				polygonOffset: true,
		        polygonOffsetFactor: 0,
		        polygonOffsetUnits: 0

			});
			
			
		}
		
}