Kernel.Geometry.Auxiliary.EdgeHelper = function ( mesh, color ){
	
	this._mesh = mesh;

	this._color = color;


	this._edge_helper_mesh = null;
	
	this._wfh = null;

	this.Construct();
	this.AddToScene();

	return this;
	
	
}


// Edge helper prototypes
Kernel.Geometry.Auxiliary.EdgeHelper.prototype = {
    
        constructor: Kernel.Geometry.Auxiliary.EdgeHelper,
	
	
		Construct: function ( ){
		
			this._edge_helper_mesh = new THREE.EdgesHelper( this._mesh, this._color );
			
			
			
			console.info (this._edge_helper_mesh.material);
			this._edge_helper_mesh.material.polygonOffset = true;
			this._edge_helper_mesh.material.polygonOffsetFactor = 1;
			this._edge_helper_mesh.material.polygonOffsetUnits =  4.0;
			this._edge_helper_mesh.material.transparent = false;
			this._edge_helper_mesh.material.opacity = 0.05;
			//this._edge_helper_mesh.material.opacity = 0.05;
			

			
			
			
			
			
			
			
			// this._edge_helper_mesh.material.linewidth = 10;
			// this._edge_helper_mesh.material.depthTest = true;
			
			
//			this._wfh = new THREE.WireframeHelper( this._mesh, this._color );
//			this._wfh.material.depthTest = false;
//			this._wfh.material.opacity = 0.05;
//			this._wfh.material.transparent = true;
			  
			
			
			
			
		},
	
		AddToScene : function (){
		
			Kernel._active_project._scene.add( this._edge_helper_mesh );
			
			//Kernel._active_project._scene.add( this._wfh );
		
		}
}