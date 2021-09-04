import Grader from './../index.js';

// open multiple ui windows and change ui window layout
  export async function windowDemo() {
    await Grader.util.sleep(3000);

    await Grader.ui.open({doLayout:true, uiName:'window'});
    await Grader.util.sleep(3000);

    const {UI:UI2} = await Grader.ui.open({doLayout:true, uiName:'window2'});

    await Grader.util.sleep(3000);
    await Grader.ui.close(UI2);

    await Grader.util.sleep(2000);
    await Grader.ui.minimize();

    await Grader.util.sleep(2000);
    await Grader.ui.maximize();

    await Grader.util.sleep(2000);
    await Grader.ui.fullscreen();

    await Grader.util.sleep(2000);
    await Grader.ui.partscreen();

    await Grader.util.sleep(2000);
    await Grader.ui.size({width:200, height:100});

    await Grader.util.sleep(2000);
    await Grader.ui.move({x:300, y:200});

    await Grader.util.sleep(2000);
    await Grader.ui.size({width:400, height:300});

    await Grader.util.sleep(2000);
    await Grader.ui.move({x:600, y:400});

    await Grader.util.sleep(2000);
    await Grader.ui.move({x:50, y:300});

    await Grader.util.sleep(2000);
    await Grader.ui.size({width:200, height:100});

    return UI2;
  }
