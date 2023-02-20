/**
 * Full page
 */
(function () {
	'use strict';
	
	/**
	 * Full scroll main function
	 */
	var fullScroll = function (params) {
		/**
		 * Main div
		 * @type {Object}
		 */
		var main = document.getElementById(params.mainElement);
		
		/**
		 * Sections divclass
		 * @type {Array}
		 */
		var sections = main.getElementsByTagName('section');
		
		/**
		 * Full page scroll configurations
		 * @type {Object}
		 */
		var defaults = {
			container : main,
			sections : sections,
			animateTime : params.animateTime || 0.7,
			animateFunction : params.animateFunction || 'ease',
			maxPosition: sections.length - 1,
			currentPosition: 0,
			displayDots: typeof params.displayDots != 'undefined' ? params.displayDots : true,
			dotsPosition: params.dotsPosition || 'left'
		};

		this.defaults = defaults;
		/**
		 * Init build
		 */
		this.init();
	};

	/**
	 * Init plugin
	 */
	fullScroll.prototype.init = function () {
		this.buildPublicFunctions()
			.buildSections()
			.buildDots()
			.addEvents();

		var anchor = location.hash.replace('#', '').split('/')[0];
		location.hash = 0;
		this.changeCurrentPosition(anchor);
		this.registerIeTags();
	};

	/**
	 * Build sections
	 * @return {Object} this(fullScroll)
	 */
	fullScroll.prototype.buildSections = function () {
		var sections = this.defaults.sections;
		for (var i = 0; i < sections.length; i++) {
			sections[i].setAttribute('data-index', i);
		}
		return this;
	};

	/**
	 * Build dots navigation
	 * @return {Object} this (fullScroll)
	 */
	fullScroll.prototype.buildDots = function () {		
		this.ul = document.createElement('ul');
		
		this.ul.className = this.updateClass(1, 'dots', this.ul.className);
		this.ul.className = this.updateClass(1, this.defaults.dotsPosition == 'right' ? 'dots-right' : 'dots-left', this.ul.className);

		var _self = this;
		var sections = this.defaults.sections;		

		for (var i = 0; i < sections.length; i++) {
			var li = document.createElement('li');
			var a = document.createElement('a');
		
			a.setAttribute('href', '#' + i);			
			li.appendChild(a);
			_self.ul.appendChild(li);
		}

		this.ul.childNodes[0].firstChild.className = this.updateClass(1, 'active', this.ul.childNodes[0].firstChild.className);

		if (this.defaults.displayDots) {
			document.body.appendChild(this.ul);
		}

		return this;
	};

	/**
	 * Add Events
	 * @return {Object} this(fullScroll)
	 */
	fullScroll.prototype.addEvents = function () {
		
		if (document.addEventListener) {
			document.addEventListener('mousewheel', this.mouseWheelAndKey, false);
			document.addEventListener('wheel', this.mouseWheelAndKey, false);
			document.addEventListener('keyup', this.mouseWheelAndKey, false);
			document.addEventListener('touchstart', this.touchStart, false);
			document.addEventListener('touchend', this.touchEnd, false);
			window.addEventListener("hashchange", this.hashChange, false);

			/**
			 * Enable scroll if decive don't have touch support
			 */
			if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
				if(!('ontouchstart' in window)){
					document.body.style = "overflow: scroll;";
					document.documentElement.style = "overflow: scroll;";
				}
			}			

		} else {
			document.attachEvent('onmousewheel', this.mouseWheelAndKey, false);
			document.attachEvent('onkeyup', this.mouseWheelAndKey, false);
		}
		
		return this;
	};	

	/**
	 * Build public functions
	 * @return {[type]} [description]
	 */
	fullScroll.prototype.buildPublicFunctions = function () {
		var mTouchStart = 0;
		var mTouchEnd = 0;
		var _self = this;

		this.mouseWheelAndKey = function (event) {
			if (event.deltaY > 0 || event.keyCode == 40) {	
				_self.defaults.currentPosition ++;
				_self.changeCurrentPosition(_self.defaults.currentPosition);				
			} else if (event.deltaY < 0 || event.keyCode == 38) {
				_self.defaults.currentPosition --;
				_self.changeCurrentPosition(_self.defaults.currentPosition);	
			}
			_self.removeEvents();
		};

		this.touchStart = function (event) {
			mTouchStart = parseInt(event.changedTouches[0].clientY);
			mTouchEnd = 0;
		};

		this.touchEnd = function (event) {
			mTouchEnd = parseInt(event.changedTouches[0].clientY);
			if (mTouchEnd - mTouchStart > 100 || mTouchStart - mTouchEnd > 100) {
				if (mTouchEnd > mTouchStart) {
					_self.defaults.currentPosition --;
				} else {
					_self.defaults.currentPosition ++;					
				}
				_self.changeCurrentPosition(_self.defaults.currentPosition);
			}			
		};

		this.hashChange = function (event) {
			if (location) {
				var anchor = location.hash.replace('#', '').split('/')[0];
				if (anchor !== "") {
					if (anchor < 0) {
						_self.changeCurrentPosition(0);
					} else if (anchor > _self.defaults.maxPosition) {
						_self.changeCurrentPosition(_self.defaults.maxPosition);
					} else {
						_self.defaults.currentPosition = anchor;
						_self.animateScroll();
					}					
				}				
			}
		};

		this.removeEvents = function () {
			if (document.addEventListener) {
			document.removeEventListener('mousewheel', this.mouseWheelAndKey, false);
			document.removeEventListener('wheel', this.mouseWheelAndKey, false);
			document.removeEventListener('keyup', this.mouseWheelAndKey, false);
			document.removeEventListener('touchstart', this.touchStart, false);
			document.removeEventListener('touchend', this.touchEnd, false);

			} else {
				document.detachEvent('onmousewheel', this.mouseWheelAndKey, false);
				document.detachEvent('onkeyup', this.mouseWheelAndKey, false);
			}

			setTimeout(function(){
				_self.addEvents();
			}, 600);
		};

		this.animateScroll = function () {
			var animateTime = this.defaults.animateTime;
			var animateFunction = this.defaults.animateFunction;
			var position = this.defaults.currentPosition * 100;

			this.defaults.container.style.webkitTransform = 'translateY(-' + position + '%)';
			this.defaults.container.style.mozTransform = 'translateY(-' + position + '%)';
			this.defaults.container.style.msTransform = 'translateY(-' + position + '%)';
			this.defaults.container.style.transform = 'translateY(-' + position + '%)';
			this.defaults.container.style.webkitTransition = 'all ' + animateTime + 's ' + animateFunction;
			this.defaults.container.style.mozTransition = 'all ' + animateTime + 's ' + animateFunction;
			this.defaults.container.style.msTransition = 'all ' + animateTime + 's ' + animateFunction;
			this.defaults.container.style.transition = 'all ' + animateTime + 's ' + animateFunction;

			for (var i = 0; i < this.ul.childNodes.length; i++) {
					this.ul.childNodes[i].firstChild.className = this.updateClass(2, 'active', this.ul.childNodes[i].firstChild.className);
					if (i == this.defaults.currentPosition) {
					this.ul.childNodes[i].firstChild.className = this.updateClass(1, 'active', this.ul.childNodes[i].firstChild.className);
				}
			}
		};

		this.changeCurrentPosition = function (position) {
			if (position !== "") {
				_self.defaults.currentPosition = position;
				location.hash = _self.defaults.currentPosition;
			}
		};

		this.registerIeTags = function () {
			document.createElement('section'); 
		};

		this.updateClass = function (type, newClass, currentClass) {
			if (type == 1) {
				return currentClass += ' ' + newClass;
			} else if (type == 2) {
				return currentClass.replace(newClass, '');
			}
		};

		return this;
	};
	window.fullScroll = fullScroll;
})();

const overlay = document.querySelector(".slide-overlay");
let slides = document.querySelectorAll(".slides > li");
let slidePhoto = document.querySelectorAll(".slides > li>img");
const slide = document.querySelector(".slides");
const thumbnails = document.querySelectorAll(".box__gallery > li");
const photoCount = slides.length;
const duration = 400;
let bullets = 0;
let photoIndex = 0;

// 갤러리 모달창 이벤트
thumbnails.forEach((thumbnail) => {
  thumbnail.addEventListener("click", (e) => {
    e.preventDefault();
    overlay.style.display = "block";
    // 썸네일 원본 사진과 갤러리 슬라이드 이미지 소스 링크 연결
    for (let i = 0; i < thumbnails.length; i++) {
      let photo = thumbnails[i].lastElementChild;
      slidePhoto[i].src = photo.href;
    }
  });
});
document.querySelector(".close-btn").addEventListener("click", () => {
  overlay.style.display = "none";
});

// bullet 이미지 개수에 맞게 생성하는 함수
function createBullets() {
  // bullet들의 리스트를 생성
  const bulletsList = document.createElement("ul");
  bulletsList.setAttribute("id", "bullets");
  overlay.appendChild(bulletsList);
  // 이미지 개수대로 bullet를 생성
  slides.forEach((slide, index) => {
    const a = document.createElement("a");
    a.setAttribute("href", "#");
    // 이미지의 index를 a의 html에 집어넣음 (나중에 이미지 이동할 때 주소 역할이 되어줌)
    a.innerHTML = `${index}`;
    const li = document.createElement("li");
    li.appendChild(a);
    bulletsList.appendChild(li);
  });
  return (bullets = document.querySelectorAll("#bullets > li > a"));
}
createBullets();
bulletLink();


// bullet을 클릭하면 해당하는 번호의 이미지로 슬라이드 되는 함수
function bulletLink() {
  bullets.forEach((bullet, index) => {
    bullet.addEventListener("click", (e) => {
      e.preventDefault();
      // 클릭된 bullet의 인덱스
      const clickedIndex = index;
      // 현재 bullet과 클릭된 bullet의 차이
      let step = clickedIndex - photoIndex;
      photoIndex = clickedIndex;
      //모든 bullet의 클래스를 없애고 클릭된 bullet에만 on 클래스 추가
      bulletClassReset();
      bullets[clickedIndex].classList.add("on");

      // 클릭할 때마다 순서가 바뀌는 slides들 업뎃
      slides = document.querySelectorAll(".slides>li")
      let currentSlides = [...slides];
      //step이 양수: 현재 요소보다 뒤에 오는 요소로 이동
      if (step > 0) {
        // 이미지 슬라이드 step의 수 만큼 앞에서 자른다
        let sliceSlides = currentSlides.slice(undefined, step);
        slide.style.transition = duration+"ms";
        slide.style.left=step * -100+"%";
        window.setTimeout(() => {
          slide.removeAttribute("style");
          // 잘린 요소들을 맨 뒤로 집어넣기..
          slide.append(...sliceSlides);
        }, duration);
      } else {
        // step이 음수: 현재 요소보다 앞에 있는 요소로 이동
        sliceSlides = currentSlides.slice(step);
        // 잘린 요소들을 맨 앞으로 집어넣기
        slide.prepend(...sliceSlides);
        slide.style.left = step * 100 + "%";
        window.setTimeout(()=>{ 
            slide.style.left = 0;
            slide.style.transition = duration+"ms";
        })
      }
      //서로 같은 경우 이동할 필요가 없기 때문에 함수 즉시 종료
      if (step==0) return;
    });
  });
}
//썸네일을 클릭하면 해당하는 사진으로 점프
thumbnails.forEach((thumbnail, index) => {
    // 클릭 이벤트 추가
    thumbnail.addEventListener("click", (e) => {
      e.preventDefault();
      const clickedIndex = index;
      let step = clickedIndex - photoIndex;
      photoIndex = clickedIndex;
      bulletClassReset();
      bullets[clickedIndex].classList.add("on");
      // 클릭할 때마다 순서가 바뀌는 slides들 업뎃
      slides = document.querySelectorAll(".slides>li");
      let currentSlides = [...slides];
      if (step > 0) {
        // 이미지 슬라이드 step의 수 만큼 앞에서 자른다
        let sliceSlides = currentSlides.slice(undefined, step);
          // 잘린 슬라이드들 맨 뒤로 집어넣기..
        slide.append(...sliceSlides);
      } else {
        sliceSlides = currentSlides.slice(step);
        // 잘린 슬라이드들 맨 앞으로 집어넣기
        slide.prepend(...sliceSlides);
      }
    });
  });





// 슬라이드 버튼 클릭 이벤트
document.querySelector(".--next").addEventListener("click", nextSlideImage);
document.querySelector(".--prev").addEventListener("click", prevSlideImage);

// 다음 사진으로 슬라이드
function nextSlideImage() {
  photoIndex++;
  photoIndex %= photoCount;
  slide.style.left = "-100%";
  slide.style.transition = duration + "ms";
  window.setTimeout(() => {
    slide.appendChild(slide.firstElementChild);
    slide.removeAttribute("style");
  }, duration);
  bulletClassReset();
  //해당하는 bullet에 on 클래스 넣기
  bulletIndex();
}
// 이전 사진으로 슬라이드
function prevSlideImage() {
  photoIndex--;
  photoIndex %= photoCount;
  slide.insertBefore(slide.lastElementChild, slide.firstChild);
  slide.style.left = "-100%";
  slide.style.transition = "0ms";
  window.setTimeout(() => {
    slide.style.left = 0;
    slide.style.transition = duration+"ms";
  });
  bulletClassReset();
  //해당하는 bullet에 on 클래스 넣기
  bulletIndex();
}

// 모든 bullet의 on 클래스를 삭제
function bulletClassReset() {
  bullets.forEach((bullet) => {
    bullet.classList.remove("on");
  });
}

//해당하는 bullet에 on 클래스 넣기
function bulletIndex() {
  // photoIndex가 음수일 때를 고려
  let index = photoIndex + bullets.length;
  index %= bullets.length;
  bullets[index].classList.add("on");
}
