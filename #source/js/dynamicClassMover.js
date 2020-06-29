// HTML attr: data-move="where(uniq class name),position(digi),when(breakpoint)"
// e.x. data-move="item,2,992"
// Andrikanych Yevhen 2020
var objects = [];
var movedObjects = document.querySelectorAll("[data-move]");

if (movedObjects.length > 0) {
	for (var i = 0; i < movedObjects.length; i++) {
		var itemObject = movedObjects[i];
		var attrValue = itemObject.getAttribute("data-move");
		if (attrValue != "" || attrValue != null) {
			itemObject.setAttribute("data-move-index", i);

			objects[i] = {
				parent: itemObject.parentNode,
				index: getIndexInParent(itemObject)
			};
		}
	}
}

function dynamicClassMover() {
	var currentWidth = document.querySelector("body").offsetWidth;

	if (movedObjects.length > 0) {
		for (var i = 0; i < movedObjects.length; i++) {
			var itemObject = movedObjects[i];
			var dataMoveValue = itemObject.getAttribute("data-move");

			if (dataMoveValue != "" || dataMoveValue != null) {
				var dataArray = dataMoveValue.split(",");
				var moveTo = document.querySelector("." + dataArray[0]);
				var indexTo = dataArray[1];
				var moveOnBreakPoint = dataArray[2];

				if (currentWidth < moveOnBreakPoint) {
					if (!itemObject.classList.contains("dynamic-move--done-" + moveOnBreakPoint)) {
						if (indexTo > 0) {
							//insert object
							var actualIndex = getIndexesOfElm(moveTo)[indexTo];
							moveTo.insertBefore(itemObject, moveTo.childNodes[actualIndex]);
						} else {
							moveTo.insertBefore(itemObject, moveTo.firstChild);
						}

						itemObject.classList.add("dynamic-move--done-" + moveOnBreakPoint);
					}
				} else {
					if (itemObject.classList.contains("dynamic-move--done-" + moveOnBreakPoint)) {
						dynamicMoveBack(itemObject);
						itemObject.classList.remove("dynamic-move--done-" + moveOnBreakPoint);
					}
				}
			}
		}
	}
	custom_adapt(currentWidth);
}

function dynamicMoveBack(el) {
	var indexOriginal = el.getAttribute("data-move-index");
	var movedObj = objects[indexOriginal];
	var parentPlace = movedObj["parent"];
	var indexPlace = movedObj["index"];

	if (indexPlace > 0) {
		//insertAfter
		var actualIndex = getIndexesOfElm(parentPlace)[indexPlace];
		parentPlace.insertBefore(el, parentPlace.childNodes[actualIndex]);
	} else {
		parentPlace.insertBefore(el, parentPlace.firstChild);
	}
}

function getIndexInParent(node) {
	var children = node.parentNode.childNodes;
	var index = 0;

	for (var i = 0; i < children.length; i++) {
		if (children[i] == node) return index;
		if (children[i].nodeType == 1) index++;
	}

	return -1;
}

function getIndexesOfElm(parent) {
	var children = [];

	for (var i = 0; i < parent.childNodes.length; i++) {
		if (parent.childNodes[i].nodeType == 1 && parent.childNodes[i].getAttribute("data-move") == null) {
			children.push(i);
		}
	}

	return children;
}

window.addEventListener("resize", function (event) {
	dynamicClassMover();
});
dynamicClassMover();

function custom_adapt(w) { }