// mouse wheeo scroll code
const body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body'),
  section = $('section');

var numOfPages = section.length - 1,
  curPage = 0,
  scrollLock = false;

function scrollPage() {

  $(document).on("mousewheel DOMMouseScroll", function (e) {
    if (scrollLock) return;
    if (e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0)
      navigateUp();
    else
      navigateDown();
  });

  $(document).on("keydown", function (e) {
    if (scrollLock) return;
    if (e.which === 38)
      navigateUp();
    else if (e.which === 40)
      navigateDown();
  });
}

function pagination() {
  scrollLock = true;
  body.stop().animate({
    scrollTop: section.eq(curPage).offset().top
  }, 600, 'swing', function () {
    scrollLock = false;
  });
};

function navigateUp() {
  if (curPage === 0) return;
  curPage--;
  pagination();
};

function navigateDown() {
  if (curPage === numOfPages) return;
  curPage++;
  pagination();
};


$(function () {
  scrollPage();
});



// popup open code
function openPopup(el) {
  $('.popup').hide();
  $('#' + el).fadeIn(200);
}

function closePopup() {
  $('.popup').fadeOut(300);
}

// bodycontent change
// $('.show').click(function () {
//   $(".show-active").removeClass("show-active");
//   $(this).addClass("show-active");
//   $('#content' + $(this).attr('target')).fadeIn(600).siblings('section').fadeOut(600);
//   e.stopPropagation();
// });

// mouse cursor custom code


// main text animation 효과
const mainTextOne = $('.main-text-box p:first-child');
const mainTextTwo = $('.main-text-box p:nth-child(2)');
const mainTextThree = $('.main-text-box p:last-child');

mainTextOne.animate({'margin-left':'0px', 'opacity':'1'}, 1000);
mainTextTwo.delay(1000).animate({'margin-left' : '0px', 'opacity':'1'}, 1300);
mainTextThree.delay(2300).animate({'margin-left' : '0px', 'opacity':'1'}, 1600);


// project-careers animation효과 (더 효율적으로 쓸수 있는 방법...?)
const projectOne = $('.project-careers li:first-child');
const projectTwo = $('.project-careers li:nth-child(2)');
const projectThree = $('.project-careers li:nth-child(3)');
const projectFour = $('.project-careers li:nth-child(4)');
const projectFive = $('.project-careers li:nth-child(5)');
const projectSix = $('.project-careers li:nth-child(6)');
const projectSeven = $('.project-careers li:nth-child(7)');
const projectEight = $('.project-careers li:nth-child(8)');
const projectNine = $('.project-careers li:nth-child(9)');
const projectTen = $('.project-careers li:nth-child(10)');

const careersOne = $('.careers li:nth-child(1)');
const careersTwo = $('.careers li:nth-child(2)');
const careersThree = $('.careers li:nth-child(3)');
const careersFour = $('.careers li:nth-child(4)');

projectOne.animate({'margin-top':'0px', 'opacity':'1'}, 1000);
projectTwo.animate({'margin-top':'0px', 'opacity':'1'}, 1200);
projectThree.animate({'margin-top':'0px', 'opacity':'1'}, 1400);
projectFour.animate({'margin-top':'0px', 'opacity':'1'}, 1600);
projectFive.animate({'margin-top':'0px', 'opacity':'1'}, 1800);
projectSix.animate({'margin-top':'0px', 'opacity':'1'}, 2000);
projectSeven.animate({'margin-top':'0px', 'opacity':'1'}, 2200);
projectEight.animate({'margin-top':'0px', 'opacity':'1'}, 2400);
projectNine.animate({'margin-top':'0px', 'opacity':'1'}, 2400);
projectTen.animate({'margin-top':'0px', 'opacity':'1'}, 2400);

careersOne.animate({'margin-top':'0px', 'opacity':'1'}, 2600);
careersTwo.animate({'margin-top':'0px', 'opacity':'1'}, 2800);
careersThree.animate({'margin-top':'0px', 'opacity':'1'}, 2600);
careersFour.animate({'margin-top':'0px', 'opacity':'1'}, 2800);


// careers animation 효과


