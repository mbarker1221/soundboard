function showEvents() { 
	var oArgs = {
         app_key:"c7nd5jGWK8tkcThz",            
         id: "20218701",
         page_size: 25 ,
  };

  EVDB.API.call("/events/get", oArgs, function(oData) {
  });
}

function searchShows() {
	var oArgs = {
      app_key: "c7nd5jGWK8tkcThz",
      q: "music",
      where: "Atlanta", 
      "date": "2013061000-2015062000",
      page_size: 5,
      sort_order: "popularity",
   };

 EVDB.API.call("/events/search", oArgs, function(oData) {   
    });
}
