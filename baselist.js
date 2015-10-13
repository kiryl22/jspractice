window.BaseList = window.BaseList || (function(undefined){

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

    var renderListItem = function (parentId, listItem, serviceNode){
        var e = document.getElementById(listItem.id);
        if(e){
            e.innerText = listItem.text;
        }
        else{
            e = document.createElement('div');
            var parent = document.getElementById(parentId);
            if(parent){
                var innerSpan = document.createElement('span');
                innerSpan.innerText = listItem.text;
                e.setAttribute('class','list-item')
                e.id = listItem.id;
                e.appendChild(innerSpan);
                if(serviceNode){
                    parent.insertBefore(e, serviceNode)
                }
                else{
                    parent.appendChild(e);
                }

                return e;
            }
        }
    }

    var renderList = function (parentId, items, forceDelete, serviceNode){
        if(forceDelete){
            var node = document.getElementById(parentId);
            if(node){
                while (node.hasChildNodes() ) {
                    node.removeChild(node.firstChild);
                }

                if(serviceNode){
                    node.appendChild(serviceNode);
                }
            }
        }
        items.forEach(function(item) {
            renderListItem(parentId, item, serviceNode);
        });
    }



    //constructor
    function BaseList(elemId, isServiceNode) {

        var _this = this;
        this._parentId = elemId;
        this._collection = [];
        this._createItem = listItemsGenerator(this._parentId);
        this._serviceNode = null;

        var createServiceNode =  function(parentId, elemId) {
            var e = document.createElement('div');
            e.setAttribute('class','service-node');
            e.id = elemId || parentId +'-service-node';

            var input = document.createElement("input");
            input.setAttribute("type", "text");

            var btn = document.createElement("button");
            btn.innerText= "Add";
            btn.addEventListener('click', function(){
                if(input.value){
                    _this.add(input.value);
                }
            });

            e.appendChild(input);
            e.appendChild(btn);

            var parent = document.getElementById(parentId);
            if(parent) {
                parent.appendChild(e);
            }

            return e;
        }

        var addDeleteAction = function(e){
            if(e){
                var delBtn = document.createElement("div");
                delBtn.setAttribute('class','delete-btn');
                delBtn.addEventListener('click', function(){
                    _this.delete(e.id);
                });
                e.appendChild(delBtn)
            }
        }

        this.renderItem = function (listItem){
            var e = renderListItem(this._parentId, listItem, this._serviceNode);
            addDeleteAction(e);
        }

        this.render = function (forceDelete){
            renderList(this._parentId, this._collection, forceDelete, this._serviceNode);
            var parent = document.getElementById(this._parentId);
            var listItems = parent.getElementsByClassName('list-item');
            for (var i = 0; i < listItems.length; ++i) {
                addDeleteAction(parent.childNodes[i]);
            }
        }

        this.add = function(text, position){
            var item = this._createItem(text, position);
            this._collection.push(item);
            this.renderItem(item);
            return item;
        }

        this.delete = function(itemId){
            this._collection = this._collection.filter(function(item) {
                return item.id !== itemId;
            });
            this.render(true);
        }

        this.addServiceNode = function(nodeId) {
            this._serviceNode = createServiceNode(this._parentId, nodeId);
        }

        if(isServiceNode){
            this.addServiceNode();
        }
    }

    return BaseList;

})()