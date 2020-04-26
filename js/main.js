let canvas;
var renderTimeout = false;
var triggers = [];
var canvasObjectsDirectory = {};
var canvasObjects = [];
var canvasObjectsIds = [];
let currentPosition = 0;
let titles = {
    "intro": "Immersive Introduction to Functional Programming, Pure Functions",
    "johns_startup": "John's Startup",
    "pure_function_intro": "Introduction to Pure Functions",
    "parallel": "Help Susan Solve a Bug",
    "bugs_activity_effects": "Developers Have Started Using Pure Functions",
    "testable": "Help Susan Write Testable Code",
    "testable_activity_effects": "Sara Says Thanks!",
    "portable": "Help Susan Reuse Code",
    "portable_actvity_effects": "Get Notified About Upcoming Chapters"

};

let content = {
    "intro": "This is an immersive 📺 introduction to functional programming.<br/> <br/>  Functional programming helps you write code 🧑‍💻 that's modular, testable and scalable. It will make you ❤️ programming again. <br/> <br/> This course helps you learn by doing. You will be interacting with simulated systems 🎛. Hence our courses are engaging 🏄‍♀️ and help in active learning. <br/> <br/> Enough talk, let's get started with pure functions 😃. <br/><br/>",
    "johns_startup": "🧑‍🦱 John's video analytics startup has achieved product-market fit. He's overwhelmed with customers and feature requests 💰. <br /><br /> However, his codebase has become bulky, and spaghetti code has made it difficult to build new features. There has been a steady increase in the rate of bugs reported. <br /><br />Hiring more developers haven't solved the issue. If this situation continues, the startup would be in trouble. Let's help John 🤗 by making his codebase easy to read, extend and test using the concepts of functional programming.<br/><br/>",
    "pure_function_intro": "Pure function only refers and manipulate values that come in as its arguments. It doesn't change the state of the outside world. It maintains the purity of its environment. <br /><br /> Imagine two impure functions that are dependent on a global variable. If one changes it to null during the run time, the other function can break or misbehave 🤮. Hence impure functions can introduce bugs 🐞 in the code. <br /><br /> We also cannot run impure functions parallelly because of their unpredictable behaviour 🤪. Making functions pure will also help with performance. Since it can take advantage of parallel computing.<br /><br /> Let's use pure functions to make John's product robust 💪 and performant 🏎️.<br /><br />",
    "bugs_activity_effects": "Good Job 👍. <br /><br /> Developers in John's startup have realised the benefits of pure functions. They are making efforts to write pure functions.<br /><br /> We aren't done with the rewards 🎁 of pure functions.<br /><br /> Let's learn how they help in writing testable 🧪 code. <br /><br />",
    "testable_activity_effects": "Again, Great Job 👍. <br /><br /> Sara, the QA Developer 👩‍💻, expresses her gratitude 😊 as you have made her work so much easier.<br /><br /> Pure functions also make code modular 📦 and reusable.<br /><br /> Let's see how they help in writing code's that's portable 🚢 and scalable.<br /><br />",
    "portable_actvity_effects": "You have done a fantastic job 👏. <br /><br /> Peter, the lead engineer 🧔, is thankful to you. Since his team now spends time on building features than fixing bugs. <br /><br /> In the next chapter, you will learn about composable code. You will learn to combine small functions 🔗 to solve big problems.<br /><br /> If you are interested in reaping the benefits of functional programming, <a href='http://eepurl.com/g1aJ_f' target='_blank'> subscribe here</a>. We will inform 📮 you once the next chapter 📖 is published.<br /><br />"
};

let playgrounds = {
    "parallel": "/json/chapter1/bugs_parallel_playground.json",
    "testable": "/json/chapter1/testable_playground.json",
    "portable": "/json/chapter1/portable_playground.json"
};

let navigation = [
    {
        "type": "content",
        "content_id": "intro",
        "components_visiblity": [
            {
                "component": "next_button",
                "visblity": true
            }, {
                "component": "back_button",
                "visblity": false
            }, {
                "component": "playground",
                "visblity": false
            }, {
                "component": "content",
                "visblity": true
            }
        ]
    },
    {
        "type": "content",
        "content_id": "johns_startup",
        "components_visiblity": [
            {
                "component": "next_button",
                "visblity": true
            }, {
                "component": "back_button",
                "visblity": true
            }, {
                "component": "playground",
                "visblity": false
            }, {
                "component": "content",
                "visblity": true
            }
        ]
    },
    {
        "type": "content",
        "content_id": "pure_function_intro",
        "components_visiblity": [
            {
                "component": "next_button",
                "visblity": true
            }, {
                "component": "back_button",
                "visblity": true
            }, {
                "component": "playground",
                "visblity": false
            }, {
                "component": "content",
                "visblity": true
            }
        ]
    },
    {
        "type": "playground",
        "playground_id": "parallel",
        "components_visiblity": [
            {
                "component": "next_button",
                "visblity": true
            }, {
                "component": "back_button",
                "visblity": true
            }, {
                "component": "playground",
                "visblity": true
            }, {
                "component": "content",
                "visblity": false
            }
        ]
    }, {
        "type": "content",
        "content_id": "bugs_activity_effects",
        "components_visiblity": [
            {
                "component": "next_button",
                "visblity": true
            }, {
                "component": "back_button",
                "visblity": true
            }, {
                "component": "playground",
                "visblity": false
            }, {
                "component": "content",
                "visblity": true
            }
        ]
    }, {
        "type": "playground",
        "playground_id": "testable",
        "components_visiblity": [
            {
                "component": "next_button",
                "visblity": true
            }, {
                "component": "back_button",
                "visblity": true
            }, {
                "component": "playground",
                "visblity": true
            }, {
                "component": "content",
                "visblity": false
            }
        ]
    }, {
        "type": "content",
        "content_id": "testable_activity_effects",
        "components_visiblity": [
            {
                "component": "next_button",
                "visblity": true
            }, {
                "component": "back_button",
                "visblity": true
            }, {
                "component": "playground",
                "visblity": false
            }, {
                "component": "content",
                "visblity": true
            }
        ]
    }, {
        "type": "playground",
        "playground_id": "portable",
        "components_visiblity": [
            {
                "component": "next_button",
                "visblity": true
            }, {
                "component": "back_button",
                "visblity": true
            }, {
                "component": "playground",
                "visblity": true
            }, {
                "component": "content",
                "visblity": false
            }
        ]
    }, {
        "type": "content",
        "content_id": "portable_actvity_effects",
        "components_visiblity": [
            {
                "component": "next_button",
                "visblity": false
            }, {
                "component": "back_button",
                "visblity": true
            }, {
                "component": "playground",
                "visblity": false
            }, {
                "component": "content",
                "visblity": true
            }
        ]
    }
];

let changeComponentVisiblity = function (id, visible) {
    if (visible) {
        $(`#${id}`).show();
    } else {
        $(`#${id}`).hide()
    }

}

let loadChapterSection = function (position) {

    let sectionDetails = navigation[position];
    if (sectionDetails.type == "content") {
        $('#title').text(titles[sectionDetails["content_id"]]);
        $('#content').html(content[sectionDetails["content_id"]]);
        sectionDetails.components_visiblity.map((item) => {
            changeComponentVisiblity(item.component, item.visblity);
        });
        return;
    } else if (sectionDetails.type == "playground") {
        $('#title').text(titles[sectionDetails["playground_id"]]);
        sectionDetails.components_visiblity.map((item) => {
            changeComponentVisiblity(item.component, item.visblity);
        });
        initCanvas(playgrounds[sectionDetails["playground_id"]]);
        return;
    }
}

$(document).on('keydown', function (e) {
    if(e.which==39){
        goForward();
    } else if(e.which==37){
        goBackward();
    }
});

let sendEvent = function(currentPosition){
    if ("ga" in window) {
        tracker = ga.getAll()[0];
        if (tracker)
            tracker.send("event", "Visited Section", currentPosition);
    }
}

let goForward = function(){
   if(currentPosition>=navigation.length-1){
        return;
    }
    currentPosition++;
    loadChapterSection(currentPosition);
    sendEvent(currentPosition);
}

let goBackward = function(){
    if(currentPosition<=0){
        return;
    } 
    currentPosition--;
    loadChapterSection(currentPosition)
    sendEvent(currentPosition);
}

$('document').ready(() => {
    loadChapterSection(currentPosition);
    $('#next_button').click(() => {
        goForward();
    });
    $('#back_button').click(() => {
        goBackward();
    });
});

fabric.Object.prototype.objectCaching = false;
fabric.Object.prototype.toObject = (function (toObject) {
    return function (properties) {
        return fabric.util.object.extend(toObject.call(this, properties), {
            id: this.id,
            selectable: this.selectable,
            hasControls: this.hasControls
        });
    };
})(fabric.Object.prototype.toObject);


let removeObjectsFromMemory = function () {
    canvasObjects = [];
    canvasObjectsDirectory = {};
}

let addObjectToMemory = function (object, humanId) {
    console.log(humanId);
    canvasObjectsDirectory[humanId] = object;
    canvasObjects.push({'id': object.id, 'object': object});
}

let addObjectHandler = function (e) {
    let object = e.target;
    console.log(object);
    if (! object) {
        console.log(e);
        return;
    }
    if (! object.id || object.id == undefined || object.id == "") {
        let humanId = humanReadableIds.random();
        object.set('id', humanId);
    }
    addObjectToMemory(object, object.get('id'));
}

let loadObjectsToMemory = function () {
    canvas.getObjects().map(function (object) {
        addObjectHandler({target: object});
    });
}

let restoreCanvas = function (url) {
    $.ajax({
        dataType: "json",
        url: url,
        success: function (data) {
            removeObjectsFromMemory();
            triggers = JSON.parse(data.triggers);
            $('textarea').text(JSON.stringify(triggers, null, '\t'));

            let canvasJSON = JSON.parse(data.canvas);
            if (canvasJSON) {
                canvas.loadFromJSON(canvasJSON);
                loadObjectsToMemory();
            }

        }
    });
}

let generateTriggerConditionCode = function (conditionArray) {
    let conditions = "";
    conditionArray.map(function (conditionItem) {
        conditions = conditions + `${
            conditionItem.conditionStartGroupOperator || ''
        } ${
            conditionItem.firstVariable
        } ${
            conditionItem.condition
        } ${
            conditionItem.secondVariable
        } ${
            conditionItem.conditionCloseGroupOperator || ''
        } ${
            conditionItem.join || ''
        }`
    });
    return conditions;
}


let generateTriggerActionCode = function (actionArray) {
    let actions = "";
    actionArray.map(function (actionItem) {
        actions = actions + `${
            actionItem.object
        }.set('${
            actionItem.property
        }',${
            actionItem.value
        }); \n `
    });
    return actions;
}

let generateTrigger = function (type, conditions, actions) {
    return `${type} (${conditions}){
        ${actions}
    }`
}


let initCanvas = function (url) {
    if(!canvas){
    canvas = new fabric.Canvas('canvas');
    canvas.setHeight(500);
    canvas.setWidth(800);
    }
    restoreCanvas(url);
}


let testRun = function () {

    triggers.map(function (trigger) {
        eval(generateTrigger("if", generateTriggerConditionCode(trigger.conditions), generateTriggerActionCode(trigger.actions)));
        canvas.requestRenderAll();
    });

}

window.setInterval(testRun, 500);
