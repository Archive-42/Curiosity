var scenes = [
    {
        'title': "Welcome, GenieBot",
        'recap': "You have entered the area of the Sylvan Mountains...",
        'scene-text': "As you explore your surroundings, at first nothing seems particularly amiss. You don't see any obvious glitches or signs of broken code. However, the place does seem a bit empty, with only a pair of barren mountains and a storm brewing in the distance.",
        'prompt': "You decide to...",
        'choice-1': [1, "👁️"],
        'choice-2': [2, "👂"],
        'choice-3': [3, "👄"],
        'illust': ["images/ap_snowy-mountain.png", "mountain"],
        'npc_image': ["", ""],
        'npc_name': "",
    },
    {
        'title': "Nothing to See Here",
        'recap': "You give the area another thorough scan.",
        'illust': ["", ""],
        'scene-text': "Try as you might, you can't see anything else of interest in the area.",
        'prompt': "Next in your investigation, you...",
        'choice-1': [1, "👁️"],
        'choice-2': [2, "👂"],
        'choice-3': [3, "👄"],
        'illust': ["images/ap_snowy-mountain.png", "mountain"],
        'npc_image': ["", ""],
        'npc_name': "",
        'css-bg': [],
    },
    {
        'title': "Pretty Quiet",
        'recap': "You listen closely for any signs of life or activity, but...",
        'scene-text': "You can hear the simulated breeze blow through and a few strange rustling noises, but you can't see the cause. It's pretty quiet overall.",
        'prompt': "Next in your investigation, you...",
        'choice-1': [1, "👁️"],
        'choice-2': [2, "👂"],
        'choice-3': [3, "👄"],
        'illust': ["images/ap_snowy-mountain.png", "mountain"],
        'npc_image': ["", ""],
        'npc_name': "",
        'css-bg': [],
    },
    {
        'title': "An Elf Appears!",
        'recap': "You call out to the air, wondering if anything would be around to hear it.",
        'img-art': ["images/om_elf.png", "elf"],
        'scene-text': "s your voice reverbrates through the air, suddenly, and elf appears in front of you! Could this be an NPC local to this area? ",
        'prompt': "Startled by the sudden presence, you react with...",
        'choice-1': [4, "👋"],
        'choice-2': [5, "😲"],
        'choice-3': [6, "🤬"],
        'npc_image': ["", ""],
        'npc_name': ,
        'css-bg': ["img-srcs, code, etc."],
    },
    {
        'title': "Friendly Face",
        'recap': "You react with a friendly wave, recovering from your surprise without a hitch.",
        'img-art': ["images/om_elf.png", "elf"],
        'scene-text': "The elf shyly waves back, looking a little cautious but encouraged by your friendliness. This must be an NPC that lives in the area. NPCs in this game world have their own unique language that you can't speak, so communication may be a bit difficult. Still, there were other ways to convey information.",
        'prompt': "After a moment of consideration, you decide to try asking about...",
        'choice-1': [4, "🧝🏿‍♀️"],
        'choice-2': [5, "🐛"],
        'choice-3': [6, "🏞️"],
        'npc_image': ["images/om_elf.png", "elf NPC"],
        'npc_name': "Elf NPC",
        'css-bg': [],
    },
];

const main = document.getElement("main");
const scene_elem_ids = Object.keys(scenes[0]);
var current_scene = scenes[0];
makeScene(current_scene)
const choice_1 = document.getElementById("choice-1");
const choice_2 = document.getElementById("choice-2");
const choice_3 = document.getElementById("choice-3");
const choices = [choice_1, choice_2, choice_3];

//Click a choice element (li emoji) to return its choice ID string.
choice_1.onclick = onChoiceClick("choice-1");
choice_2.onclick = onChoiceClick("choice-2");
choice_3.onclick = onChoiceClick("choice-3");

function onChoiceClick(choice) {
    // Grab the ID matched with the clicked choice from the current scene's dict. Ex: current_scene = scene3, scene3[choice-1] = [5, 'emoji'], so scene3[choice-1[0] = 5. This takes you to scenes[5] in the index.
    new_scene_uid = current_scene[choice[0]]
    current_scene = scenes[new_scene_uid]
    makeScene()

function makeScene(current_scene)
    for (id of scene_elem_ids) {
        var element_type = document.getElementById(id).tagName
        if (element_type == "img") {
            id.setAttribute("src", current_scene["img_art"[0]]);
            id.setAttribute("alt", current_scene["img_art"[1]);
        }
        else if (element_type == "li") {
            id.innerHTML = current_scene[id[1]];
        }
        else {
            id.innerHTML = current_scene[id];
        }


/*
        var new_scene = scene;
        // 1. Cycle through changing each element, starting with identifying the element's type.
        // 2. Make a new element of the same type to contain the new scene's values for that element. Then fill it.
        // 3. Replace the current element with the newly made element containing the new scene's data.
        for(key of keys) {
            var element_type = document.getElementById(key).tagName
            element.innerHTML = "new text"; ****
            var current_element = document.getElementById(key)
            var new_element = document.createElement(element_type)
            var new_element.innerHTML = new_scene[key]
            main.replaceChild(new_element, current_element; }
        }
        var current_scene = new_scene;
    }
}
}
--- ---- ----


