//======Menu======
var iconMenu = document.querySelector(".icon-menu");

if (iconMenu != null) {
	var delay = 500;
	var body = document.querySelector("body");
	var menuBody = document.querySelector(".menu__body");
	iconMenu.addEventListener("click", function (e) {
		if (!body.classList.contains('_wait')) {
			setBodyLocked(delay);
			iconMenu.classList.toggle("icon-menu--is-activated");
			menuBody.classList.toggle("menu__body--is-activated");
		}
	});
}

function closeMenu() {
	var iconMenu = document.querySelector(".icon-menu");
	var menuBody = document.querySelector(".menu__body");
	iconMenu.classList.remove("icon-menu--is-activated");
	menuBody.classList.remove("menu__body--is-activated");
} 
//=================

//======BodyLock======
function setBodyLocked(delay) {
	var body = document.querySelector("body");

	if (body.classList.contains('body--is-locked')) {
		removeLockFromBody(delay);
	} else {
		addLockToBody(delay);
	}
}

function removeLockFromBody(delay) {
	var body = document.querySelector('body');

	if (!body.classList.contains('body--wait')) {
		var lockPadding = document.querySelectorAll('.lock-padding');
		setTimeout(function () {
			for (var index = 0; index < lockPadding.length; index++) {
				var el = lockPadding[index];
				el.style.paddingRight = '0px';
			}

			body.style.paddingRight = '0px';
			body.classList.remove('body--is-locked');
		}, delay);
		body.classList.add('body--is-waiting');
		setTimeout(function () {
			body.classList.remove('body--is-waiting');
		}, delay);
	}
}

function addLockToBody(delay) {
	var body = document.querySelector('body');

	if (!body.classList.contains('body--is-waiting')) {
		var lock_padding = document.querySelectorAll('.lock-padding');

		for (var index = 0; index < lock_padding.length; index++) {
			var el = lock_padding[index];
			el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		}

		body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		body.classList.add('body--is-locked');
		body.classList.add('body--is-waiting');
		setTimeout(function () {
			body.classList.remove('body--is-waiting');
		}, delay);
	}
}
 //=================