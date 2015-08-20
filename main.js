$( function(){

	
    var Project1 = new Kernel.Logic.Project.Open ( id = 1, container = $("#container") );
    
    console.info ( Kernel._projects );
    console.info ( Kernel._active_project );
    
    
    
    
    // space1
    
    var points = [ 
        
        { x: -765, z: -420 },
        
        { x: 3750, z: -420 },
        
        { x: 3750, z: 3500 },
        
        { x: -765, z: 3500 },
        
        { x: -3750, z: 3500 },
        
         { x: -3750, z: 450 },
         
         { x: -855, z: 450 },
         
         { x: -855, z: 1160 },
         { x: -765, z: 1160 },
        
    ];
    
    
    var levelHeight = 400;
    var height = 400;
    
    
    var color = 0x29FF44;
    
    new Kernel.Geometry.Auxiliary.SpaceHelper ( points, levelHeight, height, color );
    
    
    
    // space2
    
      var points = [ 
        
        { x: 1195, z: -3500 },
        
        { x: 3750, z: -3500 },
        
        { x: 3750, z: -510 },
        
        { x: 1195, z: -510 },
        
    ];
    
    
    var levelHeight = 400;
    var height = 400;
    
    var color = 0x29FF44;
    
    new Kernel.Geometry.Auxiliary.SpaceHelper ( points, levelHeight, height, color );
    
    
    
    
    // space3
    
      var points = [ 
        
        { x: -3750, z: -3500 },
        
        { x: 1100, z: -3500 },
        
        { x: 1100, z: -2600 },
        
        { x: -2100, z: -2600 },
        { x: -2100, z: -2500 },
        
        { x: 1100, z: -2500 },
        
        { x: 1100, z: -500 },
        
        
        
        
        { x: -760, z: -500 },
        
        { x: -760, z: -1670 },
        { x: -3750, z: -1670 },
        
        
    ];
    
    
    var levelHeight = 400;
    var height = 400;
    
    var color = 0x29FF44;
    
    new Kernel.Geometry.Auxiliary.SpaceHelper ( points, levelHeight, height, color );
    
    
    // space4
    
    var points = [ 
        
        { x: -3750, z: -1425 },
        
        { x: -870, z: -1425 },
        
        { x: -870, z: 365 },
        
        { x: -3750, z: 365 },
        
        
    ];
    
    
    var levelHeight = 400;
    var height = 400;
    
    var color = 0x29FF44;
    
    new Kernel.Geometry.Auxiliary.SpaceHelper ( points, levelHeight, height, color );
    
    
    
    
    
    
    
    
    
    // Second FLOOR
    
    
    
    
    // space5
    
      var points = [ 
        
        { x: -3750, z: -3500 },
        
        { x: 1200, z: -3500 },
        
        { x: 1200, z: -510 },
        
    
       
        
        { x: 370, z: -510 },
        
        
        
        
        { x: 370, z: 495 },
        
        
        
        
        { x: -770, z: 495 },
        { x: -770, z: -1675 },
        { x: -3750, z: -1675 },
        
    ];
    
    
    var levelHeight = 3550;
    var height = 400;
    
    var color = 0x1689B2;
    
    new Kernel.Geometry.Auxiliary.SpaceHelper ( points, levelHeight, height, color );
    
    
    
    
    
    
    
    
    
    
    
    // Space 6
    
    var points = [ 
        
        { x: -3750, z: -1430 },
        
        { x: -860, z: -1430 },
        
        { x: -860, z: 495 },
        
        { x: -3750, z: 495 },
        
        
    ];
    
    
    var levelHeight = 3550;
    var height = 400;
    
    var color = 0xAADDFF;
    var color = 0x1689B2;
    
    new Kernel.Geometry.Auxiliary.SpaceHelper ( points, levelHeight, height, color );7
    
    
    
    
     // Space 7
    
    var points = [ 
        
        { x: 1300, z: -3500 },
        
        { x: 3750, z: -3500 },
        
        { x: 3750, z: -510 },
        
        { x: 1300, z: -510 },
        
        
    ];
    
    
    var levelHeight = 3550;
    var height = 400;
    
    var color = 0xAADDFF;
    var color = 0x1689B2;
    
    new Kernel.Geometry.Auxiliary.SpaceHelper ( points, levelHeight, height, color );
    
    
    
     // Space 8
    
    var points = [ 
        
        { x: 470, z: -410 },
        
        { x: 3750, z: -410 },
        
        { x: 3750, z: 3500 },
        
        { x: 470, z: 3500 },
        
        
    ];
    
    
    var levelHeight = 3550;
    var height = 400;
    
    var color = 0xAADDFF;
    var color = 0x1689B2;
    
    new Kernel.Geometry.Auxiliary.SpaceHelper ( points, levelHeight, height, color );
    
    
     // Space 9
    
    var points = [ 
        
        { x: -3750, z: 595 },
        
        { x: 370, z: 595 },
        
        { x: 370, z: 3500 },
        
        { x: -3750, z: 3500 },
        
        
    ];
    
    
    var levelHeight = 3550;
    var height = 400;
    
    var color = 0xAADDFF;
    var color = 0x1689B2;
    
    new Kernel.Geometry.Auxiliary.SpaceHelper ( points, levelHeight, height, color );
    
    


})


