window.CustomList = window.CustomList || (function(undefined){
	
	return function(elemId){
	
		var self = this;
		BaseList.apply(self, arguments);
	
		self.sort= function() {
			self._collection.sort(function(a, b){
				if(a.text < b.text) return -1;
				if(a.text > b.text) return 1;
				return 0;
			});

			self.render(true);
		};
	};
	
})();
