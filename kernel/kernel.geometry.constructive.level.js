Kernel.Geometry.Constructive.Level = function ( properties ){

	this._id = properties.id;
	this._height = properties.height;
	
	this.Construct();
	


}







Kernel.Geometry.Constructive.Level.prototype = {
    
	constructor: Kernel.Geometry.Constructive.Level,
	
	
	Construct: function (){
		
		var geometry = new THREE.PlaneGeometry( 500, 500, 1 );
		var material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.FrontSide, transparent: true, opacity: 0.4} );
		var plane = new THREE.Mesh( geometry, material );
		
		plane.position.z = this._height;
		
//		Kernel._active_project._scene.add( plane );
//		
//		
//		var egh = new THREE.EdgesHelper( plane, 0x707070 );
//		egh.material.linewidth = 1;
//		Kernel._active_project._scene.add( egh );
		
		
	
	
	
	
	}



}