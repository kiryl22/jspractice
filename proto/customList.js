function CustomList(elemId){
    BaseList.apply(this, arguments);
}

CustomList.prototype = Object.create(BaseList.prototype);
CustomList.prototype.constructor = CustomList;

CustomList.prototype.sort =  function() {
    this._collection.sort(function(a, b){
        if(a.text < b.text) return -1;
        if(a.text > b.text) return 1;
        return 0;
    });

    this._render(true);
}

