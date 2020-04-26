
let canvas = new fabric.Canvas('canvas');

fabric.Object.prototype.objectCaching = false;

const objectProperties = { 'text': ['text', 'height', 'width', 'top', 'left', 'id'], 'circle': ['radius', 'top', 'left', 'id'], 'square': ['height', 'width', 'top', 'left', 'id'], 'rect': ['height', 'width', 'top', 'left', 'id'], 'all': ['height', 'width', 'top', 'left', 'radius', 'text', 'id'] };
const objectPropertyTypes = { 'text': 'text', 'height': 'number', 'width': 'number', 'top': 'number', 'left': 'number', 'id': 'text', 'radius': 'number' };
const activeObjectsDirectory = {};
const activeObjects = [];

let copiedObjects = new Array();
let copiedObject = null;

let addProperty = function(object,property,type){
    objectProperties[object].push(property);
    objectPropertyTypes[property] = type;
}

addProperty('text','fill','color');
addProperty('text','fontSize','number');
addProperty('text','scaleX','number');
addProperty('text','scaleY','number');


fabric.Object.prototype.toObject = (function (toObject) {
    return function (properties) {
        return fabric.util.object.extend(toObject.call(this, properties), {
            id: this.id
        });
    };
})(fabric.Object.prototype.toObject);

const components = {
    'text': new fabric.Text('Add Text Here', {
        fontSize: 12,
        fontFamily: 'Menlo',
        originX: 'center',
        originY: 'center',
        top: 250,
        left: 400,
        fill: 'dimgrey'
    }), 'circle': new fabric.Circle({
        fill: 'aquamarine',
        originX: 'center',
        originY: 'center',
        opacity: 0.4,
        radius: 50,
        top: 250,
        left: 400
    }), 'rect': new fabric.Rect({
        fill: 'aquamarine',
        originX: 'center',
        originY: 'center',
        opacity: 0.4,
        width: 334,
        height: 112,
        top: 250,
        left: 400
    }), 'square': new fabric.Rect({
        fill: 'aquamarine',
        originX: 'center',
        originY: 'center',
        opacity: 0.4,
        width: 100,
        height: 100,
        top: 250,
        left: 400
    })
};

let lengthVariableSprite = new fabric.Rect({
    fill: 'aquamarine',
    originX: 'center',
    originY: 'center',
    id: 'lengthVariableSprite',
    opacity: 0.4,
    width: 334,
    height: 112,
    top: -25 + 104,
    left: 393
});


let lengthVariableSpriteLabel = new fabric.Text('🎲 length:10', {
    fontSize: 12,
    fontFamily: 'Menlo',
    originX: 'center',
    originY: 'center',
    top: -25 + 103,
    left: 293,
    fill: 'dimgrey',
    id: 'lengthVariableSpriteLabel',
});

// let lengthVariableSpriteLabel = new fabric.Text('🎲 length:10', {
//     fontSize: 12,
//     fontFamily: 'Menlo',
//     originX: 'center',
//     originY: 'center',
//     
//     top: -25 +103,
//     left:293,
//     fill:'dimgrey',
//     id:'lengthVariableSpriteLabel',
// });

let globalStateLabel = new fabric.Text('🌐 Global Variables', {
    fontSize: 14,
    fontFamily: 'Menlo',
    selectable: false,
    originX: 'center',
    originY: 'center',
    top: -25 + 71,
    left: 392,
    fill: 'dimgrey',
    id: 'globalStateLabel',
});

let functionArgumentsLabel = new fabric.Text('📬 Function Arguments', {
    fontSize: 14,
    fontFamily: 'Menlo',
    //selectable:false,
    originX: 'center',
    originY: 'center',
    top: -25 + 218,
    left: 396,
    fill: 'dimgrey',
    id: 'globalStateLabel',
});

// let lengthVariableSpriteGroup = new fabric.Group([ lengthVariableSprite, lengthVariableSpriteLabel ], {
//     left: 194,
//     top: -25 + 47,
//     id:'lengthVariableSpriteGroup'
// });

let functionArgumentsSprite = new fabric.Rect({
    originX: 'center',
    originY: 'center',
    fill: 'palegreen',
    opacity: 0.4,
    id: 'functionArgumentsSprite',
    width: 276,
    height: 114,
    top: 224,
    left: 395
});

let minLengthVariableLabel = new fabric.Text('🎲 minLength:10', {
    fontSize: 12,
    fontFamily: 'Menlo',
    id: 'minLengthVariableLabel',
    originX: 'center',
    fill: 'dimgrey',
    originY: 'center',
    top: -25 + 252,
    left: 336
});

// let checkVideoLengthSpriteGroup = new fabric.Group([ functionArgumentsSprite, minLengthVariableLabel ], {
//     left: 264,
//     top: -25 + 194,
//     id:'checkVideoLengthSpriteGroup'
// });

let checkVideoLengthFunctionSprite = new fabric.Rect({
    originX: 'center',
    originY: 'center',
    fill: '#D8F1FA',
    opacity: 0.4,
    id: 'checkVideoLengthSprite',
    width: 211,
    height: 148,
    left: 389,
    top: 390
});

let checkVideoLengthFunctionSpriteLabel = new fabric.Text('🤖 Check Video Length', {
    fontSize: 14,
    fontFamily: 'Menlo',
    id: 'minLengthVariableLabel',
    originX: 'center',
    fill: 'dimgrey',
    originY: 'center',
    left: 388,
    top: 342
});

let hideNotApplicableProperties = function (objectType) {
    objectProperties['all'].map(function (objectProperty) {
        if (objectProperties[objectType].includes(objectProperty)) {
            $(`#object-${objectProperty}-input-group`).show();
        } else {
            $(`#object-${objectProperty}-input-group`).hide();
        }
    });
}

// let checkVideoLengthFunctionSpriteGroup = new fabric.Group([ checkVideoLengthFunctionSprite, checkVideoLengthFunctionSpriteLabel ], {
//     left: 299,
//     top: 317,
//     id:'VideoLengthInputSpriteGroup'
// });

let functionVariableSpriteConnection = new fabric.Line([250, 125, 250, 175], {
    fill: 'skyblue',
    stroke: 'skyblue',
    strokeWidth: 5,
    id: 'functionVariableSpriteConnection',
    selectable: false,
    evented: true
});


functionVariableSpriteConnection.on('mouseup', function (e) {
    canvas.remove(functionVariableSpriteConnection);
});

lengthVariableSpriteLabel.on('moving', function (e) {
    canvas.bringToFront(e.target);
});

// let moveHandler = function(event){
//   //console.log(event.target.top+','+event.target.left+','+event.target.id);
// }

let loadPropertiesForObject = function (object) {
    $("#properties-body").empty();
    objectProperties[object.get('type')].map(function (objectProperty) {
        $("#properties-body").append(`
        <div class="input-group mb-2" id="object-${objectProperty}-input-group">
        <div class="input-group-prepend">
          <div class="input-group-text">${objectProperty}</div>
        </div>
        <input type="${objectPropertyTypes[objectProperty]}" class="form-control object-property" id="object-${objectProperty}" placeholder="${objectProperty}">
        </div>`);
    });
    initInputListeners();
}

let onSelectObject = function (event) {
    loadPropertiesForObject(event.target);
    if (!event.target._objects) {
        updatePropertiesOfOjectFromCanvas(event.target);
    }
    togglePropertiesBodyVisibility(true);
    hideNotApplicableProperties(event.target.get('type'));
}


let onDeselectObject = function (event) {
    // console.log('Object Deselected');
    togglePropertiesBodyVisibility(false);
}

let onObjectModified = function (event) {
    // console.log('Object Modified');
    // console.log(event.target);
    if (!event.target._objects) {
        updatePropertiesOfOjectFromCanvas(event.target);
    }
    saveCanvas();
}

let togglePropertiesBodyVisibility = function (visibiliy) {
    if (visibiliy) {
        $('#properties-body').show();
        $('#select-object-message').hide();
    } else {
        $('#properties-body').hide();
        $('#select-object-message').show();
    }
}

let formatValue = function (value) {
    if (typeof value == "number") {
        return Math.round(value);
    } else {
        return value;
    }
}

let saveCanvas = function () {
    localStorage.setItem("canvasState", JSON.stringify(canvas));
}

let restoreCanvas = function () {
    let canvasState = localStorage.getItem("canvasState");
    if (canvasState) {
        canvas.loadFromJSON(canvasState)
    }
}

let exportToJsonFile = function (jsonData) {
    let dataStr = JSON.stringify(jsonData);
    window.open('data:application/json;charset=utf-8,' + encodeURIComponent(dataStr),
        "_blank");
}

let exportToJsonFileQuick = function(jsonData){
    let dataStr = JSON.stringify(jsonData);
    let dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    let exportFileDefaultName = 'data.json';
    let linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}

let updatePropertiesOfOjectFromCanvas = function (object) {
    objectProperties[object.get('type')].map(function (objectProperty) {
        if (objectProperty == 'height') {
            $(`#object-${objectProperty}`).val(formatValue(object.get('height') * object.get('scaleY')));
        } else if (objectProperty == 'width') {
            $(`#object-${objectProperty}`).val(formatValue(object.get('width') * object.get('scaleX')));
        } else {
            $(`#object-${objectProperty}`).val(formatValue(object[objectProperty]));
        }
    });
}



canvas.add(functionArgumentsSprite);
canvas.add(minLengthVariableLabel);

canvas.add(checkVideoLengthFunctionSprite);
canvas.add(checkVideoLengthFunctionSpriteLabel);
canvas.add(lengthVariableSprite);
canvas.add(lengthVariableSpriteLabel);
canvas.add(globalStateLabel);
canvas.add(functionArgumentsLabel);
canvas.setHeight(500);
canvas.setWidth(800);
// canvas.on('object:moving',moveHandler);
canvas.on('object:selected', onSelectObject);
canvas.on('before:selection:cleared', onDeselectObject)
canvas.on('selection:updated', onSelectObject);
//canvas.on('object:modified', onObjectModified);
canvas.on('object:scaling', onObjectModified);
canvas.on('object:moving', onObjectModified);
togglePropertiesBodyVisibility(false);
restoreCanvas();
// checkVideoLengthSpriteGroup.on('moving',function(e){
//     setConnection();
//   //console.log(e.target);
// });

// lengthVariableSpriteGroup.on('moving',function(e){
//     setConnection();
//   //console.log(e.target);
// });

// let setConnection = function(){
//     functionVariableSpriteConnection.set({'x1':checkVideoLengthSpriteGroup.getCenterPoint().x,'y1':checkVideoLengthSpriteGroup.getCenterPoint().y,'x2':lengthVariableSpriteGroup.getCenterPoint().x,'y2':lengthVariableSpriteGroup.getCenterPoint().y});
//     functionVariableSpriteConnection.setCoords();
// }

//setConnection();

window.deleteObject = function () {
    canvas.getActiveObject().remove();
}

let initInputListeners = function(){
    $("input").on('input', function (event) {
       
        if (event.target.type == "number") {
            canvas.getActiveObject()[event.target.id.replace("object-", "")] = Math.round(event.target.value) || 0;
        } else {
            canvas.getActiveObject()[event.target.id.replace("object-", "")] = event.target.value;
        }
        canvas.requestRenderAll();
        saveCanvas();
    });
};


$(document).on('click', function (event) {
    console.log($(this).attr('id'));
    if (event.target.nodeName != "CANVAS" && event.target.nodeName != "INPUT") {
        canvas.discardActiveObject();
        canvas.renderAll();
    }
});

$('.components').on('click', function (event) {
    if (components[$(this).data().field]) {
        let newComponent = fabric.util.object.clone(components[$(this).data().field]);
        canvas.add(newComponent);
    } else {
        exportToJsonFile(JSON.stringify(canvas));
    }
});


function copy(){
     if(canvas.getActiveObject() && !canvas.getActiveObject()._objects){
        let object = fabric.util.object.clone(canvas.getActiveObject());
        copiedObject = object;        
    }
}

function paste(){
     if(copiedObject){
    	copiedObject= fabric.util.object.clone(copiedObject);
		copiedObject.set("top", 250);
    	copiedObject.set("left", 400);
        canvas.add(copiedObject);
        canvas.item(canvas.size() - 1).hasControls = true;
    }
    canvas.renderAll();  
}



$(document).on('keydown', function (e) {

    let modifier = e.ctrlKey || e.metaKey;
    if ([8, 46].includes(e.which) && canvas.getActiveObject != undefined &&  e.target.className.includes("object-property") == false) {
        e.preventDefault();
        canvas.remove(canvas.getActiveObject());
        saveCanvas();
    } else if(e.which==9){
        $.ajax({
            dataType: "json",
            url: "/json/data.json",
            success: function (data) {
                canvas.loadFromJSON(data);
            }
        });
    } else if(e.which==192){
        exportToJsonFileQuick();
    } else if(modifier && e.which==67 && !$("input").is(":focus")){
        copy();

    } else if(modifier && e.which==86 && !$("input").is(":focus")){
        paste();
    }
});


// $( "input" ).change(function(event) {
//   //console.log(event.target.id);
//   //console.log(event.target.value);
//   //console.log(canvas.getActiveObject());
//     canvas.getActiveObject().set(event.target.id,event.target.value);
// });

let getObject = function (id) {
    let foundObject=null;
    if(!canvas.getObjects())
    return null;
    canvas.getObjects().map(function(o) {
        if(o.id === id) {
            foundObject = o;
        }
    });
    return foundObject;
}

let testRun = function(){
    if(getObject('dynamicVar')){
     getObject('dynamicVar').set('text',`🎲 length:${Math.floor(Math.random() * 100)}`);
      canvas.requestRenderAll();
    }
 }

window.setInterval(testRun,500);
$( document ).ready(function() {
    $("#staticBackdrop").modal() ;
});
