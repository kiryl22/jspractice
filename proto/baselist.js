var BaseList = (function(){

    //privates
    var listItemsGenerator = function(prefix){
        var _id = 0;
        var _prefix = prefix || '';

        return function(text, position){
            _id+=1
            return{
                id : _prefix + _id,
                position: position,
                text: text
            }
        }
    }

    var renderListItem = function (parentId, listItem){
        var e = document.getElementById(listItem.id);
        if(e){
            e.innerText = listItem.text;
        }
        else{
            e = document.createElement('div');
            var parent = document.getElementById(parentId);
            if(parent){
                e.innerText = listItem.text;
                e.setAttribute('class','list-item')
                e.id = listItem.id;
                parent.appendChild(e);
            }
        }
    }

    var renderList = function (parentId, items, forceDelete){
        if(forceDelete){
            var node = document.getElementById(parentId);
            while (node.hasChildNodes()) {
                node.removeChild(node.firstChild);
            }
        }
        items.forEach(function(item) {
            renderListItem(parentId, item);
        });
    }

    //constructor
    function BaseList(elemId) {

        var _this = this;
        this._parentId = elemId;
        this._collection = [];
        this._createItem = listItemsGenerator(this._parentId);

        this._renderItem = function (listItem){
            renderListItem(this._parentId, listItem);
        }

        this._render = function (forceDelete){
            renderList(this._parentId, this._collection, forceDelete)
        }
    }

    BaseList.prototype.add = function(text, position){
        var item = this._createItem(text, position);
        this._collection.push(item);
        this._renderItem(item);
        return item;
    }

    BaseList.prototype.delete = function(itemId){
        this._collection = this._collection.filter(function( item ) {
            return item.id !== itemId;
        });

        this._render(true);
    }

    return BaseList;


})(window)