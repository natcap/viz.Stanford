function addMenu(current = 1) {
    let menu = document.getElementById('main_menu');

    let todayTab = document.createElement('div')
        todayTab.classList.add('menu_element');
    let today = document.createElement('a');
        today.href = 'today.html';
        today.innerHTML = "Summary today";
    todayTab.appendChild(today);


    let futureTab = document.createElement('div')
        futureTab.classList.add('menu_element');
    let future = document.createElement('a');
       future.href = 'future.html';
       future.innerHTML = "Summary 2050";
       future.setAttribute("id", "futureTab");
    futureTab.appendChild(future);

    let home = document.createElement('div')
        home.classList.add('menu_element');
    let landingpage = document.createElement('a');
        landingpage.href = 'index.html';
        landingpage.innerHTML = "<i class='fas fa-home'></i>";
    home.appendChild(landingpage);

    let wqTab = document.createElement('div')
        wqTab.classList.add('menu_element');
    let wq = document.createElement('a');
        wq.href = 'wq.html';
        wq.innerHTML = "Water quality <i class='fa fa-tint' viewBox = '0 0 15 15'>";
    wqTab.appendChild(wq);

    let coastalTab = document.createElement('div')
        coastalTab.classList.add('menu_element');
    let coastal = document.createElement('a');
        coastal.href = 'coastal.html';
        coastal.innerHTML = "Coastal risk <i class='fas fa-water'></i>";
    coastalTab.appendChild(coastal);

    let pollTab = document.createElement('div')
        pollTab.classList.add('menu_element');
    let polli = document.createElement('a');
        polli.href = 'poll.html';
        polli.innerHTML = "Crop pollination <span class='glyphicon glyphicon-grain'> </span>";
    pollTab.appendChild(polli);


    /*let third = document.createElement('div')
        third.classList.add('menu_element');
    let dropdown = document.createElement('div');
        dropdown.classList.add('menu_dropdown');
    let dropdown_content = document.createElement('div');
        dropdown_content.classList.add('menu_dropdown-content');

    let dropSymbol = document.createElement('i');
        dropSymbol.classList.add('fa');
        dropSymbol.classList.add('fa-caret-down');
    let poll = document.createElement('a');
        poll.href = 'poll.html';
        poll.innerHTML = "Pollination <span class='glyphicon glyphicon-grain'> </span>";
    let wq = document.createElement('a');
        wq.href = 'wq.html';
        wq.innerHTML = "Water quality <i class='fa fa-tint' viewBox = '0 0 15 15'>";
    let coast = document.createElement('a');
        coast.href = 'coastal.html';
        coast.innerHTML = "Coastal Risk <i class='fas fa-water'></i>";

    let services = document.createElement('a');
        services.innerHTML = "High Resolution Maps ";
        services.setAttribute("id", "servicesTab");
    services.appendChild(dropSymbol);
    dropdown.appendChild(services);
    dropdown_content.appendChild(poll);
    dropdown_content.appendChild(wq);
    dropdown_content.appendChild(coast);
    dropdown.appendChild(dropdown_content);
    third.appendChild(dropdown);*/
    
    let aboutab = document.createElement('div')
        aboutab.classList.add('menu_element');
        aboutab.classList.add('about_tab');
    let about = document.createElement('a');
        about.href = 'about.html';
        about.innerHTML = "About";
        about.setAttribute("id", "aboutTab");
    aboutab.appendChild(about);

    switch(current) {
        case 1:
            landingpage.setAttribute("id", "selectedTab");
            break;
        case 5:
            today.setAttribute("id", "selectedTab");
            break;
        case 6:
            future.setAttribute("id", "selectedTab");
            break;
        case 2:
            wq.setAttribute("id", "selectedTab");
            break;
        case 3:
            coastal.setAttribute("id", "selectedTab");
            break;
        case 4:
            polli.setAttribute("id", "selectedTab");
            break;
        case 7:
            about.setAttribute("id", "selectedTab");
            break;
        /*case 8:
            about.setAttribute("id", "selectedTab");
            break;*/
        default:
          // code block
      }

    menu.appendChild(home);
    menu.appendChild(todayTab);
    menu.appendChild(futureTab);
    menu.appendChild(wqTab);
    menu.appendChild(coastalTab);
    menu.appendChild(pollTab);
    menu.appendChild(aboutab);
   
  }
  function showInfo(info) {
    document.getElementById(info).style.top = document.getElementById(info).parentElement.offsetTop - 1 + "px";
    document.getElementById(info).style.right = document.getElementById(info).parentElement.offsetRight + "px";
    document.getElementById(info).style.width = document.getElementById(info).parentElement.offsetWidth + "px";

  }
  
  function hideInfo(info) {
    document.getElementById(info).style.width = "0%";
  }

  function scrollToModelling(){
    document.querySelector('#modeling_method').scrollIntoView({ 
        behavior: 'smooth' 
      });
  }

  whenDocumentLoaded(() => {
    // Initialize dashboard
    //addMenu();
});

  function whenDocumentLoaded(action) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", action);
    } else {
      // `DOMContentLoaded` already fired
      action();
    }
  }