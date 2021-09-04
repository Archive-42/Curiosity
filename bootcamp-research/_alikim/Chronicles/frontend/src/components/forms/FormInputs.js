import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

export function TextInput({ label, value, setValue }) {
  const handleChange = (e) => setValue(e.target.value)

  return (
    <label className="lo-txt-con">{label}
      <input
        type="text"
        onChange={handleChange}
        value={value}
        placeholder="Untitled"
      />
    </label>
  )
}


export function TextAreaInput({ label, value, setValue }) {
  const handleChange = (val) => setValue(val)

  return (
    <>
      <label>{label}
      </label>
      <ReactQuill
        // theme={null}
        value={value}
        onChange={handleChange}
        className="txt"
        placeholder="Add description here..."
      />
    </>)
}


export function TextAreaInput_ALTDELTA({ label, value, setValue }) {
  const handleChange = (content, delta, source, editor) => {
    const fullDelta = editor.getContents()
    console.log("fullDelta", fullDelta)
    setValue(fullDelta)
  }

  return (
    <label className="lo-txt-con">{label}
      <ReactQuill
        // theme={null}
        value={value}
        onChange={handleChange}
        className="txt"
        placeholder="Add description here..."
      />
    </label>
  )
}


export function SelectInput({ label, values, value, setValue }) {
  const handleChange = (e) => setValue(e.target.value)

  return (<>
    <label className="lo-text-con">{label}
    </label>
    <select value={value} onChange={handleChange}>
      <option value="">--</option>
      {Object.values(values).map(val => (
        <option key={val.id} value={val.id}>{val.title}</option>
      ))}
    </select>
  </>)
}


export function SelectInputColors({ image, value, setValue }) {
  const handleChange = (e) => {
    console.log("selecting...", e.target, value)
    setValue(e.target.value)
  }
  const colors = [
    "rgb(70,60,70)",
    "#f9fbefff",
    "#e05265ff",
    "#f78464ff",
    "#f0bc62ff",
    "#ffdf7eff",
    "#8cb15eff",
    "#1b9d8eff",
    "#5a70ccff",
    "#2e5a9cff",
    "#4f4686ff",
    "#964a70ff",
    "#885c58ff",
    "#5c2f2fff",
    "#2f2032ff",
    "#57768aff",
  ]

  return (<>

    <div className="rbc">
      {colors.map(color => (
        <label className="rbc-con"><span style={{ display: "none" }}>{color}</span>
          <input
            type="radio"
            value={color}
            checked={value === color}
            name="radio-button-color"
            className="rbc-input"
            onChange={handleChange}
          />
          <span className="rbc-box rbc-color" style={color !== "#f9fbefff" ? { backgroundColor: color } : { backgroundColor: color, borderColor: "lightgray" }}>
            <i className={`fa fa-${image} rbc-checkmark lo-center`} style={color !== "#f9fbefff" ? { color: "white" } : {}}></i>
          </span>
        </label>))
      }
    </div>
  </>)
}

export function SelectInputImages({ color, value, setValue }) {
  const handleChange = (e) => {
    setValue(e.target.value)

    console.log("selecting...", e.target.value, value)
  }

  // IMPORTANT Repeat values causes confusion to input!! Remove all repeats
  const images = {
    "Defaults": [
      "book", // chronicles
      "scroll", // tales
      "feather-alt", // threads
      "map-signs", // choices 
      "unlock-alt", // locks
      "theater-masks", // effect - swap with butterfly
      "user-circle", // characters
      "sign", // places
      "apple-alt", // assets
      "heartbeat", // conditions
      "sliders-h", // meters

    ],

    "People": [
      "american-sign-language-interpreting",
      "assistive-listening-systems",
      "baby",
      "chalkboard-teacher",
      "child",
      "deaf",
      "female",
      "wheelchair",
      "fist-raised",
      "user",
      "user-astronaut",
      "user-clock",
      "user-cog",
      "user-edit",
      "user-friends",
      "user-graduate",
      "user-injured",
      "user-lock",
      "user-md",
      "user-ninja",
      "user-nurse",
      "users",
      "user-secret",
      "user-shield",
      "user-tie",
      "male",
    ],

    "Nature": [
      "meteor",
      "icicles",
      "fire",
      "leaf",
      "cannabis",
      "tree",
      "seedling",
      "bacteria",
      "bacterium",
      "bug",
      "cat",
      "crow",
      "disease",
      "dog",
      "dove",
      "dragon",
      "fish",
      "frog",
      "ghost",
      "hippo",
      "spider",
      "robot",
      "paw",
      "otter",
      "kiwi-bird",
      "holly-berry",
      "horse",
    ],

    "Food": [
      "bacon",
      "beer",
      "birthday-cake",
      "bread-slice",
      "candy-cane",
      "carrot",
      "cheese",
      "cocktail",
      "coffee",
      "cookie",
      "cookie-bite",
      "drumstick-bite",
      "egg ",
      "glass-cheers",
      "glass-martini-alt",
      "glass-whiskey",
      "lemon",
      "pizza-slice",
      "utensils",
      "wine-bottle",
      "pepper-hot",
      "mug-hot",
      "hotdog",
      "hamburger",
      "ice-cream",
    ],

    places: [
      "home",
      "archway",
      "building",
      "broadcast-tower",
      "campground",
      "church",
      "city",
      "clinic-medical",
      "door-closed",
      "door-open",
      "dungeon",
      "gopuram",
      "torii-gate",
      "umbrella-beach",
      "university",
      "school",
      "road",
      "restroom",
      "store",
      "store-alt",
      "person-booth",
      "hospital",
      "hospital-alt",
      "hotel",
      "house-damage",
      "igloo",
      "industry",
      "place-of-worship",
      "landmark",
      "swimming-pool",
      "synagogue",
      "vihara",
      "warehouse",
      "mosque",
      "monument",
      "mountain",
    ],

    transport: [
      "ambulance",
      "bicycle",
      "bus",
      "bus-alt",
      "car",
      "car-alt",
      "caravan",
      "car-crash",
      "car-side",
      "fighter-jet",
      "taxi",
      "traffic-light",
      "train",
      "tram",
      "truck",
      "truck-loading",
      "truck-monster",
      "truck-pickup",
      "plane",
      "sleigh",
      "space-shuttle",
      "ship",
      "shuttle-van",
      "rocket",
      "motorcycle",
      "helicopter",
    ],

    health: [
      "band-aid",
      "brain",
      "capsules",
      "diagnoses",
      "eye",
      "book-medical",
      "book-dead",
      "file-medical",
      "file-medical-alt",
      "first-aid",
      "thermometer",
      "hand-sparkles",
      "hands-wash",
      "tooth",
      "virus",
      "viruses",
      "virus-slash",
      "x-ray",
      "stethoscope",
      "syringe",
      "skull",
      "tablets",
      "skull-crossbones",
      "smoking",
      "smoking-ban",
      "soap",
      "pills",
      "prescription-bottle",
      "prescription-bottle-alt",
      "medkit",
      "lungs",
      "lungs-virus",
      "head-side-cough",
      "head-side-virus",
      "briefcase-medical",
    ],

    technology: [
      "satellite",
      "satellite-dish",
      "sim-card",
      "microscope",
      "solar-panel",
      "microphone-alt",
      "mobile-alt",
      "mouse-pointer",
      "laptop",
      "lightbulb",
      "tv",
      "atom",
      "blender",
      "compact-disc",
      "database",
      "desktop",
      "mouse",
      "keyboard",
      "camera",
      "gamepad",
      "save",
      "tv",
      "film",
      "calculator",
    ],


    items: [
      "eraser",
      "id-card",
      "icicles",
      "meteor",
      "link",
      "life-ring",
      "magnet",
      "map-pin",
      "medal",
      "map",
      "oil-can",
      "newspaper",
      "music",
      "quran",
      "stamp",
      "tint",
      "ticketalt",
      "thumbtack",
      "toolbox",
      "trophy",
      "unlock",

      "address-book",
      "address-card",
      "anchor",
      "air-freshener",
      "archive",
      "atlas",
      "award",
      "balance-scale",
      "balance-scale-left",
      "balance-scale-right",
      "bell",
      "bible",
      "bomb",
      "bone",
      "bong",
      "book-open",
      "box",
      "boxes",
      "box-open",
      "box-tissue",
      "briefcase",
      "bullseye",
      "burn",
      "clipboard-list",
      "cog",
      "cogs",
      "file-alt",
      "file-contract",
      "file-invoice",
      "file-invoice-dollar",
      "file-signature",
      "fire",
      "fire-alt",
      "flag",
      "flask",
      "folder",
      "folder-open",
      "gas-pump",
      "gem",
      "gift",
      "gifts",
      "wind",
      "poop",
      "image",
    ],

    directions: [
      "angle-double-down",
      "angle-double-left",
      "angle-double-right",
      "angle-double-up",
      "angle-down",
      "angle-left",
      "angle-right",
      "angle-up",
      "arrow-alt-circle-down",
      "arrow-alt-circle-left",
      "arrow-alt-circle-right",
      "arrow-alt-circle-up",
      "arrow-down",
      "arrow-left",
      "arrow-right",
      "arrow-up",
      "arrows-alt",
      "arrows-alt-h",
      "arrows-alt-v",
      "compress-alt",
      "compress-arrows-alt",
      "directions",
      "exchange-alt",
      "expand-alt",
      "expand-arrows-alt",
      "external-link-alt",
      "external-link-square-alt",
      "random",
      "retweet",
      "redo",
      "reply",
      "route",
      "shoe-prints",
      "road",
      "map",
    ],

    clothing: [
      "crown",
      "glasses",
      "graduation-cap",
      "hard-hat",
      "hat-cowboy",
      "hat-wizard",
      "headphones",
      "headset",
      "head-side-mask",
      "tshirt",
      "socks",
      "mask",
      "mitten",
    ],

    communication: [
      "comment",
      "comment-alt",
      "comment-dollar",
      "comment-dots",
      "comment-medical",
      "comments",
      "comments-dollar",
      "comment-slash",
      "comment",
      "comment",
      "envelope",
      "envelope-open",
      "envelope-open-text",
      "envelope-square",
      "fax",
      "vial",
      "vials",
      "video",
      "sms",
      "braille",
      "sign-language",
      "phone",
      "mail-bulk",
      "hands-helping",
      "handshake",
      "hand-holding",
      "hand-holding-heart",
      "hand-holding-medical",
      "hand-holding-usd",
      "hand-holding-water",
      "hand-peace",
      "hand-paper",
      "hand-rock",
      "hand-scissors",
      "hand-middle-finger",
      "hand-pointer",
      "hand-point-down",
      "hand-point-left",
      "hand-point-right",
      "hand-point-up",
    ],

    furniture: [
      "baby-carriage",
      "bath",
      "bed",
      "chair",
      "chalkboard",
      "couch",
      "faucet",
      "sink",
      "shower",
      "hot-tub",
      "toilet",
      "toilet-paper",
      "trash",
      "trash-alt",
    ],

    commerce: [
      "cart-plus",
      "cash-register",
      "coins",
      "credit-card",
      "donate",
      "store",
      "store-alt",
      "store-slash",
      "store-alt-slash",
      "wallet",
      "shopping-basket",
      "shopping-cart",
      "piggy-bank",
      "money-check",
      "money-check-alt",
      "money-bill-wave",
      "dollar-sign",
      "euro-sign",
      "yen-sign",
      "won-sign",
      "ruble-sign",
      "rupee-sign",
    ],

    "Tools": [
      "concierge-bell",
      "compass",
      "dice",
      "dice-d20",
      "eraser",
      "fire-extinguisher",
      "fan",
      "feather",
      "bowling-ball",
      "key",
      "marker",
      "highlighter",
      "broom",
      "brush",
      "binoculars",
      "bullhorn",
      "crutch",
      "cut",
      "drafting-compass",
      "gavel",
      "guitar",
      "hammer",
      "umbrella",
      "wrench",
      "shield-alt",
      "search",
      "screwdriver",
      "pen",
      "pen-alt",
      "pen-fancy",
      "ruler",
      "brush",
      "paint-roller",
      "paint-brush",
      "palette",
      "mortar-pestle",
      "magic",
    ],

    "Activities": [
      "dumbbell",
      "football-ball",
      "futbol",
      "baseball-ball",
      "volleyball-ball",
      "basketball-ball",
      "biking",
      "blind",
      "book-reader",
      "chess",
      "golf-ball",
      "hockey-puck",
      "walking",
      "swimmer",
      "skating",
      "skiing",
      "snowboarding",
      "running",
      "table-tennis",
      "pray",
      "hiking",
      "praying-hands",
    ],

    "Time & Weather": [
      "history",
      "calendar",
      "calendar-alt",
      "calendar-check",
      "calendar-times",
      "clock",
      "hourglass",
      "hourglass-end",
      "hourglass-half",
      "hourglass-start",
      "bolt",
      "cloud",
      "cloud-moon",
      "cloud-moon-rain",
      "cloud-rain ",
      "cloud-showers-heavy",
      "cloud-sun",
      "cloud-sun-rain",
      "stopwatch",
      "sun",
      "snowman",
      "smog",
      "moon",
      "star-and-crescent",
      "thermometer-empty",
      "thermometer-full",
      "thermometer-half",
      "snowflake",
    ],

    "Symbols": [
      "signal",
      "spa",
      "adjust",
      "ankh",
      "asterisk",
      "at",
      "ban",
      "battery-empty",
      "battery-full",
      "battery-half",
      "biohazard",
      "bookmark",
      "border-all",
      "braille",
      "certificate",
      "check",
      "check-circle",
      "check-double",
      "chess-bishop",
      "chess-king",
      "chess-knight",
      "chess-pawn",
      "chess-queen",
      "chess-rook",
      "circle",
      "code",
      "code-branch",
      "cube",
      "cross",
      "crosshairs",
      "dharmachakra",
      "divide",
      "dna",
      "eye-slash",
      "filter",
      "fingerprint",
      "font",
      "globe",
      "globe-africa",
      "globe-americas",
      "globe-asia",
      "globe-europe",
      "star",
      "signature",
      "thumbs-up",
      "thumbs-down",
      "shapes",
      "recycle",
      "heart",
      "heart-broken",
      "infinity",
      "icons",
      "info",
      "info-circle",
      "exclamation",
      "exclamation-circle",
      "exclamation-triangle",
      "question",
      "question-circle",
      ""
    ],

    "Moods": [
      "angry",
      "dizzy",
      "flushed",
      "frown",
      "frown-open",
      "grimace",
      "grin",
      "grin-alt",
      "grin-beam",
      "grin-beam-sweat",
      "grin-hearts",
      "grin-squint",
      "grin-squint-tears",
      "grin-stars",
      "grin-tongue",
      "grin-wink",
      "sad-cry",
      "sad-tear",
    ],

  }

  return (<>
    <div className=" th-dark-con lo-scrollbox-sml">
      {Object.keys(images).map(category => (<>
        <h4 className="th-sleek">{category}</h4>
        <div className="rbc">
          {images[category].map(image => (
            <label className="rbc-con"><span style={{ display: "none" }}>{image}</span>
              <input
                type="radio"
                value={image}
                checked={value === image}
                name="radio-button-image"
                className="rbc-input"
                onChange={handleChange}
              />
              <span className="rbc-box rbc-image">
                <i className={`fa fa-${image} rbc-checkback lo-center`} style={{ color }}></i>
              </span>
            </label>
          ))}
        </div>

      </>))}
    </div>
  </>)
}


export function AddToList({
  creationType,
  allItems,
  addedItems,
  setAddedItems
}) {
  const [itemId, setItemId] = useState("")

  const addItem = (e) => {
    if (itemId) {
      const updatedAddedItems = [...addedItems]
      const newAddedItem = { choice_thread_id: itemId, title: `Go to: ${allItems[itemId].title}` }
      updatedAddedItems.push(newAddedItem)
      setAddedItems(updatedAddedItems)
      setItemId("")
    }
  }

  const handleChange = (i) => (e) => {
    e.stopPropagation()
    console.log("oh", e.target.value)
    const updatedAddedItems = [...addedItems]
    updatedAddedItems[i]["title"] = e.target.value
    setAddedItems(updatedAddedItems)
  }

  const removeItem = (i) => (e) => {
    const updatedAddedItems = [...addedItems]
    updatedAddedItems.splice(i, 1)
    setAddedItems(updatedAddedItems)
  }

  return (<>
    <h3>Add a {creationType}</h3>

    <SelectInput
      label={creationType}
      values={allItems}
      value={itemId}
      setValue={setItemId}
    />

    <button type="button" onClick={addItem}>Add</button>

    <h4>Added {creationType}s</h4>
    <ul>
      {addedItems.map((addedItem, i) => (<div key={i}>
        <input type="text" value={addedItem.title} onChange={handleChange(i)} />
        <button type="button" onClick={removeItem(i)}>Remove</button>
        <br />
      </div>
      ))}
    </ul>
  </>)
}