
Kernel.Logic = {

    // Main logic functions
    

}





// Project wrapper

Kernel.Logic.Project = {

    Create: function (){
    
        
    },
    
    Open: function ( id, container ){
        
        id = id || 1;
        
        Kernel._projects.push ( new Kernel.Project ( Kernel._projects.length + 1 ));

        Kernel._active_project = Kernel._projects[ Kernel._projects.length - 1 ];

        
        

        // Установка контейнера для отрисовки сцены
        
        Kernel._active_project.SetContainer ( container[0] );

        
        
        // Инициализация сцены
        
        Kernel._active_project.InitScene ();
        
        

        // Прослушивание событий проекта
        
        Kernel._active_project.Listen ();

        
        

        // Загрузка данных проекта
        
        Kernel._active_project.AjaxLoadData ( id = id );
        
        
        
        // Построение проекта

        Kernel._active_project.Construct ();
		
		
		// Render the project
		
		Kernel._active_project.Render ();
        


    },
    
    Close: function (){
    
    
    },
    
    Delete: function (){
    
    
    
    },
	
	
	
	ActivateTool: function ( tool_code ){
	
		
		
	
	},
	
	
	DeactivateTool: function (){

	



	},
	
	ActivateOperation: function ( operation_code ){
	
		
		
	
	},
	
	
	DeactivateOperation: function ( ){

		



	},
	
    PickObject: function ( mesh ){
        
        
            
        
    }
    


}