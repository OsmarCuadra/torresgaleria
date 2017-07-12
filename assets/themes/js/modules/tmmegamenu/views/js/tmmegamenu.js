var responsiveflagTMMenu = false;
var TmCategoryMenu = $('ul.menu');
var TmCategoryGrover = $('.top_menu .menu-title');
$(document).ready(function() {
  TmCategoryMenu = $('ul.menu');
  TmCategoryGrover = $('.top_menu .menu-title');
  setColumnClean();
  responsiveTmMenu();
  $(window).resize(responsiveTmMenu);
});
// check resolution
function responsiveTmMenu() {
  if ($(document).width() <= 1199 && responsiveflagTMMenu == false) {
    menuChange('enable');
    responsiveflagTMMenu = true;
  } else if ($(document).width() >= 1200) {
    menuChange('disable');
    responsiveflagTMMenu = false;
  }
}
function TmdesktopInit() {
  TmCategoryGrover.off();
  TmCategoryGrover.removeClass('active');
  $('.menu > li > ul, .menu > li > ul.is-simplemenu ul, .menu > li > div.is-megamenu')
    .removeClass('menu-mobile')
    .parent()
    .find('.menu-mobile-grover')
    .remove();
  $('.menu').removeAttr('style');
  TmCategoryMenu.superfish('init');
  //add class for width define
  $('.menu > li > ul').addClass('submenu-container clearfix');
}
function TmmobileInit() {
  var TmclickEventType = ((document.ontouchstart !== null) ? 'click' : 'touchstart');
  TmCategoryMenu.superfish('destroy');
  $('.menu').removeAttr('style');
  TmCategoryGrover.on(TmclickEventType, function(e) {
    $(this)
      .toggleClass('active')
      .parent()
      .find('ul.menu')
      .stop()
      .slideToggle('medium');
    return false;
  });
  $('.menu > li > ul, .menu > li > div.is-megamenu, .menu > li > ul.is-simplemenu ul, div.is-megamenu ul.content > li > ul')
    .addClass('menu-mobile clearfix')
    .before('<span class="menu-mobile-grover"></span>');
  $('.menu .menu-mobile-grover').on(TmclickEventType, function(e) {
    var catSubUl = $(this).next('.menu-mobile');
    if (catSubUl.is(':hidden')) {
      catSubUl.slideDown();
      $(this).addClass('active');
    } else {
      catSubUl.slideUp();
      $(this).removeClass('active');
    }
    return false;
  });
  $('.top_menu > ul:first > li > a, .block_content > ul:first > li > a').on(TmclickEventType, function(e) {
    var parentOffset = $(this).prev().offset();
    var relX = parentOffset.left - e.pageX;
    if ($(this).parent('li').find('ul').length && relX >= 0 && relX <= 20) {
      e.preventDefault();
      var mobCatSubUl = $(this).next('.menu-mobile');
      var mobMenuGrover = $(this).prev();
      if (mobCatSubUl.is(':hidden')) {
        mobCatSubUl.slideDown();
        mobMenuGrover.addClass('active');
      } else {
        mobCatSubUl.slideUp();
        mobMenuGrover.removeClass('active');
      }
    }
  });
  $(document).mouseup(function(e) {
    if ($('.top_menu').has(e.target).length === 0 && responsiveflagTMMenu) {
      TmCategoryMenu.slideUp();
      TmCategoryGrover.removeClass('active');
    }
  });
}
// change the menu display at different resolutions
function menuChange(status) {
  status == 'enable' ? TmmobileInit() : TmdesktopInit();
}
function setColumnClean() {
  $('.menu div.is-megamenu > div').each(function() {
    i = 1;
    $(this).children('.megamenu-col').each(function(index, element) {
      if (i % 3 == 0) {
        $(this).addClass('first-in-line-sm');
      }
      i++;
    });
  });
}