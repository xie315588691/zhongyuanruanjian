$(document).ready(function () {

  // 返回顶部
  $("#backTop").on("click",move);

  $(window).on("scroll",function(){
    var clientHeight = $(window).height()
    console.log(clientHeight);
    checkPosition(clientHeight);
  });
  // checkPosition(10);

  function move(){
    $("html,body").animate({
      scrollTop:0
    },10);
  }
  function checkPosition(pos){
    if($(window).scrollTop()>pos){
      $("#backTop").fadeIn();
    }else {
      $("#backTop").fadeOut();
    }
  }

  // swiper
  // var mySwiper = new Swiper('.swiper-container', {
  //   loop: true, // 无缝切换
  //   autoplay: 10000,//可选选项，自动滑动 ms
  //   pagination : '.pagination',
  //   paginationClickable: true,
  //   autoplayDisableOnInteraction : false
  // })
  var bannerLength = $('.swiper-container .w-slider').length;
  console.log(bannerLength);
  if (bannerLength > 1) {
    var mySwiper = new Swiper('.hm-banner .swiper-container', {
      loop: true, // 无缝切换
      autoplay: 5000,//可选选项，自动滑动 ms
      pagination : '.hm-banner .pagination',
      paginationClickable: true,
      autoplayDisableOnInteraction : false
    })
  } else {
    var mySwiper = new Swiper('.hm-banner .swiper-container', {
      loop: false, // 无缝切换
      autoplay: false,//可选选项，自动滑动 ms
    })
  }

  $('.banner-mask').addClass('mask-hidden');


//首页-方案
  $('.card-item').each(function () {
    $(this).mouseover(function () {
      $(this).css("z-index", "2");
      $(this).find(".card-bg").addClass('current-hover');
      $(this).siblings().css("z-index", "1");
      $(this).siblings().find(".card-bg").removeClass('current-hover');
    });
  });

//首页-企业&个人服务
  // $('.hm-ser .ser-setion').mouseover(function () {
  //   $('.hm-ser .self-bg').removeClass('active');
  //   $(this).addClass('active');
  // })
  // $('.hm-ser .self-bg').mouseover(function () {
  //   $('.hm-ser .group-bg').removeClass('active');
  //   $(this).addClass('active');
  // })
  $('.hm-ser .ser-setion').each(function () {
    $(this).mouseover(function () {
      $('.hm-ser .ser-setion.active').removeClass('active');
      $(this).addClass('active');
    })
  })


  // 链接跳转处理
  var currentHostName = window.location.hostname.toLowerCase();

  $('body').on('click', 'a', function () {
    var _href = _originHref = $(this).attr('href');
    var _target = $(this).attr('target');
    _href = _originHref.toLowerCase();

    if (isURL(_href)) {
      event.preventDefault();
      if (currentHostName === this.hostname && _target !== '_blank') {
        window.location.href = _originHref;
      } else {
        window.open(_originHref);
      }
    }
  })

  // 验证url
  function isURL(str_url) {
      return !!str_url.match(/(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g);
  }


  // 关于我们导航栏
  $(window).on("scroll",function(){
    var _width = $(window).width()
    if (_width < 768) {
      hrefFlex(254-57);
    } else if (_width < 991) {
      hrefFlex(445-57);
    } else {
      hrefFlex(500-57);
    }
  });

  function hrefFlex(position) {
    if($(window).scrollTop() > position) {
      $('.href-container').addClass('href-flex');
      $('.href-paddingfix').addClass('on');
    } else {
      $('.href-container').removeClass('href-flex');
      $('.href-paddingfix').removeClass('on');
    }
  }

  // header 遮罩层
  // header 按钮监听
  
  var _canScroll = true;
  $('.hm-header .navbar-toggle').on('click' ,function () {
    // debugger;
    if ($(window).width() > 768) {
      return;
    }

    if ($(this).hasClass('collapsed')) {
      // console.log('show');

      $('.navbar-collapse-mask').addClass('mask-show');
      $('body,html').addClass('notScroll'); 
      _canScroll = false;
    } else {
      // console.log('hidden');
      $('.navbar-collapse-mask').removeClass('mask-show');
      $('body,html').removeClass('notScroll');
      _canScroll = true;
    }
  });

  $('.navbar-collapse-mask').on('click', function () {
    $('.hm-header .navbar-toggle').click();
  })
  // 兼容移动端禁止滚动
  $('.navbar-collapse-mask').on('touchmove', function (e) {
    if (!_canScroll) {
      e.stopPropagation();
      e.preventDefault();
    }
  })
  $('.hm-header').on('touchmove', function (e) {
    if (!_canScroll) {
      e.stopPropagation();
      e.preventDefault();
    }
  })


  // 表单提交
  $('#submit').on('click', function () {
    $.myPlugin.inputInit();

    var company = typeof($('input[name="company"]').val()) != 'undefined' ? $('input[name="company"]').val().trim() : '';
    var name = $('input[name="user_name"]').val().trim();
    var phone = $('input[name="phone"]').val().trim();
    var mome = typeof($('#mome').val()) != 'undefined' ? $('#mome').val().trim() : '';
    var preUrl = $('input[name="incomeUrl"]').val().trim();
    var sid = $('input[name="sid"]').val().trim();
    var _token = $('input[name="_token"]').val();
    var group = $('input[name="group"]').val().trim();
    // debugger;

    if (!phone) {
      $.myPlugin.inputError('#phone', '请填写手机号码');
      $('#phone')[0].focus();
      return;
    }
    if (!(/^1[34578]\d{9}$/.test(phone))) {
      $.myPlugin.inputError('#phone', '手机号格式错误');
      return;
    }

    $.post('/message/save', {
      'company': company,
      'name': name,
      'phone': phone,
      'customer_remark': mome,
      'preUrl': preUrl,
      'sid': sid,
      '_token': _token,
      'group': group
    }, function() {
      $.myPlugin.showToast('提交成功，24小时内会有业务经理与您联系', 3000);
    })
    // showToast('提交成功，24小时内会有业务经理与您联系', 3000);
  });


  // 表单聚焦
  $(window).on('resize', function () {
      var _currentElement = document.activeElement.tagName;
      if (_currentElement.tagName == 'INPUT' || _currentElement.tagName == 'TEXTAREA') {

          window.setTimeout(function () {
              _currentElement.scrollIntoViewIfNeeded();
          }, 100);
      }
  })

})

jQuery.myPlugin = {

  // 输入框错误提示
  inputError: function (id, content) {
    $(id).parent().addClass('ms-i-err').attr('data-err', content);
  },

  // 初始输入框
  inputInit: function () {
    $('.ms-i-wrapper').each(function () {
      $(this).removeClass('ms-i-err').attr('data-err', '');
    })
  },

  // type 默认不传，success
  showToast: function (msg, duration, type) {
    duration = isNaN(duration) ? 3000 : duration;

    var _dom
    if (type) {
      _dom = '<div class=\"ms-toast ' + type + '\"></div>';
    } else {
      _dom = '<div class=\"ms-toast\"></div>';
    }

    var m = $(_dom)
      .text(msg)
      .css('display', 'none');
    $('body').append(m);
    $('.ms-toast').fadeIn();

    setTimeout(function () {
      $('.ms-toast').fadeOut(function () {
        $(this).remove();
      });
    }, duration);
  }
}





