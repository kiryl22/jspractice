function CustomList(elemId){
    BaseList.apply(this, arguments);

    this.sort= function() {
        this._collection.sort(function(a, b){
            if(a.text < b.text) return -1;
            if(a.text > b.text) return 1;
            return 0;
        });

        this.render(true);
    }
}
