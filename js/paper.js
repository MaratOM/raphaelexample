var RootCarousel = function(memberId, level) {
  var paperWidth = 906,
      paperHeight = level === 0 ? 330 : 242,
      rootsCoords = [],
      leftInvRootCoords = {x:440, y: -90, medalOffsetX: 440, medalOffsetY: -393},
      rightInvRootCoords = {x:440, y: -90, medalOffsetX: 440, medalOffsetY: -393},
      leftInvRootPath,
      rightInvRootPath,
      leftInvRoot,
      rightInvRoot,
      visRootsCoords = [],
      movingItems = [],
      animationTimeOut = 500,
      medals = [],
      realMedals = [],      
      userNames = [],
      userNameRects = [],
      userProductQuans = [],    
      realUserProductQuans = [],
      userPartnersQuan = 0,
      partnersLevelOne = [],      
      bigMedalWidth = 83,
      bigMedalHeight = 82,
      users = [],
      realUsers = [],
      rootPaths = [],
      roots = [],
      path_attrs = {fill: '#454344', stroke: '#454344', 'stroke-width': 5},
      shownUsersPaths = [],
      shownUsersPathsLength = 0,
      rightInvRootsCoordsArr = [],
      mainUserData = {},
      mainUserMedal,
      endDate = '',      
      imagesPathPrefix = '',
      local = false;

  
      
  if(local) {
    mainUserData = _.where(userTreeData, {member_id: memberId})[0];
    endDate = '2015-03-20';     
    imagesPathPrefix = '';  
  }
  else {
    userTreeData = JSON.parse(Drupal.settings.partners);
    _.each(userTreeData, function(userData) {userData.member_id = userData.member_id.trim();});
    mainUserData = _.where(userTreeData, {member_id: memberId})[0];    
    endDate = Drupal.settings.endDate;
    imagesPathPrefix = '/sites/all/modules/binghan/bh_report/chart/';
  }
  
  users =  _.clone(_.where(userTreeData, {upline_id: memberId}));
  
  var paper = Raphael('paper' + level, paperWidth, paperHeight);
  
  paper.customAttributes.pathXY = function( x,y ) {
    // use with .attr({pathXY: [x,y]});
    // call element.pathXY() before animating with .animate({pathXY: [x,y]})
    var pathArray = Raphael.parsePathString(this.attr('path'));
    var transformArray = ['T', x - this.pathXY('x'), y - this.pathXY('y') ];
      return { 
        path: Raphael.transformPath( pathArray, transformArray) 
      };
  };
  Raphael.st.pathXY = function(xy) { 
     // pass 'x' or 'y' to get average x or y pos of set
     // pass nothing to initiate set for pathXY animation
     // recursive to work for sets, sets of sets, etc
     var sum = 0, counter = 0;
     this.forEach( function( element ){
       var position = ( element.pathXY(xy) );
       if(position){
        sum += parseFloat(position);
        counter++;
       }
     });
     return (sum / counter);
  };
  Raphael.el.pathXY = function(xy) {
     // pass 'x' or 'y' to get x or y pos of element
     // pass nothing to initiate element for pathXY animation
     // can use in same way for elements and sets alike
     if(xy == 'x' || xy == 'y'){ // to get x or y of path
       xy = (xy == 'x') ? 1 : 2;
       var pathPos = Raphael.parsePathString(this.attr('path'))[0][xy];
       return pathPos;
     } else { // to initialise a path's pathXY, for animation
       this.attr({pathXY: [this.pathXY('x'),this.pathXY('y')]});
     }
  };
  
    addMovingItem(shownUsersPaths, false);
    addMovingItem(medals, true);    
    addMovingItem(userProductQuans, true);
    addMovingItem(userNames, false);
    addMovingItem(userNameRects, false);   
  
  _.each(users, function(user) {
    user.userName = getUserName(user);
    user.userKey = user.member_id.trim();
    user.userIsFolder = user.downlines > 0 ? true : false;
    
    getUserProductQuans(user);
    user.userProductCurMonthQuan = user.userProductQuans[0];
    user.userProductLastMonthQuan = user.userProductQuans[1];    
    user.userProductQuan = user.userProductQuans[3];
    user.userPercent = getUserPercent(user);

    partnersLevelOne = _.where(userTreeData, {upline_id: user.member_id.trim()});
    userPartnersQuan = 0;
    getUserPartnersQuan(partnersLevelOne);
    user.userPartnersQuan = userPartnersQuan;
  });
 
  users.sort(
   firstBy(function (v1, v2) { return parseInt(v1.userProductQuan) - parseInt(v2.userProductQuan); })  
     .thenBy(function (v1, v2) { return v1.userPartnersQuan - v2.userPartnersQuan; })  
  );  
  
  users = users.reverse();
  realUsers = _.clone(users);

  if(realUsers.length == 0) {
    mainUsersVis();
      
    jQuery('#load-user').hide();
    jQuery('#crown').hide();
      
    return;  
  }
  
  if(level === 0) {
    visRootsCoords = [
      {x:0, y:0, medalOffsetX: 82, medalOffsetY: 82},
      {x:0, y:0, medalOffsetX: 75, medalOffsetY: 218},
      {x:0, y:0, medalOffsetX: 239, medalOffsetY: 218},
      {x:0, y:0, medalOffsetX: 403, medalOffsetY: 218},
      {x:0, y:0, medalOffsetX: 569, medalOffsetY: 218},
      {x:0, y:0, medalOffsetX: 732, medalOffsetY: 218},
      {x:0, y:0, medalOffsetX: 725, medalOffsetY: 82}
    ];
	  
    leftInvRootPath = "M443 93L440 -393";
    rootPaths[0] = "M440 93L138 123";
    rootPaths[1] = "M440 114L100 262";
    rootPaths[2] = "M440 130L270 262";
    rootPaths[3] = "M443 114L443 262";
    rootPaths[4] = "M446 130L616 262";
    rootPaths[5] = "M446 114L785 262";
    rootPaths[6] = "M447 93L728 123";
    rightInvRootPath = "M443 93L440 -393";    
  }
  else {
    visRootsCoords = [
      {x:325, y:47, medalOffsetX: 82, medalOffsetY: 22},
      {x:337, y:82, medalOffsetX: 75, medalOffsetY: 129},
      {x:377, y:110, medalOffsetX: 239, medalOffsetY: 129},
      {x:440, y:127, medalOffsetX: 407, medalOffsetY: 129},
      {x:490, y:87, medalOffsetX: 569, medalOffsetY: 129},
      {x:525, y:55, medalOffsetX: 732, medalOffsetY: 129},
      {x:522, y:15, medalOffsetX: 725, medalOffsetY: 22}
    ];	

    leftInvRootPath = "M440 8L440 -393";	  
    rootPaths[0] = "M444 8L138 65";
    rootPaths[1] = "M445 10L100 160";
    rootPaths[2] = "M445 18L262 160";
    rootPaths[3] = "M449 18L449 160";
    rootPaths[4] = "M453 18L636 160";
    rootPaths[5] = "M453 10L794 160";
    rootPaths[6] = "M453 8L728 65";
    rightInvRootPath = "M440 8L440 -393";
  }
  
  _.each(rootPaths, function(rootPath, index) {roots.push(paper.path(rootPaths[index]));});  

  function mainUsersVis() {
    if(level === 0) {
      mainUserData.userName = getUserName(mainUserData);
      mainUserData.userPercent = getUserPercent(mainUserData);
      mainUserData.userKey = mainUserData.member_id.trim();
      mainUserData.userIsFolder = mainUserData.downlines > 0 ? true : false;
      mainUserMedal = paper.image(imagesPathPrefix + "images/medals/big/" + getMedalType(mainUserData) + ".png", paperWidth / 2 - 64, 55, 110, 108);	
      
      mainUserMedal
        .attr({cursor: 'pointer'})
        .click(function(e) {
          loadVisWithDesc();
        });

      paper.text(paperWidth / 2 - 10, 109, getUserProductQuan(mainUserData) || '0' || 21)
        .attr({'font-size': 35, 'fill': '#ffffff', cursor: 'pointer'})
        .click(function(e) {
          loadVisWithDesc();
        });	

      //Small rect to hide upper roots	  
      paper.rect(440, 50, 6, 6).attr({fill: '#E1DDD2', stroke: 0});
    }     
  }  
  
  function usersRoots() {

    if (users.length < 7) {
      var fakeUser = {}, usersLength = users.length;      

      if (users.length < 4) {
        for(var i = 0; i < 7 - usersLength - 3; i++) {
          users.push(fakeUser);
        }
        for(var i = 0; i < 3; i++) {
          users.unshift(fakeUser);
        }
      }
      else {
        for(var i = 0; i < 7 - usersLength; i++) {
          users.unshift(fakeUser);
        }
      }
    }

    if(users.length > 7) {
      _.each(users, function(user, index) {
        if(index > 6) {
          roots.push(paper.path(rightInvRootPath).hide());
        }
      });   
    
      for(var i = 0; i < users.length - 7; i++) {
        rightInvRootsCoordsArr.push(rightInvRootCoords);
      }
      rootsCoords = visRootsCoords.concat(rightInvRootsCoordsArr);     
    }
    else {
      rootsCoords = visRootsCoords.concat(rightInvRootCoords);      
    }
    
    _.each(roots, function(root, index) {root.hide()});
    
    usersInit();
    realMedals = _.clone(medals);
    realUserProductQuans = _.clone(userProductQuans);    
    handleMovingItemsClickEvents(realMedals);
    handleMovingItemsClickEvents(realUserProductQuans);
    
    roots.unshift(paper.path(leftInvRootPath).hide());    
    rootsCoords.unshift(leftInvRootCoords);
	
    addPhantoms();
  }
  
  function usersInit() {
    var userData, medalType;
    
    _.each(users, function(user, index) {
      userData = {
        userKey: user.userKey,
        userTitle: user.title,
        userIsFolder: user.userIsFolder,
        userName: user.userName,
        userProductCurMonthQuan: user.userProductCurMonthQuan,
        userProductLastMonthQuan: user.userProductLastMonthQuan,
        userProductQuan: user.userProductQuan,	
        userPercent: user.userPercent,
        userPartnersQuan: user.userPartnersQuan
      }
      
      user = roots[index];		
      user.attr(path_attrs);
      
      _.extend(user, userData);
      
      shownUsersPathsLength = shownUsersPaths.push(user);
      if(typeof user.userKey !== 'undefined') {
        shownUsersPaths[shownUsersPathsLength - 1].show();
      }
    });
    
    mainUsersVis();

    paper.image(imagesPathPrefix + "images/misc/small_root.png", paperWidth - 51, 90, 46, 63);
    paper.text(paperWidth - 39, 90, realUsers.length).attr({'font-size': 15});      

   _.each(shownUsersPaths, function(user, index) {
      if(typeof user.userKey !== 'undefined') {
        medalType = getMedalType(user);
      }
      else {
        medalType = 'bronze';
      }
      medals[index] = paper.image(imagesPathPrefix + "images/medals/big/" + medalType + ".png", rootsCoords[index].medalOffsetX, rootsCoords[index].medalOffsetY, bigMedalWidth, bigMedalHeight);
      medals[index].position = index;
      
      if (medals[index].position == 3) {
        medals[index].attr({cursor: ''});
        setUserHref(user);
      }
      else {
        medals[index].attr({cursor: 'pointer'});
      }

      if (medals[index].position == 0 || medals[index].position == 6) {
        userNameRects[index] = paper.rect(medals[index].attr('x') - bigMedalWidth / 2, medals[index].attr('y') + bigMedalHeight + 5 - 21, 150, 25, 9)
          .attr({fill: '#FDFDFC', stroke: 0});
        userNames[index] = paper.text(medals[index].attr('x') + bigMedalWidth / 2 - 10, medals[index].attr('y') + bigMedalHeight + 17 - 21, user.userName + "\n " + user.userKey + " (" + user.userProductCurMonthQuan + ", " + user.userProductLastMonthQuan + ") " + " " + user.userPartnersQuan);

        userProductQuans[index] = paper.text(medals[index].attr('x') + bigMedalWidth / 2 - 11, medals[index].attr('y') + bigMedalHeight + 15 - 55 - 11, user.userProductQuan)
          .attr({'font-size': 23, 'fill': '#ffffff', cursor: 'pointer'});
      
        setSemiTransOpacity(index);
      }
      else {
        userNameRects[index] = paper.rect(medals[index].attr('x') - bigMedalWidth / 2, medals[index].attr('y') + bigMedalHeight + 5, 150, 25, 9)
          .attr({fill: '#FDFDFC', stroke: 0});
        userNames[index] = paper.text(medals[index].attr('x') + bigMedalWidth / 2 - 10, medals[index].attr('y') + bigMedalHeight + 17, user.userName + "\n " + user.userKey + " (" + user.userProductCurMonthQuan + ", " + user.userProductLastMonthQuan + ") " + " " + user.userPartnersQuan);
      
        userProductQuans[index] = paper.text(medals[index].attr('x') + bigMedalWidth / 2, medals[index].attr('y') + bigMedalHeight + 15 - 55, user.userProductQuan)
          .attr({'font-size': 30, 'fill': '#ffffff', cursor: 'pointer'});
        
        setClickableItemAttrs(index)
      }
      
      setElClickableClass(index);
           
      if(typeof user.userKey === 'undefined') {
        hidePhantoms(index);
      }
    });
  }
  
  function setElClickableClass(index) {
    _.each(movingItems, function(movingItem) {
      if (movingItem.clickable) {
        movingItem.itemArray[index].node.setAttribute("class","clickable");
      }
    }); 
  }
  
  function handleMovingItemsClickEvents(movingItemsArray) {
    var clickAnimTimeOut = animationTimeOut + 100;
    
    _.each(movingItemsArray, function(movingItem, index) {  
      movingItem.unclick();
      
      if(realMedals[index].position == 0) {
	      movingItem.click(function(e) {
	        rootsMoveRight(users[index], 3);
	      });
      }  
      else if(realMedals[index].position == 1) {
	      movingItem.click(function(e) {
	        rootsMoveRight(users[index], 2);
	      });
      }
      else if(realMedals[index].position == 2) {
	      movingItem.click(function(e) {
	        rootsMoveRight(users[index], 1);
	      });
      }
      else if(realMedals[index].position == 4) {
	      movingItem.click(function(e) {
	        rootsMoveLeft(users[index], 1);
	      });
      }
      else if(realMedals[index].position == 5) {
	      movingItem.click(function(e) {
	        rootsMoveLeft(users[index], 2);
	      });
      }
      else if(realMedals[index].position == 6) {
	      movingItem.click(function(e) {
	        rootsMoveLeft(users[index], 3);
	      });
      }      
    }); 
  }
  
 function removeMovingItemsClickEvents(movingItemsArray) {
   _.each(movingItemsArray, function(movingItem, index) {  
     movingItem.unclick();
   });  
 }  

  function getUserName(user) {
    var userFirstName = user.first_name;    
  
    userNameParts = user.first_name.split(" ");
    if(userNameParts.length === 2) {
      userFirstName = userNameParts[0];
    }

    return userFirstName + " " + user.last_name;
  }
  
  function getUserProductQuan(user) {

    return user.volume.trim().split(' ')[3];
  }
  
  function getUserProductQuans(user) {
    user.userProductQuans = user.volume.trim().split(' ');;
  }  
  
  function getMedalType(user) {
    var medalType;
    
    switch (user.userPercent) {
      case '10%':
        medalType = 'steel';
        break;
      case '25%':
        medalType = 'bronze';
        break;
      case '30%':
        medalType = 'silver';
        break;
      case '45%':
        medalType = 'gold';
        break;
      case '50%':
        medalType = 'platinum';
        break;
      case '52%':
        medalType = 'black';
        break;       
      default:
        medalType = 'steel';
    }

    return medalType;
  }
  
  function getUserPercent(user) {

    return user.current_level + "%";
  }

  function getUserPartnersQuan(partnersLevel) {
    var levelPartners = [];

    _.each(partnersLevel, function(user) {
      if(user.downlines > 0) {
        levelPartners = _.where(userTreeData, {upline_id: user.member_id.trim()});
        userPartnersQuan++;
        getUserPartnersQuan(levelPartners);
      }
      else {
        userPartnersQuan++;
      }
    }); 
  }
  
  function addMovingItem(movingItemArray, clickable) {
    movingItems.push({itemArray: movingItemArray, clickable: clickable});
  }

  function addPhantoms() {
    _.each(movingItems, function(movingItem) {
      addItemPhantoms(movingItem.itemArray);
    });
  }
  
  function hidePhantoms(index) {
    _.each(movingItems, function(movingItem) {
      movingItem.itemArray[index].hide();
    });
  }  
  
  function addItemPhantoms(itemArray) {
    if(itemArray === shownUsersPaths) {
      addPhantomRoots();
      
      return;
    }
    
    var leftItemPhantoms  = [],
	rightItemPhantoms = [];

    for(var i = 0; i < 4; i++) {
      leftItemPhantoms.push(paper.text(rootsCoords[0].medalOffsetX, rootsCoords[0].medalOffsetY,"text").hide());
      rightItemPhantoms.push(paper.text(rootsCoords[rootsCoords.length - 1].medalOffsetX, rootsCoords[rootsCoords.length - 1].medalOffsetY, "text").hide());
    }
    
    _.each(leftItemPhantoms, function(leftItemPhantom, index) {
      leftItemPhantom.attr({pathXY: [rootsCoords[0].medalOffsetX, rootsCoords[0].medalOffsetY]});
      itemArray.unshift(leftItemPhantom);
    });
    
    _.each(rightItemPhantoms, function(rightItemPhantom, index) {
      rightItemPhantom.attr({pathXY: [rootsCoords[rootsCoords.length - 1].medalOffsetX, rootsCoords[rootsCoords.length - 1].medalOffsetY]});
      itemArray.push(rightItemPhantom);
    });
  }
  
  function addPhantomRoots() {
    var leftPhantomRoots  = [],
        rightPhantomRoots = [];

    for(var i = 0; i < 4; i++) {
      leftPhantomRoots.push(paper.path(leftInvRootPath).hide());
      rightPhantomRoots.push(paper.path(rightInvRootPath).hide());	    
    }
    
    _.each(leftPhantomRoots, function(leftPhantomRoot, index) {
      shownUsersPaths.unshift(leftPhantomRoot);
    });
    
    _.each(rightPhantomRoots, function(rightPhantomRoot, index) {
      shownUsersPaths.push(rightPhantomRoot);
    });
  }  

  function setSemiTransOpacity(index) {
    _.each(movingItems, function(movingItem) {
      var animProps = {opacity: 0.7},
          additionalProps = {};

      switch(movingItem.itemArray) {
        case medals:
          additionalProps = {width: 60, height: 60};
          break;
        case userProductQuans:
          additionalProps = {'font-size': 23};
          break;
        case shownUsersPaths:
          additionalProps = {opacity: 0.2};
          break;	
      }
      _.extend(animProps, additionalProps);
      movingItem.itemArray[index].animate(animProps, animationTimeOut);
    });   
  }
  
  function setTransOpacity(index) {
    _.each(movingItems, function(movingItem) {
      var animProps = {opacity: 0};      
      
      movingItem.itemArray[index].animate(animProps, animationTimeOut);
    });    
  }
  
  function setFullOpacity(index) {
    _.each(movingItems, function(movingItem) {
      var animProps = {opacity: 1},
          additionalProps = {},
          attrProps = {cursor: 'pointer'};

      switch(movingItem.itemArray) {
        case medals:
          additionalProps = {width: bigMedalWidth, height: bigMedalHeight};
          break;
        case userProductQuans:
          additionalProps = {'font-size': 30};
          break;  
      }
      _.extend(animProps, additionalProps);
      movingItem.itemArray[index].animate(animProps, animationTimeOut);
      
      if (movingItem.clickable) {
        movingItem.itemArray[index].attr(attrProps);
      }
    }); 
  }
  
  function setPointerAttrs(medalPosition) {
    var attrs;

    if(medalPosition > 0 && medalPosition < 6) {
      if(medalPosition == 3) {
        attrs = {cursor: ''};
      }
      else {
        attrs = {cursor: 'pointer'};      
      }
    }
    else {
      attrs = {};
    }
    
    return attrs;
  }
  
  function moveItems(index, direction, movesNum, timeOut) {
    var offset = direction == 'left' ? - movesNum : movesNum;
    
    _.each(movingItems, function(movingItem) {
      if (typeof movingItem.itemArray[index + offset] !== 'undefined') {
        if (movingItem.itemArray === shownUsersPaths) {
          movingItem.itemArray[index].animate({path: movingItem.itemArray[index + offset].attr('path')}, timeOut);
          movingItem.itemArray[index].attr(path_attrs);
        }
        else {
          movingItem.itemArray[index].animate({x: movingItem.itemArray[index + offset].attr('x'), y: movingItem.itemArray[index + offset].attr('y')}, timeOut);
        }
      }
    });


    for(var i = 0; i < Math.abs(offset); i++) {
      if (direction == 'left') {
        if (typeof medals[index - i] !== 'undefined') {
          if (medals[index -  i].position == 1 || medals[index -  i].position > 6) {
            setSemiTransOpacity(index -  i);
          }
          if (medals[index -  i].position == 0) {
            setTransOpacity(index -  i);
          }
          if (medals[index -  i].position == 6) {
            setFullOpacity(index -  i);
          }
          
          medals[index -  i].position = medals[index -  i].position - 1;
          setClickableItemAttrs(index -  i);
        }        
      }
      else {
        if (typeof medals[index + i] !== 'undefined') {      
          if (medals[index +  i].position == 5 || medals[index +  i].position < 0) {
            setSemiTransOpacity(index +  i);
          }
          if (medals[index +  i].position == 6) {
            setTransOpacity(index +  i);
          }
          if (medals[index +  i].position == 0) {
            setFullOpacity(index +  i);
          }
          
          medals[index +  i].position = medals[index +  i].position + 1;
          setClickableItemAttrs(index +  i);	        
        }
      }
    }
  }
  
  function setClickableItemAttrs(index) {
    _.each(movingItems, function(movingItem) {
      if(movingItem.clickable) {
        movingItem.itemArray[index].attr(setPointerAttrs(medals[index].position));
      }	
    });    
  }  

  function rootsMoveLeft(user, movesNum, search) {
    var timeOut = typeof search !== 'undefined' ? 0 : animationTimeOut;
  
    if(user) {
      setUserHref(user);
    }
    
    removeMovingItemsClickEvents(realMedals);
    removeMovingItemsClickEvents(realUserProductQuans);
    
    _.each(shownUsersPaths, function(path, index) {
      if(index > 0) {
        moveItems(index, 'left', movesNum, timeOut);
      }
    });

    setTimeout(function() {
      handleMovingItemsClickEvents(realMedals);
      handleMovingItemsClickEvents(realUserProductQuans);    
    }, animationTimeOut);
  }
  
  function rootsMoveRight(user, movesNum, search) {
    var timeOut = typeof search !== 'undefined' ? 0 : animationTimeOut;
  
    if(user) {
      setUserHref(user);
    }
    
    removeMovingItemsClickEvents(realMedals);
    removeMovingItemsClickEvents(realUserProductQuans);
    
    _.each(shownUsersPaths, function(path, index) {
      if(index < shownUsersPaths.length - 1) {
        moveItems(index, 'right', movesNum, timeOut);
      }
    });
    
    setTimeout(function() {
      handleMovingItemsClickEvents(realMedals);
      handleMovingItemsClickEvents(realUserProductQuans);    
    }, animationTimeOut)
  }
  
  function setUserHref(user) {
    var loadUser = jQuery('#load-user');

    if(typeof user.userKey === 'undefined') {
      user.userIsFolder = user.downlines > 0 ? true : false ;
      user.userKey = user.member_id;
    }      
    if (user.userIsFolder === true) {
      loadUser.show();
      loadUser.attr('href', user.userKey.trim());
    }    
    else {
      loadUser.hide();
    }
  }
  
  usersRoots();
  
  window.realUsers = realUsers;
  window.getUserName = getUserName;
  window.rootsMoveRight = rootsMoveRight;
  window.rootsMoveLeft = rootsMoveLeft;  
};