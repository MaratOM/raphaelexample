jQuery(document).ready(function($) {
  function addMedalsDesc() {
    var legalText = [
    //  "<span class=\"legal-text\">",
    //"<p>",
	 // "Для получения вознаграждения, 15го числа каждого месяца, члену Smart Клуба, получившему в установленном законодательством РФ статус Индивидуального предпринимателя, необходимо подтвердить статус Активный Партнер (Далее \"АП\"). Для подтверждения статуса АП члены Smart Клуба уровнями: <b><i>Партнер, Бронзовый партнер, Серебряный партнер</i></b> - в месяц совершают покупку товара на свой ID в количестве <b><i>1 банки порошка или 1 упаковки капсул</i></b> (Далее \"1 банка\"). Если статус АП не подтверждался более 3-х месяцев, то члены Smart Клуба, данных уровней, подтверждают статус АП за последние три месяца., т.е. <b><i>3 банки</i></b>.",
    //"</p>",
    //"<p>",
	 // "Для подтверждения статуса АП члены Smart Клуба уровнями: <b><i>Золотой партнер, Платиновый партнер</i></b> - в месяц совершают покупку товара на свой ID в количестве <b><i>2 банок</i></b>. Если статус АП не подтверждался более 2-х месяцев, то члены Smart Клуба, данных уровней, подтверждают статус АП за последние два месяца., т.е. <b><i>4 банки</i></b>.",
    //"</p>",
    //"<p>",
	 // "Для подтверждения статуса АП члены Smart Клуба уровнем <b><i>Управляющий партнер</i></b> - в месяц совершают покупку товара на свой ID в количестве <b><i>5 банок</i></b>. Если статус АП не подтверждался более 2-х месяцев, то члены Smart Клуба, данного уровня, подтверждают статус АП за последние два месяца., т.е. <b><i>10 банок</i></b>.",
    //"</p>",
    //"<b>Вознаграждение за месяц, в котором статус АП не был подтвержден, не выплачивается!</b>",
    //  "</span>"
    //]
    //.join(''),
        "<span class=\"legal-text\">",
        "<p>",
        "Для получения вознаграждения, 15го числа каждого месяца, члену Smart Клуба, получившему в установленном законодательством РФ статус Индивидуального предпринимателя, необходимо подтвердить статус Активный Партнер (Далее \"АП\"). Для подтверждения статуса АП члены Smart Клуба уровнями: <b><i>Партнер, Бронзовый партнер, Серебряный партнер</i></b> - в месяц совершают покупку товара на свой ID в количестве <b><i>1 банки порошка</i></b>.",
        "</p>",
        "<p>",
        "Для подтверждения статуса АП члены Smart Клуба уровнями: <b><i>Золотой партнер, Платиновый партнер, Управляющий партнер</i></b> - в месяц совершают покупку товара на свой ID в количестве <b><i>1 банки</i></b>. Дополнительно к личной 1-й банке, в структуре у партнеров, которые еще не достигли Золотого статуса, должно быть куплено не менее 4 банок. Если в структуре не было покупок или их сумма менее 4 банок, то можно докупить необходимое количество лично. То есть нужно, чтобы в структуре прошел оборот в 4 банки, а проданные у нижестоящих Золотых партнеров банки в учет не идут.",
        "</p>",
        "<b>Вознаграждение за месяц, в котором статус АП не был подтвержден, не выплачивается!</b>",
        "</span>"
    ]
    .join(''),
    html = [
      "<table id=\"color-desc\" class=\"row\">",
	  "<tr>",
	      "<td>",
		  "<ul>",
		      "<li class=\"sprite sprite-steel\">Партнер - 10%</li>",
		      "<li class=\"sprite sprite-bronze\">Бронзовый партнер - 25%</li>",
		  "</ul>",	
	      "</td>",
	      "<td>",
		  "<ul>",
		      "<li class=\"sprite sprite-silver\">Серебряный партнер - 30%</li>",
		      "<li class=\"sprite sprite-gold\">Золотой партнер - 45%</li>",
		  "</ul>",	
	      "</td>",
	      "<td>",
		  "<ul>",
		      "<li class=\"sprite sprite-platinum\">Платиновый партнер - 50%</li>",
		      "<li class=\"sprite sprite-black\">Управляющий партнер - 52%</li>",
		  "</ul>",	
	      "</td>",		
	  "</tr>",
	  "<tr class=\"bottom\"><td colspan=3>Числа в кругах соответствуют количеству личных купленных банок</td></tr>",
	  "<tr class=\"bottom\"><td colspan=3>Информационная строка: Имя Фамилия, ID, (личные покупки в текущем месяце, в прошлом месяце), количество партнеров</td></tr>",
	  "<tr class=\"bottom\"><td colspan=3>Ваши статусы в системе будут обновлены 14-ого числа каждого месяца</td></tr>",
	  "<tr class=\"bottom last-tr\"><td colspan=3>" + legalText + "</td></tr>",
      "</table>"
    ]
    .join('');

    $('main').css('padding', '0').append(html);
  }
  
  function addAutocomplete() {
    var autocomplete = [
      "<div class=\"ui-widget user-names\">",
        "<span class=\"clear-search\">&times</span>",
        "<img src=\"/sites/all/modules/binghan/bh_report/chart/images/misc/mag_glass.png\" />",
	      "<label for=\"user-names\"></label>",
	      "<input id=\"user-names\"  placeholder=\"Поиск партнера\">",
	    "</div>"
    ]
    .join('');
    
    $('main').append(autocomplete);    
  }
  
  function loadVis() {  
    var     html = [
      "<div id=\"papers\">",
	      "<div id=\"chart-links\">",
	        "<a href=\"information\" id=\"close-vis\">Ваш кабинет</a>",
	        // "<a href=\"generation_chart_dynatree\" id=\"show-old\">Отчёт в виде списка</a>",
	      "</div>",
	    "<img id=\"vis-ajax-loader\" src=\"/sites/all/modules/binghan/bh_report/chart/images/misc/ajax-loader.gif\" />",
	    "<div id=\"paper0\" class=\"paper\"></div>",
	    "<div id=\"paper1\" class=\"paper paper-level\">",
	      "<a href=\"#\" id=\"load-user\">",
	        "<img src=\"/sites/all/modules/binghan/bh_report/chart/images/misc/load_user.png\" />",
	      "</a>",
	    "</div>",
    "</div>"    
  ]
  .join(''),  
	endDate = Drupal.settings.endDate,	
	userId = Drupal.settings.memberID;

    if($("#color-desc").length) {
      $("#color-desc").remove();
    }
    
    if($("#papers").length) {
      $("#papers").remove();
    }	

    $('.main-content, aside').hide();
    $('main').css('padding', '0').append(html);
    $('main > div').css('clear', 'both');    
    $("#load-user").hide();
    $("#crown").hide();    
 
    RootCarousel(Drupal.settings.memberID, 0);

    $("#papers").append("<img id=\"crown\" src=\"/sites/all/modules/binghan/bh_report/chart/images/misc/crown.png\" />");
    $("#vis-ajax-loader").hide();
  }
  
  function loadVisWithDesc() {
    loadVis();
    addMedalsDesc();
  }

  loadVisWithDesc();
  window.loadVisWithDesc = loadVisWithDesc;
  
  addAutocomplete();
  
	function drawPaper(memberIdToDraw) {
    var nextPaperNum = $('.paper').length;
    var lastPaper = $('#paper' + (nextPaperNum - 1));
    var nextPaperHtml = [];

    nextPaperHtml = [
      "<div id=\"nextpaper\" class=\"paper paper-level\">",
        "<a href=\"#\" id=\"load-user\">",
	        "<img src=\"/sites/all/modules/binghan/bh_report/chart/images/misc/load_user.png\" />",
	      "</a>",
      "</div>"      
    ]
    .join(''); 
    
    lastPaper.html('');

    $('#papers').append(nextPaperHtml);
    $('#nextpaper').attr('id', 'paper' + nextPaperNum);    
    
    RootCarousel(memberIdToDraw, nextPaperNum - 1);    
    lastPaper.find('svg').css('z-index', 100 - nextPaperNum - 1);
  }  
  
  $("body").on("click", "#load-user", function(e) {
    var memberIdToDraw = $(this).attr('href');
    drawPaper(memberIdToDraw);
    
    e.preventDefault();
  });

  function handleClickableEvents() {
    $("#papers").on("click", ".paper .clickable", function(e) {
      var papersLength = $('.paper').length,
   	  clickedPaperId = $(this).parents('.paper').attr('id'),
	    clickedPaperIdNum;
    
      clickedPaperIdNum = parseInt(clickedPaperId.substr(5, clickedPaperId.length - 1));
    
      for(var i = clickedPaperIdNum + 1; i < papersLength - 1; i++) {
        $("#paper" + i).remove();
      }   
    
      $("#paper" + (papersLength - 1)).attr('id', 'paper' + (clickedPaperIdNum + 1));
      
      $('#user-names').val('');
    });
  }
  
  handleClickableEvents();
  
  $("main").on("click", "#close-vis", function(e) {
    window.location = 'https://www.binghanrussia.ru/account/information';
    
    return false;
  });
  
  $('#user-names').on('input', function() {
    var clearSearch = $('.clear-search');
    $(this).val() ? clearSearch.show() : clearSearch.hide();     
  });  
  
  $('.ui-widget.user-names .clear-search').click(function() {
    $(this).hide();
    $('#user-names').val('');
    loadVisWithDesc();
  });
  
  $('.ui-widget.user-names .clear-search').hide();
  
  /*Search functionality*/
  var userUplinesTree = [],
      choosenMemberId;

  userTreeNamesData = [];
  _.each(userTreeData, function(userData) {
    userTreeNamesData.push({
      userName: getUserName(userData),
      member_id: userData.member_id.trim(),
      upline_id: userData.upline_id.trim()
    });
  });

  userNames = _.pluck(userTreeNamesData, 'userName');
  userNames.shift();
  $( "#user-names" ).autocomplete({
    source: userNames,
    select: function( event, ui ) {
      drawPapersTree(ui.item.value);
	  }
  });
	
  function buildUserTree(userName) {
	  var member_id = choosenMemberId = _.pluck(_.where(userTreeNamesData, {userName: userName}), 'member_id')[0].trim();
	  userUplinesTree = [];
	  findUserUpline(member_id);
  }
  

  function findUserUpline(member_id) {
    var uplineMemberId, mainUserId = Drupal.settings.memberID;
	
	  uplineMemberId = _.pluck(_.where(userTreeNamesData, {member_id: member_id.trim()}), 'upline_id')[0].trim();
	  userUplinesTree.push(uplineMemberId);
	
	  if(uplineMemberId != mainUserId) {
	    findUserUpline(uplineMemberId);
	  }	
  }

	function drawPapersTree(userName) {
	  var userMovingData, userIndex, search = true, timeOut = 400;
    buildUserTree(userName);

    jQuery.eachAsync(userUplinesTree.reverse(), {
      delay: timeOut,
      bulk: 0,
      loop: function(index, member_id)
      {
        if(index === 0) {
          loadVisWithDesc();
        }
        else {
          drawPaper(member_id);
        }
      
        handleClickableEvents();

        userMovingData = getUserOffset(realUsers, userUplinesTree[index + 1]);
        if(typeof userMovingData.offset !== 'undefined') {  
          //for(var i = 1; i <= userMovingData.offset; i++) {
          //  if(userMovingData.direction == 'left') {
          //    setTimeout(rootsMoveLeft, timeOut * i, null, search);
          //  }
          //  if(userMovingData.direction == 'right') {
          //    setTimeout(rootsMoveRight, timeOut * i, null, search);
          //  }           
          //}
          
            if(userMovingData.direction == 'left') {
              rootsMoveLeft(null, userMovingData.offset, search);
            }
            if(userMovingData.direction == 'right') {
              rootsMoveRight(null, userMovingData.offset, search);
            }          
        }
      },
      end: function()
      {
      userMovingData = getUserOffset(realUsers, choosenMemberId);
        var choosenMember = _.where(realUsers, {userKey: choosenMemberId})[0];
        //for(var i = 1; i <= userMovingData.offset; i++) {
        //  if(userMovingData.direction == 'left') {
        //    setTimeout(rootsMoveLeft, timeOut * i, choosenMember, search);            
        //  }
        //  if(userMovingData.direction == 'right') {
        //    setTimeout(rootsMoveRight, timeOut * i, choosenMember, search);            
        //  }           
        //}
        
        //for(var i = 1; i <= userMovingData.offset; i++) {
          if(userMovingData.direction == 'left') {
            //setTimeout(rootsMoveLeft, timeOut * i, choosenMember, search);
            rootsMoveLeft(choosenMember, userMovingData.offset, search);
            
          }
          if(userMovingData.direction == 'right') {
            //setTimeout(rootsMoveRight, timeOut * i, choosenMember, search);
            rootsMoveRight(choosenMember, userMovingData.offset, search);
          }           
        //}        
      }
    });    
  }

  
  function getUserOffset(lineUsers, member_id) {
    var lineUsersLength = lineUsers.length,
        userIndex,
        direction = 'left',
        offset;
    
    _.each(lineUsers, function(user, index) {
      if(user.userKey == member_id) {
        userIndex = index;
      }      
    });
    
    if(lineUsersLength >= 7) {
      if(userIndex == 3) {
        offset = 0;
      }
      else if(userIndex < 3) {
        direction = 'right';
        offset = 3 - userIndex;
      }
      else if(userIndex > 3) {
        direction = 'left';
        offset = userIndex - 3;
      }      
    }
    else if(lineUsersLength < 7 && lineUsersLength > 4) {
      if(userIndex == lineUsersLength - 4) {
        offset = 0;
      }
      else if(userIndex < lineUsersLength - 4) {
        direction = 'right';
        offset = lineUsersLength - 4 - userIndex;
      }
      else if(userIndex > lineUsersLength - 4) {
        direction = 'left';
        offset = userIndex - (lineUsersLength - 4);
      } 
    }
    else if(lineUsersLength <= 4) {
      if(userIndex == 0) {
        offset = 0;
      }
      else {
        direction = 'left';
        offset = userIndex;
      }
    } 
    
    return {
      direction: direction,
      offset: offset
    }
  }  
 /*END of Search functionality*/
 
  //Snippet for getting Partners sum volumes for last and current months more than vol
  //var vol = 6;
  //var golds = _.where(userTreeData, {promotion: '6000'});
  //var plats = _.where(userTreeData, {promotion: '8000'});
  //var goldsPlus = golds.concat(plats);
  //_.each(goldsPlus, function(goldPlus) {
  //  var cur = parseInt(goldPlus.volume.trim().split(' ')[0]);
  //  var last = parseInt(goldPlus.volume.trim().split(' ')[1]);
  //  var sum = cur + last;
  //  if(sum >= vol) {
  //    console.log(goldPlus.first_name + ' ' + goldPlus.last_name + ' ' + goldPlus.member_id + ' :: ' + sum)
  //  }
  //});
  
 
});
