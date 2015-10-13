window.CustomList = window.CustomList || (function(undefined){
	
	return function(elemId, isServiceNode){
	
		var self = this;
		BaseList.apply(self, arguments);
	
		self.sort= function() {
			self._collection.sort(function(a, b){
				if(a.text.toLowerCase() < b.text.toLowerCase()) return -1;
				if(a.text.toLowerCase() > b.text.toLowerCase()) return 1;
				return 0;
			});

			self.render(true);
		};

		if(self._serviceNode) {
			var sortBtn = document.createElement("button");
			sortBtn.innerText= "Sort";
			sortBtn.addEventListener('click', function(){
					self.sort();
			});
			self._serviceNode.appendChild(sortBtn);
		}
	};
	
})();
