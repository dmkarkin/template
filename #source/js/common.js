"use strict";

var ua = window.navigator.userAgent;
var msie = ua.indexOf("MSIE ");
var isMobile = {
	Android: function Android() {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function BlackBerry() {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function iOS() {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function Opera() {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function Windows() {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function any() {
		return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
	}
};

function checkIsIE() {
	ua = navigator.userAgent;
	let isIE = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
	return isIE;
}

if (checkIsIE()) {
	document.querySelector('body').classList.add('is-IE');
}

if (isMobile.any()) {
	document.querySelector('body').classList.add('is-touch');
}

function testWebP(callback) {
	let webPTestImg = new Image();
	webPTestImg.onload = webPTestImg.onerror = function () {
		callback(webPTestImg.height == 2);
	};
	webPTestImg.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {
	if (support == true) {
		document.querySelector('body').classList.add('webp-compatible');
	}
});

if (document.querySelector('.wrapper')) {
	document.querySelector('.wrapper').classList.add('wrapper--was-loaded');
} 

//=================
//ActionsOnHash
if (location.hash) {
	var hsh = location.hash.replace('#', '');

	if (document.querySelector('.popup_' + hsh)) {
		popup_open(hsh);
	} else if (document.querySelector('div.' + hsh)) {
		gotoElm(document.querySelector('.' + hsh), 500, '');
	}
}

var bodyElm = document.querySelector('body');
var blockSectors = document.querySelectorAll('._scr-sector');
var itemsSectors = document.querySelectorAll('._scr-item');
let sectorMinHeight = 750;

//ScrollOnScroll
window.addEventListener('scroll', scrollOnDemaind);

function scrollOnDemaind() {
	bodyElm.setAttribute('data-scroll', pageYOffset);
	var headerElm = document.querySelector('header.header');
	bodyElm.setAttribute('data-scroll', pageYOffset);

	if (pageYOffset > 10) {
		headerElm.classList.add('_scroll');
	} else {
		headerElm.classList.remove('_scroll');
	}

	if (blockSectors.length > 0) {
		for (var i = 0; i < blockSectors.length; i++) {
			let itemBlock = blockSectors[i];
			var itemBlockOoffset = offset(itemBlock).top;
			var itemBlockHeight = itemBlock.offsetHeight;

			if (pageYOffset > itemBlockOoffset - window.innerHeight / 1.5 && pageYOffset < itemBlockOoffset + itemBlockHeight - window.innerHeight / 1.5) {
				itemBlock.classList.add('_scr-sector--active');
			} else {
				if (itemBlock.classList.contains('_scr-sector--active')) {
					itemBlock.classList.remove('_scr-sector--active');
				}
			}
			if (pageYOffset > itemBlockOoffset - window.innerHeight / 2 && pageYOffset < itemBlockOoffset + itemBlockHeight - window.innerHeight / 2) {
				if (!itemBlock.classList.contains('_scr-sector--current')) {
					itemBlock.classList.add('_scr-sector--current');
				}
			} else {
				if (itemBlock.classList.contains('_scr-sector--current')) {
					itemBlock.classList.remove('_scr-sector--current');
				}
			}
		}
	}

	if (itemsSectors.length > 0) {
		for (var i = 0; i < itemsSectors.length; i++) {
			let currentSector = itemsSectors[i];
			let currentSectorOffset = offset(currentSector).top;
			let currentSectorHeight = currentSector.offsetHeight;

			if (pageYOffset > currentSectorOffset - window.innerHeight / 1.5 && pageYOffset < currentSectorOffset + currentSectorHeight - window.innerHeight / 1.5) {
				currentSector.classList.add('is-activated');
				scrollOnLoadItem(currentSector);
			} else {
				currentSector.classList.remove('is-activated');
			}
		}
	}
}

setTimeout(function () {
	scrollOnDemaind();
}, 100);

function scrollOnLoadItem(itemSector) {
	if (itemSector.classList.contains('_load-map') && !itemSector.classList.contains('_loaded-map')) {
		let mapItem = document.getElementById('map');

		if (mapItem) {
			itemSector.classList.add('_loaded-map');
			map();
		}
	}
}


let linksGotoBlock = document.querySelectorAll('._goto-block');

if (linksGotoBlock) {
	let blocksNames = [];

	var loopGotoBlock = function loop7(itemBlock) {
		let elm = linksGotoBlock[itemBlock];
		let blockNameToGo = elm.getAttribute('href').replace('#', '');

		if (blockNameToGo != '' && !~blocksNames.indexOf(blockNameToGo)) {
			blocksNames.push(blockNameToGo);
		}

		elm.addEventListener('click', function (e) {
			if (document.querySelector('.menu__body--is-activated')) {
				closeMenu();
				removeLockFromBody(500);
			}
			let targetBlock = document.querySelector('.' + blockNameToGo);
			gotoElm(targetBlock, 300);
			e.preventDefault();
		});
	};

	for (var i = 0; i < linksGotoBlock.length; i++) {
		loopGotoBlock(i);
	}

	window.addEventListener('scroll', function (el) {
		let oldLink = document.querySelectorAll('._goto-block.is-activated');

		if (oldLink) {
			for (var i = 0; i < oldLink.length; i++) {
				let currentElm = oldLink[i];
				currentElm.classList.remove('is-activated');
			}
		}

		for (var i = 0; i < blocksNames.length; i++) {
			let itemBlockName = blocksNames[i];
			let itemBlockElm = document.querySelector('.' + itemBlockName);

			if (itemBlockElm) {
				let itemBlockOffset = offset(itemBlockElm).top;
				let itemBlockHeight = itemBlockElm.offsetHeight;

				if (pageYOffset > itemBlockOffset - window.innerHeight / 3 && pageYOffset < itemBlockOffset + itemBlockHeight - window.innerHeight / 3) {
					let currentLinks = document.querySelectorAll('._goto-block[href="#' + itemBlockName + '"]');

					for (var i = 0; i < currentLinks.length; i++) {
						let currentLink = currentLinks[i];
						currentLink.classList.add('is-activated');
					}
				}
			}
		}
	});
} 

//ScrollOnClick (Simple)
var gotoLinks = document.querySelectorAll('.goto-on-click');

if (gotoLinks) {
	var loopGoto = function _loop8(elm) {
		let gotoLink = gotoLinks[elm];
		gotoLink.addEventListener('click', function (e) {
			let targetBlockClass = gotoLink.getAttribute('href').replace('#', '');
			let targetElm = document.querySelector('.' + targetBlockClass);
			gotoElm(targetElm, 300);
			e.preventDefault();
		});
	};

	for (var i = 0; i < gotoLinks.length; i++) {
		loopGoto(i);
	}
}

function gotoElm(target_block, speed) {
	var offset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
	var header = ''; //OffsetHeader

	header = 'header';
	var options = {
		speedAsDuration: true,
		speed: speed,
		header: header,
		offset: offset
	};
	var scr = new SmoothScroll();
	scr.animateScroll(target_block, '', options);
} //SameFunctions


function offset(el) {
	var rect = el.getBoundingClientRect(),
		scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
		scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	return {
		top: rect.top + scrollTop,
		left: rect.left + scrollLeft
	};
}

function disableScroll() {
	if (window.addEventListener) // older FF
		window.addEventListener('DOMMouseScroll', preventDefault, false);
	document.addEventListener('wheel', preventDefault, {
		passive: false
	}); // Disable scrolling in Chrome

	window.onwheel = preventDefault; // modern standard

	window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE

	window.ontouchmove = preventDefault; // mobile

	document.onkeydown = preventDefaultForScrollKeys;
}

function enableScroll() {
	if (window.removeEventListener) window.removeEventListener('DOMMouseScroll', preventDefault, false);
	document.removeEventListener('wheel', preventDefault, {
		passive: false
	}); // Enable scrolling in Chrome

	window.onmousewheel = document.onmousewheel = null;
	window.onwheel = null;
	window.ontouchmove = null;
	document.onkeydown = null;
}

function preventDefault(e) {
	e = e || window.event;
	if (e.preventDefault) e.preventDefault();
	e.returnValue = false;
}

function preventDefaultForScrollKeys(e) {
	/*if (keys[e.keyCode]) {
		  preventDefault(e);
		  return false;
	}*/
}
